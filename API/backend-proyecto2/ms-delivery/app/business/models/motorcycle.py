from app import db
from datetime import datetime

class Motorcycle(db.Model):
    __tablename__ = 'motorcycles'
    
    id = db.Column(db.Integer, primary_key=True)
    license_plate = db.Column(db.String(20), nullable=False, unique=True)
    brand = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='available')  # available, in_use, maintenance
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    orders = db.relationship('Order', back_populates='motorcycle')
    shifts = db.relationship('Shift', back_populates='motorcycle', cascade='all, delete-orphan')
    issues = db.relationship('Issue', back_populates='motorcycle', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Motorcycle {self.license_plate}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'license_plate': self.license_plate,
            'brand': self.brand,
            'year': self.year,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }