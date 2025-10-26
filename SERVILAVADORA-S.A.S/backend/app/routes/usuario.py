from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import get_db
from app import models

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

# Obtener todos los usuarios
@router.get("/")
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(models.Usuario).all()

# Crear un nuevo usuario
@router.post("/")
def crear_usuario(username: str, password_hash: str, persona_id: int, db: Session = Depends(get_db)):
    nuevo_usuario = models.Usuario(
        username=username,
        password_hash=password_hash,
        persona_id=persona_id,
        activo=True
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return {"mensaje": "Usuario creado correctamente", "usuario": nuevo_usuario}
