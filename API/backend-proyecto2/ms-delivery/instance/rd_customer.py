import sqlite3
import random
import string
from datetime import datetime, timedelta

# Conectar a la base de datos
db_path = "restaurant_delivery.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Datos base
nombres = ["Sofía", "Martín", "Lucía", "Mateo", "Isabella", "Santiago", "Valeria", "Sebastián", "Mariana", "Emilio"]
apellidos = ["Torres", "Rojas", "Castro", "Ortiz", "Ramírez", "Vargas", "Mendoza", "Silva", "Navarro", "Reyes"]
usados = set()  # Para asegurar emails únicos

def generar_telefono():
    return '+57' + ''.join(random.choices(string.digits, k=9))

# Insertar clientes aleatorios
cantidad_clientes = 500
id_inicial = 2

for i in range(cantidad_clientes):
    cid = id_inicial + i

    while True:
        nombre = f"{random.choice(nombres)} {random.choice(apellidos)}"
        base = nombre.lower().replace(" ", ".")
        sufijo = str(random.randint(100, 999))
        email = f"{base}{sufijo}@email.com"

        if email not in usados:
            usados.add(email)
            break

    telefono = generar_telefono()
    fecha = (datetime.now() - timedelta(days=random.randint(0, 365))).strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute('''
        INSERT INTO customers (id, name, email, phone, created_at)
        VALUES (?, ?, ?, ?, ?);
    ''', (cid, nombre, email, telefono, fecha))

# Guardar y cerrar
conn.commit()
conn.close()

print("Clientes insertados correctamente con emails únicos.")
