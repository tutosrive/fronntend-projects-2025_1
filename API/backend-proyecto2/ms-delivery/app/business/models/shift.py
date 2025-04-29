from app import db
from datetime import datetime

class Shift(db.Model):
    __tablename__ = 'shifts'
    
    id = db.Column(db.Integer, primary_key=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.id'), nullable=False)
    motorcycle_id = db.Column(db.Integer, db.ForeignKey('motorcycles.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='active')  # active, completed, cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    driver = db.relationship('Driver', back_populates='shifts')
    motorcycle = db.relationship('Motorcycle', back_populates='shifts')
    
    def __repr__(self):
        return f'<Shift {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'driver_id': self.driver_id,
            'motorcycle_id': self.motorcycle_id,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'driver': self.driver.to_dict() if self.driver else None,
            'motorcycle': self.motorcycle.to_dict() if self.motorcycle else None
        }