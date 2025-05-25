import sqlite3
import random
from datetime import datetime, timedelta

def insert_random_orders(db_path: str, num_orders: int = 200):
    """
    Inserta 'num_orders' pedidos aleatorios en la tabla 'orders' de la base de datos SQLite especificada.
    Ahora motorcycle_id siempre será un entero de 1 a 5 (nunca NULL).
    """
    statuses = ['completed', 'pending', 'cancelled']
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Asegurarse de que la tabla orders exista
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            customer_id INTEGER NOT NULL,
            menu_id INTEGER NOT NULL,
            motorcycle_id INTEGER NOT NULL,    -- ya no admite NULL
            quantity INTEGER NOT NULL,
            total_price REAL NOT NULL,
            status TEXT NOT NULL,
            created_at TEXT
        );
    """)
    
    # Determinar ID inicial
    cursor.execute("SELECT MAX(id) FROM orders;")
    row = cursor.fetchone()
    start_id = (row[0] or 0) + 1
    
    # Insertar registros
    for i in range(start_id, start_id + num_orders):
        customer_id   = random.randint(1, 10)
        menu_id       = random.randint(1, 10)
        motorcycle_id = random.randint(1, 331)     # ahora siempre 1–5
        quantity      = random.randint(1, 5)
        price_per_unit= round(random.uniform(10.0, 50.0), 2)
        total_price   = round(quantity * price_per_unit, 2)
        status        = random.choice(statuses)
        created_at    = (datetime.now() - timedelta(
                            days=random.randint(0, 300),
                            hours=random.randint(0, 23),
                            minutes=random.randint(0, 59)
                        )).strftime("%Y-%m-%d %H:%M:%S")
        
        cursor.execute("""
            INSERT INTO orders (
                id, customer_id, menu_id, motorcycle_id,
                quantity, total_price, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        """, (
            i, customer_id, menu_id, motorcycle_id,
            quantity, total_price, status, created_at
        ))
    
    conn.commit()
    conn.close()
    print(f"Se han insertado {num_orders} órdenes aleatorias en '{db_path}', con motorcycle_id siempre entero.")

if __name__ == "__main__":
    insert_random_orders('restaurant_delivery.db', num_orders=200)
