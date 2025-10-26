# seed_data.py
"""
Script para poblar la base de datos con datos de prueba
"""
from app.config.database import SessionLocal
from app.models.models import (
    TipoIdentificacion, Direccion, Rol, Persona, 
    Usuario, Servicio, FormaPago
)
from app.core.security import get_password_hash

def seed_database():
    db = SessionLocal()
    
    try:
        print("🌱 Iniciando seed de datos...")
        
        # ============= TIPOS DE IDENTIFICACIÓN =============
        print("📋 Creando tipos de identificación...")
        tipos_id = [
            TipoIdentificacion(nombre_tipo="Cédula de ciudadanía", abreviacion="CC"),
            TipoIdentificacion(nombre_tipo="Tarjeta de identidad", abreviacion="TI"),
            TipoIdentificacion(nombre_tipo="Cédula de extranjería", abreviacion="CE"),
            TipoIdentificacion(nombre_tipo="NIT", abreviacion="NIT"),
        ]
        
        for tipo in tipos_id:
            existing = db.query(TipoIdentificacion).filter(
                TipoIdentificacion.abreviacion == tipo.abreviacion
            ).first()
            if not existing:
                db.add(tipo)
        
        db.commit()
        print("✅ Tipos de identificación creados")
        
        # ============= DIRECCIONES =============
        print("📍 Creando direcciones...")
        direcciones = [
            Direccion(ciudad="Bogotá", barrio="Chapinero", direccion_detalle="Calle 70 # 8-12", telefono="3101234567"),
            Direccion(ciudad="Medellín", barrio="El Poblado", direccion_detalle="Carrera 43 # 10-15", telefono="3007654321"),
            Direccion(ciudad="Cali", barrio="Granada", direccion_detalle="Calle 5 # 22-30", telefono="3209876543"),
            Direccion(ciudad="Barranquilla", barrio="El Prado", direccion_detalle="Calle 20 # 14-56", telefono="3045556677"),
        ]
        
        for dir in direcciones:
            existing = db.query(Direccion).filter(
                Direccion.direccion_detalle == dir.direccion_detalle
            ).first()
            if not existing:
                db.add(dir)
        
        db.commit()
        print("✅ Direcciones creadas")
        
        # ============= ROLES =============
        print("👥 Creando roles...")
        roles = [
            Rol(nombre_rol="Administrador", descripcion="Acceso total al sistema"),
            Rol(nombre_rol="Cliente", descripcion="Usuario que agenda servicios"),
            Rol(nombre_rol="Empleado", descripcion="Empleado que realiza servicios"),
        ]
        
        for rol in roles:
            existing = db.query(Rol).filter(Rol.nombre_rol == rol.nombre_rol).first()
            if not existing:
                db.add(rol)
        
        db.commit()
        print("✅ Roles creados")
        
        # ============= PERSONAS =============
        print("👤 Creando personas...")
        personas = [
            Persona(
                nombres="Admin",
                apellidos="Sistema",
                identificacion="1000000000",
                telefono="3001111111",
                correo="admin@servilavadora.com",
                tipo_identificacion_id=1,
                direccion_id=1,
                rol_id=1
            ),
            Persona(
                nombres="Juan",
                apellidos="Pérez",
                identificacion="1001234567",
                telefono="3012345678",
                correo="juan.perez@gmail.com",
                tipo_identificacion_id=1,
                direccion_id=2,
                rol_id=2
            ),
            Persona(
                nombres="María",
                apellidos="González",
                identificacion="1007654321",
                telefono="3109876543",
                correo="maria.gonzalez@hotmail.com",
                tipo_identificacion_id=1,
                direccion_id=3,
                rol_id=2
            ),
            Persona(
                nombres="Carlos",
                apellidos="Ramírez",
                identificacion="1005555555",
                telefono="3155555555",
                correo="carlos.ramirez@gmail.com",
                tipo_identificacion_id=1,
                direccion_id=4,
                rol_id=3
            ),
        ]
        
        for persona in personas:
            existing = db.query(Persona).filter(
                Persona.identificacion == persona.identificacion
            ).first()
            if not existing:
                db.add(persona)
        
        db.commit()
        print("✅ Personas creadas")
        
        # ============= USUARIOS =============
        print("🔐 Creando usuarios...")
        usuarios_data = [
            {"username": "admin", "password": "admin123", "persona_identificacion": "1000000000"},
            {"username": "juan", "password": "juan123", "persona_identificacion": "1001234567"},
            {"username": "maria", "password": "maria123", "persona_identificacion": "1007654321"},
            {"username": "carlos", "password": "carlos123", "persona_identificacion": "1005555555"},
        ]
        
        for user_data in usuarios_data:
            existing = db.query(Usuario).filter(Usuario.username == user_data["username"]).first()
            if not existing:
                persona = db.query(Persona).filter(
                    Persona.identificacion == user_data["persona_identificacion"]
                ).first()
                
                if persona:
                    usuario = Usuario(
                        username=user_data["username"],
                        password_hash=get_password_hash(user_data["password"]),
                        persona_id=persona.id_persona,
                        activo=True
                    )
                    db.add(usuario)
        
        db.commit()
        print("✅ Usuarios creados")
        print("   👉 admin / admin123")
        print("   👉 juan / juan123")
        print("   👉 maria / maria123")
        print("   👉 carlos / carlos123")
        
        # ============= SERVICIOS =============
        print("🧺 Creando servicios...")
        servicios = [
            Servicio(
                nombre_servicio="Alquiler Lavadora - 1 Día",
                descripcion="Alquiler de lavadora automática por 1 día",
                precio_base=15000.00,
                duracion_minutos=1440,
                activo=True
            ),
            Servicio(
                nombre_servicio="Alquiler Lavadora - 3 Días",
                descripcion="Alquiler de lavadora automática por 3 días",
                precio_base=40000.00,
                duracion_minutos=4320,
                activo=True
            ),
            Servicio(
                nombre_servicio="Alquiler Lavadora - 1 Semana",
                descripcion="Alquiler de lavadora automática por 1 semana",
                precio_base=80000.00,
                duracion_minutos=10080,
                activo=True
            ),
            Servicio(
                nombre_servicio="Alquiler con Secadora - 1 Día",
                descripcion="Alquiler de lavadora + secadora por 1 día",
                precio_base=25000.00,
                duracion_minutos=1440,
                activo=True
            ),
            Servicio(
                nombre_servicio="Mantenimiento Preventivo",
                descripcion="Servicio de mantenimiento y limpieza de equipos",
                precio_base=50000.00,
                duracion_minutos=120,
                activo=True
            ),
        ]
        
        for servicio in servicios:
            existing = db.query(Servicio).filter(
                Servicio.nombre_servicio == servicio.nombre_servicio
            ).first()
            if not existing:
                db.add(servicio)
        
        db.commit()
        print("✅ Servicios creados")
        
        # ============= FORMAS DE PAGO =============
        print("💳 Creando formas de pago...")
        formas_pago = [
            FormaPago(nombre_forma="Efectivo", descripcion="Pago en efectivo al momento"),
            FormaPago(nombre_forma="Tarjeta", descripcion="Pago con tarjeta débito/crédito"),
            FormaPago(nombre_forma="Transferencia", descripcion="Transferencia bancaria"),
            FormaPago(nombre_forma="PSE", descripcion="Pago mediante PSE"),
            FormaPago(nombre_forma="Nequi/Daviplata", descripcion="Pago por aplicaciones móviles"),
        ]
        
        for forma in formas_pago:
            existing = db.query(FormaPago).filter(
                FormaPago.nombre_forma == forma.nombre_forma
            ).first()
            if not existing:
                db.add(forma)
        
        db.commit()
        print("✅ Formas de pago creadas")
        
        print("\n" + "="*60)
        print("🎉 ¡Base de datos inicializada exitosamente!")
        print("="*60)
        print("\n📚 Accede a la documentación en: http://localhost:8000/docs")
        print("🔑 Credenciales de prueba:")
        print("   • Admin: admin / admin123")
        print("   • Cliente: juan / juan123")
        print("   • Cliente: maria / maria123")
        print("   • Empleado: carlos / carlos123")
        
    except Exception as e:
        print(f"❌ Error al inicializar datos: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()