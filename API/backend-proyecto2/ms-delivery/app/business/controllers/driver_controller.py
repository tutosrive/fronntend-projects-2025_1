from app import db
from app.business.models.driver import Driver
from flask import jsonify

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