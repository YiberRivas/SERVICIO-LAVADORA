from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func
from typing import List, Optional
from datetime import date, time, datetime, timedelta
from app.core.security import get_db, get_current_user
from app.models.models import Agendamiento, Servicio, Persona, Usuario, EstadoAgendamiento
from app.schemas.schemas import (
    AgendamientoCreate, 
    AgendamientoResponse, 
    AgendamientoUpdate,
    EstadoAgendamientoEnum
)

router = APIRouter(prefix="/agendamientos", tags=["Agendamientos"])

# ============= ALGORITMO DE DISPONIBILIDAD =============
def verificar_disponibilidad(db: Session, fecha: date, hora: time, duracion_minutos: int) -> bool:
    """
    Verifica si hay disponibilidad en el horario solicitado
    Algoritmo: Verifica solapamiento de horarios
    """
    # Convertir hora a datetime para cálculos
    hora_inicio = datetime.combine(fecha, hora)
    hora_fin = hora_inicio + timedelta(minutes=duracion_minutos)
    
    # Buscar agendamientos en la misma fecha
    agendamientos_dia = db.query(Agendamiento).filter(
        and_(
            Agendamiento.fecha == fecha,
            Agendamiento.estado.in_([
                EstadoAgendamiento.PENDIENTE,
                EstadoAgendamiento.CONFIRMADO,
                EstadoAgendamiento.EN_PROCESO
            ])
        )
    ).all()
    
    # Verificar solapamientos
    for agendamiento in agendamientos_dia:
        servicio = db.query(Servicio).filter(
            Servicio.id_servicio == agendamiento.servicio_id
        ).first()
        
        ag_inicio = datetime.combine(fecha, agendamiento.hora)
        ag_fin = ag_inicio + timedelta(minutes=servicio.duracion_minutos)
        
        # Detectar solapamiento
        if not (hora_fin <= ag_inicio or hora_inicio >= ag_fin):
            return False
    
    return True

def obtener_horarios_disponibles(db: Session, fecha: date, servicio_id: int) -> List[str]:
    """
    Algoritmo que genera horarios disponibles para un servicio en una fecha
    """
    servicio = db.query(Servicio).filter(Servicio.id_servicio == servicio_id).first()
    if not servicio:
        return []
    
    # Horario de operación: 8:00 AM - 6:00 PM
    hora_inicio = time(8, 0)
    hora_fin = time(18, 0)
    
    horarios_disponibles = []
    hora_actual = datetime.combine(fecha, hora_inicio)
    hora_limite = datetime.combine(fecha, hora_fin)
    
    while hora_actual < hora_limite:
        if verificar_disponibilidad(db, fecha, hora_actual.time(), servicio.duracion_minutos):
            horarios_disponibles.append(hora_actual.strftime("%H:%M"))
        
        # Incrementar en intervalos de 30 minutos
        hora_actual += timedelta(minutes=30)
    
    return horarios_disponibles

