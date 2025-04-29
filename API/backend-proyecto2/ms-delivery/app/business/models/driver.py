from app import db
from datetime import datetime

class Driver(db.Model):
    __tablename__ = 'drivers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    license_number = db.Column(db.String(50), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(20), nullable=False, default='available')  # available, on_shift, unavailable
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship with Shift
    shifts = db.relationship('Shift', back_populates='driver', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Driver {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'license_number': self.license_number,
            'phone': self.phone,
            'email': self.email,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }