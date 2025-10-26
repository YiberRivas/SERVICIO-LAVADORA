# app/routes/historial.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.models.models import HistorialServicio

router = APIRouter(
    prefix="/historial",
    tags=["Historial de Servicio"]
)

# Dependencia para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", summary="Obtener todos los registros de historial")
def obtener_historial(db: Session = Depends(get_db)):
    """
    Retorna todos los registros del historial de servicios.
    """
    registros = db.query(HistorialServicio).all()
    if not registros:
        raise HTTPException(status_code=404, detail="No hay registros en el historial.")
    return registros


@router.get("/{id_historial}", summary="Obtener un historial por ID")
def obtener_historial_por_id(id_historial: int, db: Session = Depends(get_db)):
    """
    Retorna un registro específico del historial por su ID.
    """
    registro = db.query(HistorialServicio).filter(HistorialServicio.id_historial == id_historial).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Historial no encontrado.")
    return registro
