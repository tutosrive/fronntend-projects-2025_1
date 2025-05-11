import sqlite3
from faker import Faker
import random
from datetime import datetime

faker = Faker()

# Conectar a la base de datos
conn = sqlite3.connect("restaurant_delivery1.db")
cursor = conn.cursor()

# Obtener todos los IDs disponibles de la tabla 'orders'
cursor.execute("SELECT id FROM orders")
order_ids = [row[0] for row in cursor.fetchall()]

if len(order_ids) == 0:
    raise ValueError("La tabla 'orders' no contiene IDs disponibles.")

# Insertar 1000 registros completos (sin NULLs)
for _ in range(1000):
    order_id = random.choice(order_ids)
    street = faker.street_address()
    city = faker.city()
    state = faker.state()
    postal_code = faker.postcode()
    additional_info = faker.sentence(nb_words=12)  # Siempre un texto
    created_at = datetime.now().isoformat()

    cursor.execute("""
        INSERT INTO addresses (order_id, street, city, state, postal_code, additional_info, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (order_id, street, city, state, postal_code, additional_info, created_at))

conn.commit()
conn.close()

print("✅ Se agregaron 1000 registros completos y SIN NULLS a 'addresses'.")
