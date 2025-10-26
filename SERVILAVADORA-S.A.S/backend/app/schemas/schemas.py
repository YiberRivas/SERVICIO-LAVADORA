# app/schemas/schemas.py
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import date, time, datetime
from decimal import Decimal
from enum import Enum

# ============= ENUMS =============
class EstadoAgendamientoEnum(str, Enum):
    PENDIENTE = "pendiente"
    CONFIRMADO = "confirmado"
    EN_PROCESO = "en_proceso"
    FINALIZADO = "finalizado"
    CANCELADO = "cancelado"

class EstadoFacturaEnum(str, Enum):
    EMITIDA = "emitida"
    PAGADA = "pagada"
    ANULADA = "anulada"

class EstadoPagoEnum(str, Enum):
    PENDIENTE = "Pendiente"
    COMPLETADO = "Completado"
    FALLIDO = "Fallido"

# ============= DIRECCION =============
class DireccionBase(BaseModel):
    ciudad: Optional[str] = None
    barrio: Optional[str] = None
    direccion_detalle: Optional[str] = None
    telefono: Optional[str] = None

class DireccionCreate(DireccionBase):
    pass

class DireccionResponse(DireccionBase):
    id_direccion: int
    
    class Config:
        from_attributes = True

# ============= TIPO IDENTIFICACION =============
class TipoIdentificacionBase(BaseModel):
    nombre_tipo: str
    abreviacion: Optional[str] = None

class TipoIdentificacionResponse(TipoIdentificacionBase):
    id_tipo_identificacion: int
    
    class Config:
        from_attributes = True

# ============= ROL =============
class RolBase(BaseModel):
    nombre_rol: str
    descripcion: Optional[str] = None

class RolResponse(RolBase):
    id_rol: int
    
    class Config:
        from_attributes = True

# ============= PERSONA =============
class PersonaBase(BaseModel):
    nombres: str = Field(..., min_length=2, max_length=100)
    apellidos: Optional[str] = None
    fecha_nacimiento: Optional[date] = None
    tipo_identificacion_id: Optional[int] = None
    identificacion: Optional[str] = None
    direccion_id: Optional[int] = None
    telefono: Optional[str] = Field(None, pattern=r'^\d{10}$')
    correo: Optional[EmailStr] = None
    rol_id: Optional[int] = None

class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(BaseModel):
    nombres: Optional[str] = None
    apellidos: Optional[str] = None
    telefono: Optional[str] = None
    correo: Optional[EmailStr] = None
    direccion_id: Optional[int] = None

class PersonaResponse(PersonaBase):
    id_persona: int
    fecha_registro: datetime
    direccion: Optional[DireccionResponse] = None
    rol: Optional[RolResponse] = None
    
    class Config:
        from_attributes = True

# ============= USUARIO Y AUTENTICACIÓN =============
class UsuarioBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=80)
    activo: bool = True

class UsuarioCreate(UsuarioBase):
    password: str = Field(..., min_length=6)
    persona_id: int

class UsuarioLogin(BaseModel):
    username: str
    password: str

class UsuarioResponse(UsuarioBase):
    id_usuario: int
    persona_id: Optional[int]
    fecha_creacion: datetime
    persona: Optional[PersonaResponse] = None
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioResponse

# ============= SERVICIO =============
class ServicioBase(BaseModel):
    nombre_servicio: str = Field(..., max_length=120)
    descripcion: Optional[str] = None
    precio_base: Decimal = Field(..., ge=0)
    duracion_minutos: int = Field(60, ge=15, le=480)
    activo: bool = True

class ServicioCreate(ServicioBase):
    pass

class ServicioUpdate(BaseModel):
    nombre_servicio: Optional[str] = None
    descripcion: Optional[str] = None
    precio_base: Optional[Decimal] = None
    duracion_minutos: Optional[int] = None
    activo: Optional[bool] = None

class ServicioResponse(ServicioBase):
    id_servicio: int
    
    class Config:
        from_attributes = True

# ============= AGENDAMIENTO =============
class AgendamientoBase(BaseModel):
    persona_id: int
    servicio_id: int
    fecha: date
    hora: time
    observaciones: Optional[str] = None

class AgendamientoCreate(AgendamientoBase):
    @validator('fecha')
    def fecha_futura(cls, v):
        from datetime import date
        if v < date.today():
            raise ValueError('La fecha debe ser hoy o posterior')
        return v

