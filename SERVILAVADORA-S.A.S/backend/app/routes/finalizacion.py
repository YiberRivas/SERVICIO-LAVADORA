# app/routes/finalizacion.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.security import get_db, get_current_user
from app.models.models import (
    FinalizacionServicio, Agendamiento, Usuario,
    EstadoAgendamiento, HistorialServicio
)
from app.schemas.schemas import (
    FinalizacionServicioCreate,
    FinalizacionServicioResponse
)
from datetime import datetime

router = APIRouter(prefix="/finalizaciones", tags=["Finalización de Servicios"])

# ============= FINALIZAR SERVICIO =============
@router.post("/", response_model=FinalizacionServicioResponse, status_code=status.HTTP_201_CREATED)
def finalizar_servicio(
    finalizacion: FinalizacionServicioCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """
    Finaliza un servicio agendado
    Algoritmo: Actualiza estado del agendamiento y registra en historial
    """
    # Verificar que el agendamiento existe
    agendamiento = db.query(Agendamiento).filter(
        Agendamiento.id_agendamiento == finalizacion.agendamiento_id
    ).first()
    
    if not agendamiento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agendamiento no encontrado"
        )
    
    # Verificar que el agendamiento está en proceso
    if agendamiento.estado != EstadoAgendamiento.EN_PROCESO:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"El agendamiento debe estar 'en_proceso' para finalizarse. Estado actual: {agendamiento.estado}"
        )
    
    # Verificar que no esté ya finalizado
    finalizacion_existente = db.query(FinalizacionServicio).filter(
        FinalizacionServicio.agendamiento_id == finalizacion.agendamiento_id
    ).first()
    
    if finalizacion_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este servicio ya ha sido finalizado"
        )
    
    # Crear finalización
    nueva_finalizacion = FinalizacionServicio(
        agendamiento_id=finalizacion.agendamiento_id,
        observaciones=finalizacion.observaciones,
        calificacion=finalizacion.calificacion
    )
    
    db.add(nueva_finalizacion)
    
    # Actualizar estado del agendamiento
    agendamiento.estado = EstadoAgendamiento.FINALIZADO
    
    # Registrar en historial si no existe
    historial_existente = db.query(HistorialServicio).filter(
        HistorialServicio.persona_id == agendamiento.persona_id,
        HistorialServicio.servicio_id == agendamiento.servicio_id,
        HistorialServicio.fecha == agendamiento.fecha
    ).first()
    
    if not historial_existente:
        historial = HistorialServicio(
            persona_id=agendamiento.persona_id,
            servicio_id=agendamiento.servicio_id,
            fecha=agendamiento.fecha,
            observaciones=f"Servicio finalizado. {finalizacion.observaciones or ''}"
        )
        db.add(historial)
    
    db.commit()
    db.refresh(nueva_finalizacion)
    
    return nueva_finalizacion

# ============= LISTAR FINALIZACIONES =============
@router.get("/", response_model=List[FinalizacionServicioResponse])
def listar_finalizaciones(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Lista todas las finalizaciones de servicios"""
    finalizaciones = db.query(FinalizacionServicio).order_by(
        FinalizacionServicio.fecha_finalizacion.desc()
    ).offset(skip).limit(limit).all()
    
    return finalizaciones

# ============= OBTENER FINALIZACIÓN =============
@router.get("/{finalizacion_id}", response_model=FinalizacionServicioResponse)
def obtener_finalizacion(
    finalizacion_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene una finalización por ID"""
    finalizacion = db.query(FinalizacionServicio).filter(
        FinalizacionServicio.id_finalizacion == finalizacion_id
    ).first()
    
    if not finalizacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Finalización no encontrada"
        )
    
    return finalizacion

