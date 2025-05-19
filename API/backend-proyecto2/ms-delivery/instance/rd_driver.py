import sqlite3
import random
import string
from datetime import datetime, timedelta

# Conectar a la base de datos
db_path = "restaurant_delivery.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Datos base
nombres = ["Felipe", "Juan", "Camila", "Laura", "Andrés", "Luisa", "Carlos", "Daniela", "Mateo", "Valentina"]
apellidos = ["García", "Martínez", "Rodríguez", "López", "Hernández", "Pérez", "Gómez", "Ruiz", "Díaz", "Moreno"]
estados = ["available", "unavailable", "suspended"]

# Generador de licencias tipo ABC123
def generar_licencia():
    return ''.join(random.choices(string.ascii_uppercase, k=3)) + ''.join(random.choices(string.digits, k=3))

# Generar número de teléfono aleatorio
def generar_telefono():
    return '+57' + ''.join(random.choices(string.digits, k=9))

# Insertar conductores aleatorios
cantidad_conductores = 300
id_inicial = 2

for i in range(cantidad_conductores):
    cid = id_inicial + i
    nombre = random.choice(nombres) + " " + random.choice(apellidos)
    licencia = generar_licencia()
    telefono = generar_telefono()
    email = nombre.lower().replace(" ", ".") + "@correo.com"
    estado = random.choice(estados)
    fecha = (datetime.now() - timedelta(days=random.randint(0, 365))).strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute('''
        INSERT INTO drivers (id, name, license_number, phone, email, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    ''', (cid, nombre, licencia, telefono, email, estado, fecha))

# Guardar y cerrar
conn.commit()
conn.close()

print("Conductores insertados correctamente.")