# ============= CREAR AGENDAMIENTO =============
@router.post("/", response_model=AgendamientoResponse, status_code=status.HTTP_201_CREATED)
def crear_agendamiento(
    agendamiento: AgendamientoCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Crea un nuevo agendamiento verificando disponibilidad"""
    
    # Verificar que el servicio existe y está activo
    servicio = db.query(Servicio).filter(
        Servicio.id_servicio == agendamiento.servicio_id,
        Servicio.activo == True
    ).first()
    
    if not servicio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Servicio no encontrado o inactivo"
        )
    
    # Verificar que la persona existe
    persona = db.query(Persona).filter(
        Persona.id_persona == agendamiento.persona_id
    ).first()
    
    if not persona:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Persona no encontrada"
        )
    
    # Verificar disponibilidad
    if not verificar_disponibilidad(db, agendamiento.fecha, agendamiento.hora, servicio.duracion_minutos):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El horario solicitado no está disponible"
        )
    
    # Crear agendamiento
    nuevo_agendamiento = Agendamiento(
        persona_id=agendamiento.persona_id,
        servicio_id=agendamiento.servicio_id,
        fecha=agendamiento.fecha,
        hora=agendamiento.hora,
        observaciones=agendamiento.observaciones,
        estado=EstadoAgendamiento.PENDIENTE
    )
    
    db.add(nuevo_agendamiento)
    db.commit()
    db.refresh(nuevo_agendamiento)
    
    return nuevo_agendamiento

# ============= LISTAR AGENDAMIENTOS =============
@router.get("/", response_model=List[AgendamientoResponse])
def listar_agendamientos(
    skip: int = 0,
    limit: int = 100,
    fecha_desde: Optional[date] = None,
    fecha_hasta: Optional[date] = None,
    estado: Optional[EstadoAgendamientoEnum] = None,
    persona_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Lista agendamientos con filtros opcionales"""
    query = db.query(Agendamiento)
    
    if fecha_desde:
        query = query.filter(Agendamiento.fecha >= fecha_desde)
    
    if fecha_hasta:
        query = query.filter(Agendamiento.fecha <= fecha_hasta)
    
    if estado:
        query = query.filter(Agendamiento.estado == estado)
    
    if persona_id:
        query = query.filter(Agendamiento.persona_id == persona_id)
    
    agendamientos = query.order_by(Agendamiento.fecha, Agendamiento.hora).offset(skip).limit(limit).all()
    return agendamientos

# ============= OBTENER AGENDAMIENTO =============
@router.get("/{agendamiento_id}", response_model=AgendamientoResponse)
def obtener_agendamiento(
    agendamiento_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene un agendamiento por ID"""
    agendamiento = db.query(Agendamiento).filter(
        Agendamiento.id_agendamiento == agendamiento_id
    ).first()
    
    if not agendamiento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agendamiento no encontrado"
        )
    
    return agendamiento

# ============= ACTUALIZAR AGENDAMIENTO =============
@router.put("/{agendamiento_id}", response_model=AgendamientoResponse)
def actualizar_agendamiento(
    agendamiento_id: int,
    agendamiento_update: AgendamientoUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Actualiza un agendamiento existente"""
    agendamiento = db.query(Agendamiento).filter(
        Agendamiento.id_agendamiento == agendamiento_id
    ).first()
    
    if not agendamiento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agendamiento no encontrado"
        )
    
    # Si se cambia fecha/hora, verificar disponibilidad
    if agendamiento_update.fecha or agendamiento_update.hora:
        nueva_fecha = agendamiento_update.fecha or agendamiento.fecha
        nueva_hora = agendamiento_update.hora or agendamiento.hora
        
        servicio = db.query(Servicio).filter(
            Servicio.id_servicio == agendamiento.servicio_id
        ).first()
        
        # Excluir el agendamiento actual de la verificación
        db.query(Agendamiento).filter(
            Agendamiento.id_agendamiento == agendamiento_id
        ).update({"estado": EstadoAgendamiento.CANCELADO})
        
        if not verificar_disponibilidad(db, nueva_fecha, nueva_hora, servicio.duracion_minutos):
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="El nuevo horario no está disponible"
            )
        
        db.rollback()
    
    # Actualizar campos
    update_data = agendamiento_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(agendamiento, key, value)
    
    db.commit()
    db.refresh(agendamiento)
    
    return agendamiento

# ============= CANCELAR AGENDAMIENTO =============
@router.delete("/{agendamiento_id}")
def cancelar_agendamiento(
    agendamiento_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Cancela un agendamiento"""
    agendamiento = db.query(Agendamiento).filter(
        Agendamiento.id_agendamiento == agendamiento_id
    ).first()
    
    if not agendamiento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agendamiento no encontrado"
        )
    
    agendamiento.estado = EstadoAgendamiento.CANCELADO
    db.commit()
    
    return {"mensaje": "Agendamiento cancelado exitosamente"}

# ============= OBTENER HORARIOS DISPONIBLES =============
@router.get("/disponibilidad/horarios")
def consultar_horarios_disponibles(
    fecha: date = Query(...),
    servicio_id: int = Query(...),
    db: Session = Depends(get_db)
):
    """Consulta horarios disponibles para un servicio en una fecha"""
    horarios = obtener_horarios_disponibles(db, fecha, servicio_id)
    
    return {
        "fecha": fecha,
        "servicio_id": servicio_id,
        "horarios_disponibles": horarios,
        "total": len(horarios)
    }

# ============= MIS AGENDAMIENTOS =============
@router.get("/mis-agendamientos/", response_model=List[AgendamientoResponse])
def mis_agendamientos(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene los agendamientos del usuario actual"""
    if not current_user.persona_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario sin persona asociada"
        )
    
    agendamientos = db.query(Agendamiento).filter(
        Agendamiento.persona_id == current_user.persona_id
    ).order_by(Agendamiento.fecha.desc(), Agendamiento.hora.desc()).all()
    
    return agendamientos