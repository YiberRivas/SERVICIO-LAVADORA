from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.models.models import Pago

router = APIRouter(
    prefix="/pagos",
    tags=["Pagos"]
)

# Dependencia para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", summary="Obtener todos los pagos")
def obtener_pagos(db: Session = Depends(get_db)):
    """
    Retorna todos los registros de pagos.
    """
    pagos = db.query(Pago).all()
    if not pagos:
        raise HTTPException(status_code=404, detail="No hay pagos registrados.")
    return pagos


@router.get("/{id_pago}", summary="Obtener un pago por ID")
def obtener_pago_por_id(id_pago: int, db: Session = Depends(get_db)):
    """
    Retorna la información de un pago específico.
    """
    pago = db.query(Pago).filter(Pago.id_pago == id_pago).first()
    if not pago:
        raise HTTPException(status_code=404, detail="Pago no encontrado.")
    return pago
