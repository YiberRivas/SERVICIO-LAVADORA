# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import engine, Base
from app.routes import (
    auth,
    agendamientos,
    servicios,
    facturas,
    pagos,
    finalizacion,
    historial,
    reportes,
    usuario
)

# Crear tablas
Base.metadata.create_all(bind=engine)

# Crear aplicación
app = FastAPI(
    title="SERVILAVADORA API",
    description="API para gestión de alquiler de lavadoras",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar rutas
app.include_router(auth.router)
app.include_router(usuario.router)
app.include_router(servicios.router)
app.include_router(agendamientos.router)
app.include_router(finalizacion.router)
app.include_router(historial.router)
app.include_router(facturas.router)
app.include_router(pagos.router)
app.include_router(reportes.router)

# Ruta raíz
@app.get("/")
def root():
    return {
        "mensaje": "Bienvenido a SERVILAVADORA API",
        "version": "1.0.0",
        "documentacion": "/docs"
    }

# Health check
@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)