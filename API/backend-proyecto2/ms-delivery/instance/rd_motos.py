import sqlite3
import random
import string
from datetime import datetime, timedelta

# Conexión a SQLite
db_path = "restaurant_delivery.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Datos base
brands = ["Yamaha", "Suzuki", "Kawasaki", "Honda", "AKT", "Bajaj", "TVS", "Hero"]
statuses = ["available", "maintenance", "unavailable"]

# Función para generar placa aleatoria tipo ABC123
def generar_placa():
    letras = ''.join(random.choices(string.ascii_uppercase, k=3))
    numeros = ''.join(random.choices(string.digits, k=3))
    return letras + numeros

# Insertar motos aleatorias
cantidad_motos = 300
id_inicial = 32  # Ajusta según tu tabla

for i in range(cantidad_motos):
    moto_id = id_inicial + i
    placa = generar_placa()
    marca = random.choice(brands)
    año = random.randint(2015, 2024)
    estado = random.choice(statuses)
    fecha_creacion = (datetime.now() - timedelta(days=random.randint(0, 730))).strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute('''
        INSERT INTO motorcycles (id, license_plate, brand, year, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?);
    ''', (moto_id, placa, marca, año, estado, fecha_creacion))

# Guardar cambios y cerrar conexión
conn.commit()
conn.close()

print("Motos insertadas correctamente.")
