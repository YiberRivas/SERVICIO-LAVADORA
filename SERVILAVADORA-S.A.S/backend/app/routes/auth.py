from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import (
    authenticate_user, 
    create_access_token, 
    get_password_hash,
    get_db,
    get_current_user
)
from app.models.models import Usuario, Persona
from app.schemas.schemas import (
    UsuarioCreate, 
    UsuarioResponse, 
    Token
)
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["Autenticación"])

# ============= REGISTRO =============
@router.post("/registro", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def registrar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    """Registra un nuevo usuario"""
    existing_user = db.query(Usuario).filter(Usuario.username == usuario.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El nombre de usuario ya está en uso"
        )
    
    persona = db.query(Persona).filter(Persona.id_persona == usuario.persona_id).first()
    if not persona:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Persona no encontrada"
        )
    
    nuevo_usuario = Usuario(
        username=usuario.username,
        password_hash=get_password_hash(usuario.password),
        persona_id=usuario.persona_id,
        activo=usuario.activo
    )
    
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

# ============= LOGIN =============
@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Inicia sesión y obtiene token JWT"""
    usuario = authenticate_user(db, form_data.username, form_data.password)
    
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=60 * 24)
    access_token = create_access_token(
        data={"sub": usuario.username},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "usuario": usuario
    }

# ============= OBTENER USUARIO ACTUAL =============
@router.get("/me", response_model=UsuarioResponse)
def obtener_usuario_actual(current_user: Usuario = Depends(get_current_user)):
    """Obtiene información del usuario autenticado"""
    return current_user

# ============= CAMBIAR CONTRASEÑA =============
@router.put("/cambiar-password")
def cambiar_password(
    password_actual: str,
    password_nueva: str,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Cambia la contraseña del usuario actual"""
    from app.core.security import verify_password
    
    if not verify_password(password_actual, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Contraseña actual incorrecta"
        )
    
    if len(password_nueva) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La nueva contraseña debe tener al menos 6 caracteres"
        )
    
    current_user.password_hash = get_password_hash(password_nueva)
    db.commit()
    
    return {"mensaje": "Contraseña actualizada exitosamente"}