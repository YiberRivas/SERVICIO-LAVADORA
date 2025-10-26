# app/routes/facturas.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from decimal import Decimal
from app.core.security import get_db, get_current_user
from app.models.models import (
    Factura, DetalleFactura, Servicio, Persona, 
    Usuario, FormaPago, EstadoFactura, HistorialServicio
)
from app.schemas.schemas import (
    FacturaCreate, FacturaResponse, FormaPagoResponse
)

router = APIRouter(prefix="/facturas", tags=["Facturas"])

# ============= CREAR FACTURA =============
@router.post("/", response_model=FacturaResponse, status_code=status.HTTP_201_CREATED)
def crear_factura(
    factura: FacturaCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """
    Crea una nueva factura con sus detalles
    Algoritmo: Calcula total automáticamente y registra en historial
    """
    # Verificar que la persona existe
    persona = db.query(Persona).filter(Persona.id_persona == factura.persona_id).first()
    if not persona:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Persona no encontrada"
        )
    
    # Calcular total
    total = Decimal(0)
    for detalle in factura.detalles:
        servicio = db.query(Servicio).filter(Servicio.id_servicio == detalle.servicio_id).first()
        if not servicio:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Servicio {detalle.servicio_id} no encontrado"
            )
        total += detalle.cantidad * detalle.precio_unitario
    
    # Crear factura
    nueva_factura = Factura(
        persona_id=factura.persona_id,
        forma_pago_id=factura.forma_pago_id,
        total=total,
        estado=EstadoFactura.EMITIDA
    )
    
    db.add(nueva_factura)
    db.flush()  # Para obtener el ID de la factura
    
    # Crear detalles
    for detalle in factura.detalles:
        nuevo_detalle = DetalleFactura(
            factura_id=nueva_factura.id_factura,
            servicio_id=detalle.servicio_id,
            cantidad=detalle.cantidad,
            precio_unitario=detalle.precio_unitario
        )
        db.add(nuevo_detalle)
        
        # Registrar en historial
        historial = HistorialServicio(
            persona_id=factura.persona_id,
            servicio_id=detalle.servicio_id,
            fecha=datetime.now().date(),
            observaciones=f"Factura #{nueva_factura.id_factura}"
        )
        db.add(historial)
    
    db.commit()
    db.refresh(nueva_factura)
    
    return nueva_factura

# ============= LISTAR FACTURAS =============
@router.get("/", response_model=List[FacturaResponse])
def listar_facturas(
    skip: int = 0,
    limit: int = 100,
    persona_id: Optional[int] = None,
    estado: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Lista facturas con filtros opcionales"""
    query = db.query(Factura)
    
    if persona_id:
        query = query.filter(Factura.persona_id == persona_id)
    
    if estado:
        query = query.filter(Factura.estado == estado)
    
    facturas = query.order_by(Factura.fecha.desc()).offset(skip).limit(limit).all()
    return facturas

# ============= OBTENER FACTURA =============
@router.get("/{factura_id}", response_model=FacturaResponse)
def obtener_factura(
    factura_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene una factura por ID con todos sus detalles"""
    factura = db.query(Factura).filter(Factura.id_factura == factura_id).first()
    
    if not factura:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Factura no encontrada"
        )
    
    return factura

# ============= MARCAR COMO PAGADA =============
@router.put("/{factura_id}/pagar")
def marcar_factura_pagada(
    factura_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Marca una factura como pagada"""
    factura = db.query(Factura).filter(Factura.id_factura == factura_id).first()
    
    if not factura:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Factura no encontrada"
        )
    
    if factura.estado == EstadoFactura.PAGADA:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La factura ya está pagada"
        )
    
    factura.estado = EstadoFactura.PAGADA
    db.commit()
    
    return {"mensaje": "Factura marcada como pagada", "factura_id": factura_id}

# ============= ANULAR FACTURA =============
@router.delete("/{factura_id}/anular")
def anular_factura(
    factura_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Anula una factura"""
    factura = db.query(Factura).filter(Factura.id_factura == factura_id).first()
    
    if not factura:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Factura no encontrada"
        )
    
    if factura.estado == EstadoFactura.PAGADA:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se puede anular una factura pagada"
        )
    
    factura.estado = EstadoFactura.ANULADA
    db.commit()
    
    return {"mensaje": "Factura anulada exitosamente"}

# ============= MIS FACTURAS =============
@router.get("/mis-facturas/", response_model=List[FacturaResponse])
def mis_facturas(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene las facturas del usuario actual"""
    if not current_user.persona_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario sin persona asociada"
        )
    
    facturas = db.query(Factura).filter(
        Factura.persona_id == current_user.persona_id
    ).order_by(Factura.fecha.desc()).all()
    
    return facturas


# app/routes/pagos.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.security import get_db, get_current_user
from app.models.models import Pago, Factura, FormaPago, Usuario, EstadoPago, EstadoFactura
from app.schemas.schemas import PagoCreate, PagoResponse, FormaPagoResponse

router = APIRouter(prefix="/pagos", tags=["Pagos"])

# ============= CREAR PAGO =============
@router.post("/", response_model=PagoResponse, status_code=status.HTTP_201_CREATED)
def crear_pago(
    pago: PagoCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """
    Registra un pago para una factura
    Algoritmo: Actualiza estado de factura automáticamente
    """
    # Verificar que la factura existe
    factura = db.query(Factura).filter(Factura.id_factura == pago.id_factura).first()
    if not factura:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Factura no encontrada"
        )
    
    # Verificar que la factura no esté anulada
    if factura.estado == EstadoFactura.ANULADA:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se puede pagar una factura anulada"
        )
    
    # Verificar forma de pago
    forma_pago = db.query(FormaPago).filter(FormaPago.id_forma_pago == pago.id_forma_pago).first()
    if not forma_pago:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Forma de pago no encontrada"
        )
    
    # Crear pago
    nuevo_pago = Pago(
        id_factura=pago.id_factura,
        id_forma_pago=pago.id_forma_pago,
        monto=pago.monto,
        estado=EstadoPago.COMPLETADO
    )
    
    db.add(nuevo_pago)
    
    # Actualizar estado de factura si el pago cubre el total
    total_pagado = db.query(func.sum(Pago.monto)).filter(
        Pago.id_factura == pago.id_factura,
        Pago.estado == EstadoPago.COMPLETADO
    ).scalar() or 0
    
    if total_pagado + pago.monto >= factura.total:
        factura.estado = EstadoFactura.PAGADA
    
    db.commit()
    db.refresh(nuevo_pago)
    
    return nuevo_pago

# ============= LISTAR PAGOS =============
@router.get("/", response_model=List[PagoResponse])
def listar_pagos(
    skip: int = 0,
    limit: int = 100,
    factura_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Lista pagos con filtros opcionales"""
    query = db.query(Pago)
    
    if factura_id:
        query = query.filter(Pago.id_factura == factura_id)
    
    pagos = query.order_by(Pago.fecha_pago.desc()).offset(skip).limit(limit).all()
    return pagos

# ============= OBTENER PAGO =============
@router.get("/{pago_id}", response_model=PagoResponse)
def obtener_pago(
    pago_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene un pago por ID"""
    pago = db.query(Pago).filter(Pago.id_pago == pago_id).first()
    
    if not pago:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pago no encontrado"
        )
    
    return pago

# ============= FORMAS DE PAGO =============
@router.get("/formas-pago/", response_model=List[FormaPagoResponse])
def listar_formas_pago(db: Session = Depends(get_db)):
    """Lista todas las formas de pago disponibles"""
    formas_pago = db.query(FormaPago).all()
    return formas_pago