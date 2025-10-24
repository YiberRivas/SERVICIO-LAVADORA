from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# 🧩 Esquema base
class UsuarioBase(BaseModel):
    username: str
    password_hash: str
    persona_id: Optional[int] = None
    activo: Optional[bool] = True

# 🧱 Esquema para crear usuario
class UsuarioCreate(UsuarioBase):
    pass  # usamos los mismos campos

# 📦 Esquema de respuesta
class UsuarioResponse(UsuarioBase):
    id_usuario: int
    fecha_creacion: Optional[datetime] = None

    class Config:
        from_attributes = True  # reemplaza orm_mode en Pydantic v2