class AgendamientoUpdate(BaseModel):
    fecha: Optional[date] = None
    hora: Optional[time] = None
    estado: Optional[EstadoAgendamientoEnum] = None
    observaciones: Optional[str] = None

class AgendamientoResponse(AgendamientoBase):
    id_agendamiento: int
    estado: EstadoAgendamientoEnum
    creado_en: datetime
    persona: Optional[PersonaResponse] = None
    servicio: Optional[ServicioResponse] = None
    
    class Config:
        from_attributes = True

# ============= FINALIZACION SERVICIO =============
class FinalizacionServicioBase(BaseModel):
    agendamiento_id: int
    observaciones: Optional[str] = None
    calificacion: Optional[int] = Field(None, ge=1, le=5)

class FinalizacionServicioCreate(FinalizacionServicioBase):
    pass

class FinalizacionServicioResponse(FinalizacionServicioBase):
    id_finalizacion: int
    fecha_finalizacion: datetime
    agendamiento: Optional[AgendamientoResponse] = None
    
    class Config:
        from_attributes = True

# ============= HISTORIAL SERVICIO =============
class HistorialServicioResponse(BaseModel):
    id_historial: int
    persona_id: Optional[int]
    servicio_id: Optional[int]
    fecha: Optional[date]
    observaciones: Optional[str]
    servicio: Optional[ServicioResponse] = None
    
    class Config:
        from_attributes = True

# ============= FORMA DE PAGO =============
class FormaPagoBase(BaseModel):
    nombre_forma: str
    descripcion: Optional[str] = None

class FormaPagoResponse(FormaPagoBase):
    id_forma_pago: int
    
    class Config:
        from_attributes = True

# ============= FACTURA =============
class DetalleFacturaBase(BaseModel):
    servicio_id: int
    cantidad: int = Field(1, ge=1)
    precio_unitario: Decimal = Field(..., ge=0)

class DetalleFacturaCreate(DetalleFacturaBase):
    pass

class DetalleFacturaResponse(DetalleFacturaBase):
    id_detalle: int
    factura_id: int
    servicio: Optional[ServicioResponse] = None
    
    @property
    def subtotal(self) -> Decimal:
        return self.cantidad * self.precio_unitario
    
    class Config:
        from_attributes = True

class FacturaBase(BaseModel):
    persona_id: int
    forma_pago_id: Optional[int] = None

class FacturaCreate(FacturaBase):
    detalles: List[DetalleFacturaCreate]

class FacturaResponse(FacturaBase):
    id_factura: int
    fecha: datetime
    total: Decimal
    estado: EstadoFacturaEnum
    persona: Optional[PersonaResponse] = None
    forma_pago: Optional[FormaPagoResponse] = None
    detalles: List[DetalleFacturaResponse] = []
    
    class Config:
        from_attributes = True

# ============= PAGO =============
class PagoBase(BaseModel):
    id_factura: int
    id_forma_pago: int
    monto: Decimal = Field(..., ge=0)

class PagoCreate(PagoBase):
    pass

class PagoResponse(PagoBase):
    id_pago: int
    fecha_pago: datetime
    estado: EstadoPagoEnum
    factura: Optional[FacturaResponse] = None
    forma_pago: Optional[FormaPagoResponse] = None
    
    class Config:
        from_attributes = True

# ============= CERTIFICADO PAGO =============
class CertificadoPagoResponse(BaseModel):
    id_certificado: int
    factura_id: int
    fecha_emision: date
    observacion: Optional[str]
    factura: Optional[FacturaResponse] = None
    
    class Config:
        from_attributes = True

# ============= REPORTES =============
class ReporteServicioResponse(BaseModel):
    id_reporte: int
    fecha_generacion: datetime
    descripcion: Optional[str]
    datos: Optional[dict]
    servicio_id: Optional[int]
    
    class Config:
        from_attributes = True

class ReporteAgendamientos(BaseModel):
    total_agendamientos: int
    por_estado: dict
    por_servicio: List[dict]
    ingresos_estimados: Decimal

class ReporteIngresos(BaseModel):
    periodo: str
    total_ingresos: Decimal
    total_facturas: int
    facturas_pagadas: int
    facturas_pendientes: int
    por_forma_pago: List[dict]