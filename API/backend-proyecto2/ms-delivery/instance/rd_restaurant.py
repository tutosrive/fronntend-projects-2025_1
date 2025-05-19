import sqlite3
import random
import string
from datetime import datetime, timedelta

# Conectar a la base de datos
db_path = "restaurant_delivery.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Datos base para nombres y direcciones
nombres_base = [
    "Sabor", "Delicias", "Fogón", "Bistró", "La Mesa", "El Rincón", "Donde", "Casa", "El Buen", "Estación"
]
adjetivos = [
    "Criollo", "Moderno", "Colombiano", "Español", "Italiano", "Chino", "Mexicano", "Vegano", "Asiático", "Fusión"
]
calles = [
    "Calle", "Carrera", "Avenida", "Transversal", "Diagonal"
]
correos_usados = set()

def generar_nombre_restaurante():
    return f"{random.choice(nombres_base)} {random.choice(adjetivos)}"

def generar_direccion():
    return f"{random.choice(calles)} {random.randint(1, 100)} #{random.randint(1, 80)}-{random.randint(1, 50)}"

def generar_telefono():
    return "3" + ''.join(random.choices(string.digits, k=9))

# Insertar restaurantes aleatorios
cantidad_restaurantes = 300
id_inicial = 21

for i in range(cantidad_restaurantes):
    rid = id_inicial + i

    while True:
        nombre = generar_nombre_restaurante()
        correo_base = nombre.lower().replace(" ", "")[:15]
        email = f"{correo_base}{random.randint(100,999)}@restaurant.food"
        if email not in correos_usados:
            correos_usados.add(email)
            break

    direccion = generar_direccion()
    telefono = generar_telefono()
    fecha = (datetime.now() - timedelta(days=random.randint(0, 365))).strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute('''
        INSERT INTO restaurants (id, name, address, phone, email, created_at)
        VALUES (?, ?, ?, ?, ?, ?);
    ''', (rid, nombre, direccion, telefono, email, fecha))

# Guardar y cerrar
conn.commit()
conn.close()

print("Restaurantes insertados correctamente.")
