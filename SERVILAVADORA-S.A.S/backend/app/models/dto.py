from sqlalchemy import (
    Column, Integer, String, Boolean, ForeignKey, 
    TIMESTAMP, Date, Time, Enum, Text, DECIMAL, JSON, DateTime
    )
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.config.database import Base


class Usuario(Base):
    __tablename__ = "usuario"
    
    id_usuario = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, nullable=False)
    persona_id = Column(Integer, ForeignKey("persona.id_persona"))
    activo = Column(Boolean, default=True)
    fecha_creacion = Column(TIMESTAMP, server_default=func.now())
    
    persona = relationship("Persona", back_populates="usuarios")
    sesiones = relationship("Sesion", back_populates="usuario")


   

    class usuarioEnBD(Usuario):
        password_hash: Column(String(255), nullable=False)
