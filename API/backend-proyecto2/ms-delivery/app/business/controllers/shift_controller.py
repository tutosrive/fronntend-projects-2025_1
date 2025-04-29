from app import db
from app.business.models.shift import Shift
from datetime import datetime
from flask import jsonify

class ShiftController:
    @staticmethod
    def get_all():
        shifts = Shift.query.all()
        return [shift.to_dict() for shift in shifts]
    
    @staticmethod
    def get_by_id(shift_id):
        shift = Shift.query.get_or_404(shift_id)
        return shift.to_dict()
    
    @staticmethod
    def create(data):
        new_shift = Shift(
            driver_id=data.get('driver_id'),
            motorcycle_id=data.get('motorcycle_id'),
            start_time=datetime.fromisoformat(data.get('start_time')) if data.get('start_time') else datetime.utcnow(),
            end_time=datetime.fromisoformat(data.get('end_time')) if data.get('end_time') else None,
            status=data.get('status', 'active')
        )
        
        db.session.add(new_shift)
        db.session.commit()
        
        return new_shift.to_dict(), 201
    
    @staticmethod
    def update(shift_id, data):
        shift = Shift.query.get_or_404(shift_id)
        
        if 'driver_id' in data:
            shift.driver_id = data['driver_id']
        if 'motorcycle_id' in data:
            shift.motorcycle_id = data['motorcycle_id']
        if 'start_time' in data:
            shift.start_time = datetime.fromisoformat(data['start_time'])
        if 'end_time' in data:
            shift.end_time = datetime.fromisoformat(data['end_time']) if data['end_time'] else None
        if 'status' in data:
            shift.status = data['status']
        
        db.session.commit()
        
        return shift.to_dict()
    
    @staticmethod
    def delete(shift_id):
        shift = Shift.query.get_or_404(shift_id)
        
        db.session.delete(shift)
        db.session.commit()
        
        return {"message": "Shift deleted successfully"}, 200