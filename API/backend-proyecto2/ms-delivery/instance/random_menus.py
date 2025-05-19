import sqlite3
import random
import datetime
import argparse
import os

def generate_random_menu_record(record_id, restaurant_ids, prod_min, prod_max, price_min, price_max):
    """
    Genera una tupla con valores aleatorios para la tabla menus.
    """
    restaurant_id = random.choice(restaurant_ids)
    product_id    = random.randint(prod_min, prod_max)
    price         = random.randint(price_min, price_max)
    availability  = random.choice([0, 1])
    days_ago      = random.randint(0, 365)
    created_at    = (datetime.datetime.now() - datetime.timedelta(days=days_ago)) \
                     .strftime('%Y-%m-%d %H:%M:%S')
    return (record_id, restaurant_id, product_id, price, availability, created_at)

def main(db_path, num_records, id_start, restaurant_ids, prod_min, prod_max, price_min, price_max, commit_every):
    # Verifica que exista la base de datos
    if not os.path.isfile(db_path):
        raise FileNotFoundError(f"No se encontró la base de datos: {db_path}")

    conn = sqlite3.connect(db_path)
    cur  = conn.cursor()

    insert_sql = '''
    INSERT INTO main.menus
        (id, restaurant_id, product_id, price, availability, created_at)
    VALUES (?, ?, ?, ?, ?, ?);
    '''

    for i in range(num_records):
        rec_id = id_start + i
        record = generate_random_menu_record(
            rec_id, restaurant_ids, prod_min, prod_max, price_min, price_max
        )
        cur.execute(insert_sql, record)
        # Hacer commit periódico para grandes volúmenes
        if commit_every and (i + 1) % commit_every == 0:
            conn.commit()
            print(f"Insertados {i + 1} de {num_records} registros...")

    conn.commit()
    conn.close()
    print(f"✅ {num_records} registros insertados correctamente en {db_path}.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Inserta registros aleatorios en la tabla 'menus' de un SQLite DB."
    )
    parser.add_argument(
        '-d', '--db', default='restaurant_delivery.db',
        help='Ruta a la base de datos SQLite'
    )
    parser.add_argument(
        '-n', '--num', type=int, default=200,
        help='Número de registros a generar'
    )
    parser.add_argument(
        '-s', '--start-id', type=int, default=42,
        help='ID inicial para la primera fila'
    )
    parser.add_argument(
        '-c', '--commit-every', type=int, default=200,
        help='Hacer commit cada N registros para no sobrecargar memoria'
    )
    args = parser.parse_args()

    # Configuración de parámetros
    RESTAURANT_IDS = [5, 7, 9, 10, 11, 13, 15, 16, 17, 18, 19, 20]
    PRODUCT_MIN    = 1
    PRODUCT_MAX    = 50
    PRICE_MIN      = 5000
    PRICE_MAX      = 50000

    main(
        db_path=args.db,
        num_records=args.num,
        id_start=args.start_id,
        restaurant_ids=RESTAURANT_IDS,
        prod_min=PRODUCT_MIN,
        prod_max=PRODUCT_MAX,
        price_min=PRICE_MIN,
        price_max=PRICE_MAX,
        commit_every=args.commit_every
    )
