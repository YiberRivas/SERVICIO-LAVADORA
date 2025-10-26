from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

# IMPORTANTE: Cargar las variables de entorno
load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME")

# Imprimir para debug (QUITAR EN PRODUCCIÓN)
print(f"DB_USER: {DB_USER}")
print(f"DB_PASSWORD: {'***' if DB_PASSWORD else 'NO CARGADA'}")
print(f"DB_NAME: {DB_NAME}")

# Crear URL de conexión
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Crear motor de conexión
engine = create_engine(DATABASE_URL, echo=True)

# Crear sesión de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los modelos
Base = declarative_base()

Base = declarative_base()

# 🔹 Función requerida por FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()