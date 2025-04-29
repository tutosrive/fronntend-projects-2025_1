from app import db
from app.business.models.motorcycle import Motorcycle
from flask import jsonify

class MotorcycleController:
    @staticmethod
    def get_all():
        motorcycles = Motorcycle.query.all()
        return [motorcycle.to_dict() for motorcycle in motorcycles]
    
    @staticmethod
    def get_by_id(motorcycle_id):
        motorcycle = Motorcycle.query.get_or_404(motorcycle_id)
        return motorcycle.to_dict()
    
    @staticmethod
    def create(data):
        new_motorcycle = Motorcycle(
            license_plate=data.get('license_plate'),
            brand=data.get('brand'),
            year=data.get('year'),
            status=data.get('status', 'available')
        )
        
        db.session.add(new_motorcycle)
        db.session.commit()
        
        return new_motorcycle.to_dict(), 201
    
    @staticmethod
    def update(motorcycle_id, data):
        motorcycle = Motorcycle.query.get_or_404(motorcycle_id)
        
        if 'license_plate' in data:
            motorcycle.license_plate = data['license_plate']
        if 'brand' in data:
            motorcycle.brand = data['brand']
        if 'year' in data:
            motorcycle.year = data['year']
        if 'status' in data:
            motorcycle.status = data['status']
        
        db.session.commit()
        
        return motorcycle.to_dict()
    
    @staticmethod
    def delete(motorcycle_id):
        motorcycle = Motorcycle.query.get_or_404(motorcycle_id)
        
        db.session.delete(motorcycle)
        db.session.commit()
        
        return {"message": "Motorcycle deleted successfully"}, 200