# ============= INICIAR SERVICIO =============
@router.put("/agendamientos/{agendamiento_id}/iniciar")
def iniciar_servicio(
    agendamiento_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Marca un agendamiento como 'en proceso'"""
    agendamiento = db.query(Agendamiento).filter(
        Agendamiento.id_agendamiento == agendamiento_id
    ).first()
    
    if not agendamiento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agendamiento no encontrado"
        )
    
    if agendamiento.estado not in [EstadoAgendamiento.CONFIRMADO, EstadoAgendamiento.PENDIENTE]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"El agendamiento debe estar 'pendiente' o 'confirmado'. Estado actual: {agendamiento.estado}"
        )
    
    agendamiento.estado = EstadoAgendamiento.EN_PROCESO
    db.commit()
    
    return {
        "mensaje": "Servicio iniciado",
        "agendamiento_id": agendamiento_id,
        "estado": agendamiento.estado
    }


# app/routes/historial.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from app.core.security import get_db, get_current_user
from app.models.models import HistorialServicio, Usuario, Persona
from app.schemas.schemas import HistorialServicioResponse

router = APIRouter(prefix="/historial", tags=["Historial de Servicios"])

# ============= OBTENER HISTORIAL =============
@router.get("/", response_model=List[HistorialServicioResponse])
def listar_historial(
    skip: int = 0,
    limit: int = 100,
    persona_id: Optional[int] = None,
    fecha_desde: Optional[date] = None,
    fecha_hasta: Optional[date] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Lista el historial de servicios con filtros opcionales"""
    query = db.query(HistorialServicio)
    
    if persona_id:
        query = query.filter(HistorialServicio.persona_id == persona_id)
    
    if fecha_desde:
        query = query.filter(HistorialServicio.fecha >= fecha_desde)
    
    if fecha_hasta:
        query = query.filter(HistorialServicio.fecha <= fecha_hasta)
    
    historiales = query.order_by(
        HistorialServicio.fecha.desc()
    ).offset(skip).limit(limit).all()
    
    return historiales

# ============= MI HISTORIAL =============
@router.get("/mi-historial/", response_model=List[HistorialServicioResponse])
def mi_historial(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene el historial de servicios del usuario actual"""
    if not current_user.persona_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario sin persona asociada"
        )
    
    historiales = db.query(HistorialServicio).filter(
        HistorialServicio.persona_id == current_user.persona_id
    ).order_by(HistorialServicio.fecha.desc()).all()
    
    return historiales

# ============= OBTENER HISTORIAL POR PERSONA =============
@router.get("/persona/{persona_id}", response_model=List[HistorialServicioResponse])
def historial_por_persona(
    persona_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene todo el historial de una persona específica"""
    persona = db.query(Persona).filter(Persona.id_persona == persona_id).first()
    
    if not persona:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Persona no encontrada"
        )
    
    historiales = db.query(HistorialServicio).filter(
        HistorialServicio.persona_id == persona_id
    ).order_by(HistorialServicio.fecha.desc()).all()
    
    return historiales

# ============= ESTADÍSTICAS DEL HISTORIAL =============
@router.get("/estadisticas/persona/{persona_id}")
def estadisticas_historial(
    persona_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene estadísticas del historial de una persona"""
    from sqlalchemy import func
    
    # Total de servicios
    total_servicios = db.query(func.count(HistorialServicio.id_historial)).filter(
        HistorialServicio.persona_id == persona_id
    ).scalar()
    
    # Servicios por tipo
    servicios_por_tipo = db.query(
        HistorialServicio.servicio_id,
        func.count(HistorialServicio.id_historial).label('cantidad')
    ).filter(
        HistorialServicio.persona_id == persona_id
    ).group_by(HistorialServicio.servicio_id).all()
    
    # Último servicio
    ultimo_servicio = db.query(HistorialServicio).filter(
        HistorialServicio.persona_id == persona_id
    ).order_by(HistorialServicio.fecha.desc()).first()
    
    return {
        "persona_id": persona_id,
        "total_servicios": total_servicios,
        "servicios_por_tipo": [
            {"servicio_id": s[0], "cantidad": s[1]} for s in servicios_por_tipo
        ],
        "ultimo_servicio": {
            "fecha": ultimo_servicio.fecha if ultimo_servicio else None,
            "servicio_id": ultimo_servicio.servicio_id if ultimo_servicio else None
        }
    }