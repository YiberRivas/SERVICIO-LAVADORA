from sqlalchemy import Column, Integer, String
from app.config.database import Base

class Persona(Base):
    __tablename__ = "persona"

    id_persona = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombres = Column(String(100), nullable=False)
    apellidos = Column(String(100), nullable=False)
    telefono = Column(String(15), nullable=True)
    correo = Column(String(100), nullable=True)
    direccion = Column(String(150), nullable=True)
