import sqlite3
import random
from datetime import datetime, timedelta

# Ruta a tu base de datos
db_path = "restaurant_delivery.db"

# Conexión a SQLite
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Palabras para formar nombres de productos
adjetivos = ["Delicioso", "Crujiente", "Picante", "Dulce", "Jugoso", "Ahumado", "Tierno", "Tradicional", "Exótico", "Clásico"]
tipos = ["Pollo", "Carne", "Cerdo", "Pescado", "Vegetales", "Queso", "Tofu", "Fruta", "Pan", "Helado"]
preparaciones = ["al horno", "frito", "en salsa", "a la parrilla", "salteado", "con miel", "con queso", "con hierbas", "gratinado", "empanizado"]

categorias = ["Comida", "Bebida", "Postre", "Entrada", "Snack"]

# Generar productos
cantidad_productos = 250
id_inicial = 71  # Ajusta según tu tabla

for i in range(cantidad_productos):
    pid = id_inicial + i
    nombre = f"{random.choice(adjetivos)} {random.choice(tipos)} {random.choice(preparaciones)}"
    descripcion = f"{nombre} preparado con ingredientes frescos y seleccionados."
    precio = random.randint(5000, 35000)
    categoria = random.choice(categorias)
    created_at = (datetime.now() - timedelta(days=random.randint(0, 365))).strftime('%Y-%m-%d %H:%M:%S')

    cursor.execute('''
        INSERT INTO products (id, name, description, price, category, created_at)
        VALUES (?, ?, ?, ?, ?, ?);
    ''', (pid, nombre, descripcion, precio, categoria, created_at))

# Guardar cambios y cerrar
conn.commit()
conn.close()

print("Productos insertados correctamente.")
