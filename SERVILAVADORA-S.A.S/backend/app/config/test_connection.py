from app.config.database import engine

try:
    connection = engine.connect()
    print("✅ Conexión exitosa a la base de datos MySQL")
    connection.close()
except Exception as e:
    print("❌ Error al conectar a la base de datos:")
    print(e)
