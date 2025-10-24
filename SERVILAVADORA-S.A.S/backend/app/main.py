from fastapi import FastAPI
from app.config.database import Base, engine
from app.models import usuario, persona
from app.routes import usuario as usuario_routes
import uvicorn
import logging

logging.basicConfig(level=logging.DEBUG)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ServiLavadora API", version="1.0.0")

app.include_router(usuario_routes.router)

@app.get("/")
def root():
    return "ServiLavadora API funcionando correctamente"

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
