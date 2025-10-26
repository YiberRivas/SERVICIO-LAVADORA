from sqlalchemy import (
    Column, Integer, String, Boolean, ForeignKey, 
    TIMESTAMP, Date, Time, Enum, Text, DECIMAL, JSON, DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.config.database import Base
import enum

# ============= ENUMS =============
class EstadoAgendamiento(str, enum.Enum):
    PENDIENTE = "pendiente"
    CONFIRMADO = "confirmado"
    EN_PROCESO = "en_proceso"
    FINALIZADO = "finalizado"
    CANCELADO = "cancelado"

class EstadoFactura(str, enum.Enum):
    EMITIDA = "emitida"
    PAGADA = "pagada"
    ANULADA = "anulada"

class EstadoPago(str, enum.Enum):
    PENDIENTE = "Pendiente"
    COMPLETADO = "Completado"
    FALLIDO = "Fallido"

# ============= MODELOS BASE =============
class TipoIdentificacion(Base):
    __tablename__ = "tipo_identificacion"
    
    id_tipo_identificacion = Column(Integer, primary_key=True, index=True)
    nombre_tipo = Column(String(50), nullable=False)
    abreviacion = Column(String(10))
    
    personas = relationship("Persona", back_populates="tipo_identificacion")

class Direccion(Base):
    __tablename__ = "direccion"
    
    id_direccion = Column(Integer, primary_key=True, index=True)
    ciudad = Column(String(100))
    barrio = Column(String(100))
    direccion_detalle = Column(String(255))
    telefono = Column(String(20))
    
    personas = relationship("Persona", back_populates="direccion")

class Rol(Base):
    __tablename__ = "rol"
    
    id_rol = Column(Integer, primary_key=True, index=True)
    nombre_rol = Column(String(50), nullable=False)
    descripcion = Column(String(255))
    
    personas = relationship("Persona", back_populates="rol")
    menus = relationship("Menu", secondary="rol_menu", back_populates="roles")
    permisos = relationship("Permiso", secondary="rol_permiso", back_populates="roles")

class Persona(Base):
    __tablename__ = "persona"
    
    id_persona = Column(Integer, primary_key=True, index=True)
    nombres = Column(String(100), nullable=False)
    apellidos = Column(String(100))
    fecha_nacimiento = Column(Date)
    tipo_identificacion_id = Column(Integer, ForeignKey("tipo_identificacion.id_tipo_identificacion"))
    identificacion = Column(String(50), unique=True, index=True)
    direccion_id = Column(Integer, ForeignKey("direccion.id_direccion"))
    telefono = Column(String(20))
    correo = Column(String(150))
    rol_id = Column(Integer, ForeignKey("rol.id_rol"))
    fecha_registro = Column(TIMESTAMP, server_default=func.now())
    
    # Relaciones
    tipo_identificacion = relationship("TipoIdentificacion", back_populates="personas")
    direccion = relationship("Direccion", back_populates="personas")
    rol = relationship("Rol", back_populates="personas")
    usuarios = relationship("Usuario", back_populates="persona")
    agendamientos = relationship("Agendamiento", back_populates="persona")
    facturas = relationship("Factura", back_populates="persona")
    historiales = relationship("HistorialServicio", back_populates="persona")

# ============= USUARIOS Y AUTENTICACIÓN =============
class Usuario(Base):
    __tablename__ = "usuario"
    
    id_usuario = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    persona_id = Column(Integer, ForeignKey("persona.id_persona"))
    activo = Column(Boolean, default=True)
    fecha_creacion = Column(TIMESTAMP, server_default=func.now())
    
    persona = relationship("Persona", back_populates="usuarios")
    sesiones = relationship("Sesion", back_populates="usuario")

class Sesion(Base):
    __tablename__ = "sesion"
    
    id_sesion = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id_usuario"))
    inicio = Column(TIMESTAMP, server_default=func.now())
    fin = Column(TIMESTAMP)
    ip_origen = Column(String(45))
    
    usuario = relationship("Usuario", back_populates="sesiones")

# ============= SERVICIOS =============
class Servicio(Base):
    __tablename__ = "servicio"
    
    id_servicio = Column(Integer, primary_key=True, index=True)
    nombre_servicio = Column(String(120), nullable=False)
    descripcion = Column(Text)
    precio_base = Column(DECIMAL(10, 2), nullable=False, default=0.00)
    duracion_minutos = Column(Integer, default=60)
    activo = Column(Boolean, default=True)
    
    agendamientos = relationship("Agendamiento", back_populates="servicio")
    detalles_factura = relationship("DetalleFactura", back_populates="servicio")
    historiales = relationship("HistorialServicio", back_populates="servicio")
    reportes = relationship("ReporteServicio", back_populates="servicio")

# ============= AGENDAMIENTOS =============
class Agendamiento(Base):
    __tablename__ = "agendamiento"
    
    id_agendamiento = Column(Integer, primary_key=True, index=True)
    persona_id = Column(Integer, ForeignKey("persona.id_persona"), nullable=False)
    servicio_id = Column(Integer, ForeignKey("servicio.id_servicio"), nullable=False)
    fecha = Column(Date, nullable=False, index=True)
    hora = Column(Time, nullable=False)
    estado = Column(Enum(EstadoAgendamiento), default=EstadoAgendamiento.PENDIENTE)
    creado_en = Column(TIMESTAMP, server_default=func.now())
    observaciones = Column(Text)
    
    persona = relationship("Persona", back_populates="agendamientos")
    servicio = relationship("Servicio", back_populates="agendamientos")
    finalizacion = relationship("FinalizacionServicio", back_populates="agendamiento", uselist=False)

class FinalizacionServicio(Base):
    __tablename__ = "finalizacion_servicio"
    
    id_finalizacion = Column(Integer, primary_key=True, index=True)
    agendamiento_id = Column(Integer, ForeignKey("agendamiento.id_agendamiento"), nullable=False)
    fecha_finalizacion = Column(DateTime, server_default=func.now())
    observaciones = Column(Text)
    calificacion = Column(Integer)  # 1-5 estrellas
    
    agendamiento = relationship("Agendamiento", back_populates="finalizacion")

# ============= HISTORIAL =============
class HistorialServicio(Base):
    __tablename__ = "historial_servicio"
    
    id_historial = Column(Integer, primary_key=True, index=True)
    persona_id = Column(Integer, ForeignKey("persona.id_persona"))
    servicio_id = Column(Integer, ForeignKey("servicio.id_servicio"))
    fecha = Column(Date)
    observaciones = Column(Text)
    
    persona = relationship("Persona", back_populates="historiales")
    servicio = relationship("Servicio", back_populates="historiales")

# ============= FACTURACIÓN Y PAGOS =============
class FormaPago(Base):
    __tablename__ = "forma_pago"
    
    id_forma_pago = Column(Integer, primary_key=True, index=True)
    nombre_forma = Column(String(80), nullable=False)
    descripcion = Column(String(255))
    
    facturas = relationship("Factura", back_populates="forma_pago")
    pagos = relationship("Pago", back_populates="forma_pago")

class Factura(Base):
    __tablename__ = "factura"
    
    id_factura = Column(Integer, primary_key=True, index=True)
    persona_id = Column(Integer, ForeignKey("persona.id_persona"))
    fecha = Column(TIMESTAMP, server_default=func.now(), index=True)
    total = Column(DECIMAL(12, 2), nullable=False, default=0.00)
    forma_pago_id = Column(Integer, ForeignKey("forma_pago.id_forma_pago"))
    estado = Column(Enum(EstadoFactura), default=EstadoFactura.EMITIDA)
    
    persona = relationship("Persona", back_populates="facturas")
    forma_pago = relationship("FormaPago", back_populates="facturas")
    detalles = relationship("DetalleFactura", back_populates="factura", cascade="all, delete-orphan")
    pagos = relationship("Pago", back_populates="factura")
    certificados = relationship("CertificadoPago", back_populates="factura")

class DetalleFactura(Base):
    __tablename__ = "detalle_factura"
    
    id_detalle = Column(Integer, primary_key=True, index=True)
    factura_id = Column(Integer, ForeignKey("factura.id_factura"), nullable=False)
    servicio_id = Column(Integer, ForeignKey("servicio.id_servicio"))
    cantidad = Column(Integer, default=1)
    precio_unitario = Column(DECIMAL(12, 2), nullable=False, default=0.00)
    # subtotal es calculado: cantidad * precio_unitario
    
    factura = relationship("Factura", back_populates="detalles")
    servicio = relationship("Servicio", back_populates="detalles_factura")

class Pago(Base):
    __tablename__ = "pago"
    
    id_pago = Column(Integer, primary_key=True, index=True)
    id_factura = Column(Integer, ForeignKey("factura.id_factura"))
    id_forma_pago = Column(Integer, ForeignKey("forma_pago.id_forma_pago"))
    monto = Column(DECIMAL(10, 2))
    fecha_pago = Column(DateTime, server_default=func.now())
    estado = Column(Enum(EstadoPago), default=EstadoPago.PENDIENTE)
    
    factura = relationship("Factura", back_populates="pagos")
    forma_pago = relationship("FormaPago", back_populates="pagos")

class CertificadoPago(Base):
    __tablename__ = "certificado_pago"
    
    id_certificado = Column(Integer, primary_key=True, index=True)
    factura_id = Column(Integer, ForeignKey("factura.id_factura"), nullable=False)
    fecha_emision = Column(Date, server_default=func.current_date())
    observacion = Column(Text)
    
    factura = relationship("Factura", back_populates="certificados")

# ============= REPORTES =============
class ReporteServicio(Base):
    __tablename__ = "reporte_servicio"
    
    id_reporte = Column(Integer, primary_key=True, index=True)
    fecha_generacion = Column(TIMESTAMP, server_default=func.now())
    descripcion = Column(Text)
    datos = Column(JSON)
    servicio_id = Column(Integer, ForeignKey("servicio.id_servicio"))
    
    servicio = relationship("Servicio", back_populates="reportes")
    informaciones = relationship("Informacion", back_populates="reporte")

# ============= SISTEMA =============
class Menu(Base):
    __tablename__ = "menu"
    
    id_menu = Column(Integer, primary_key=True, index=True)
    nombre_menu = Column(String(100), nullable=False)
    ruta = Column(String(150))
    orden = Column(Integer, default=0)
    
    roles = relationship("Rol", secondary="rol_menu", back_populates="menus")

class Permiso(Base):
    __tablename__ = "permiso"
    
    id_permiso = Column(Integer, primary_key=True, index=True)
    nombre_permiso = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    
    roles = relationship("Rol", secondary="rol_permiso", back_populates="permisos")

class Tutorial(Base):
    __tablename__ = "tutorial"
    
    id_tutorial = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150))
    contenido = Column(Text)
    ruta_video = Column(String(255))
    orden = Column(Integer, default=0)
    
    informaciones = relationship("Informacion", back_populates="tutorial")

