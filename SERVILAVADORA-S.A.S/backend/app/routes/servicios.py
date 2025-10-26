# app/routes/servicios.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.security import get_db, get_current_user
from app.models.models import Servicio, Usuario
from app.schemas.schemas import ServicioCreate, ServicioResponse, ServicioUpdate

router = APIRouter(prefix="/servicios", tags=["Servicios"])

# ============= CREAR SERVICIO =============
@router.post("/", response_model=ServicioResponse, status_code=status.HTTP_201_CREATED)
def crear_servicio(
    servicio: ServicioCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Crea un nuevo servicio (solo admin)"""
    nuevo_servicio = Servicio(**servicio.dict())
    db.add(nuevo_servicio)
    db.commit()
    db.refresh(nuevo_servicio)
    return nuevo_servicio

# ============= LISTAR SERVICIOS =============
@router.get("/", response_model=List[ServicioResponse])
def listar_servicios(
    skip: int = 0,
    limit: int = 100,
    activo: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """Lista todos los servicios disponibles"""
    query = db.query(Servicio)
    
    if activo is not None:
        query = query.filter(Servicio.activo == activo)
    
    servicios = query.offset(skip).limit(limit).all()
    return servicios

# ============= OBTENER SERVICIO =============
@router.get("/{servicio_id}", response_model=ServicioResponse)
def obtener_servicio(servicio_id: int, db: Session = Depends(get_db)):
    """Obtiene un servicio por ID"""
    servicio = db.query(Servicio).filter(Servicio.id_servicio == servicio_id).first()
    
    if not servicio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Servicio no encontrado"
        )
    
    return servicio

# ============= ACTUALIZAR SERVICIO =============
@router.put("/{servicio_id}", response_model=ServicioResponse)
def actualizar_servicio(
    servicio_id: int,
    servicio_update: ServicioUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Actualiza un servicio existente"""
    servicio = db.query(Servicio).filter(Servicio.id_servicio == servicio_id).first()
    
    if not servicio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Servicio no encontrado"
        )
    
    update_data = servicio_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(servicio, key, value)
    
    db.commit()
    db.refresh(servicio)
    
    return servicio

# ============= ELIMINAR SERVICIO =============
@router.delete("/{servicio_id}")
def eliminar_servicio(
    servicio_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Desactiva un servicio (soft delete)"""
    servicio = db.query(Servicio).filter(Servicio.id_servicio == servicio_id).first()
    
    if not servicio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Servicio no encontrado"
        )
    
    servicio.activo = False
    db.commit()
    
    return {"mensaje": f"Servicio {servicio.nombre_servicio} desactivado exitosamente"}