from app import db
from app.business.models.driver import Driver
from flask import jsonify
from sqlalchemy import text
from sqlalchemy import desc
from app.business.models.driver_order_counter_month import DriverOrderCounterMonth
from datetime import datetime

class DriverController:
    @staticmethod
    def get_all():
        drivers = Driver.query.all()
        return [driver.to_dict() for driver in drivers]
    
    @staticmethod
    def get_by_id(driver_id):
        driver = Driver.query.get_or_404(driver_id)
        return driver.to_dict()
    
    @staticmethod
    def create(data):
        new_driver = Driver(
            name=data.get('name'),
            license_number=data.get('license_number'),
            phone=data.get('phone'),
            email=data.get('email'),
            status=data.get('status', 'available')
        )
        
        db.session.add(new_driver)
        db.session.commit()
        # Inicializar contador del mes actual con quantity=0
        DriverController.upsert_driver_counter(new_driver.id, 0)
        return new_driver.to_dict(), 201
    
    @staticmethod
    def update(driver_id, data):
        driver = Driver.query.get_or_404(driver_id)
        
        if 'name' in data:
            driver.name = data['name']
        if 'license_number' in data:
            driver.license_number = data['license_number']
        if 'phone' in data:
            driver.phone = data['phone']
        if 'email' in data:
            driver.email = data['email']
        if 'status' in data:
            driver.status = data['status']
        
        db.session.commit()
        
        return driver.to_dict()
    
    @staticmethod
    def delete(driver_id):
        driver = Driver.query.get_or_404(driver_id)
        
        db.session.delete(driver)
        db.session.commit()
        
        return {"message": "Driver deleted successfully"}, 200

    @staticmethod
    def upsert_driver_counter(driver_id, delta):
        """
        Crea o actualiza el contador para el mes actual.
        delta: cantidad a sumar (puede ser 0 al crear).
        """
        ym = datetime.utcnow().strftime('%Y-%m')
        key = (driver_id, ym)
        counter = DriverOrderCounterMonth.query.get(key)
        if not counter:
            counter = DriverOrderCounterMonth(driver_id=driver_id, year_month=ym, quantity=delta)
            db.session.add(counter)
        else:
            counter.quantity += delta
        db.session.commit()
        return {'driver_id': driver_id, 'month': ym, 'quantity': counter.quantity}

    @staticmethod
    def get_order_counters(month=None):
        """
        GET /drivers/counters?month=YYYY-MM
        Si ?month no existe, retorna todos los meses.
        Ordena desc por quantity e incluye datos completos del Driver.
        """
        # Consulta contadores
        query = DriverOrderCounterMonth.query
        if month:
            query = query.filter_by(year_month=month)
        counters = query.order_by(desc(DriverOrderCounterMonth.quantity)).all()

        # Para cada contador, busca el driver y combina datos
        result = []
        for c in counters:
            driver = Driver.query.get(c.driver_id)
            if not driver:
                continue
            driver_data = driver.to_dict()
            driver_data.update({'month': c.year_month, 'quantity': c.quantity})
            result.append(driver_data)
        return result