class Informacion(Base):
    __tablename__ = "informacion"
    
    id_info = Column(Integer, primary_key=True, index=True)
    clave = Column(String(100))
    valor = Column(Text)
    tutorial_id = Column(Integer, ForeignKey("tutorial.id_tutorial"))
    reporte_servicio = Column(Integer, ForeignKey("reporte_servicio.id_reporte"))
    
    tutorial = relationship("Tutorial", back_populates="informaciones")
    reporte = relationship("ReporteServicio", back_populates="informaciones")

# ============= TABLAS INTERMEDIAS (Many-to-Many) =============
from sqlalchemy import Table

rol_menu = Table(
    'rol_menu',
    Base.metadata,
    Column('id_rol', Integer, ForeignKey('rol.id_rol'), primary_key=True),
    Column('id_menu', Integer, ForeignKey('menu.id_menu'), primary_key=True)
)

rol_permiso = Table(
    'rol_permiso',
    Base.metadata,
    Column('id_rol', Integer, ForeignKey('rol.id_rol'), primary_key=True),
    Column('id_permiso', Integer, ForeignKey('permiso.id_permiso'), primary_key=True)
)

persona_rol = Table(
    'persona_rol',
    Base.metadata,
    Column('persona_id', Integer, ForeignKey('persona.id_persona'), primary_key=True),
    Column('rol_id', Integer, ForeignKey('rol.id_rol'), primary_key=True)
)