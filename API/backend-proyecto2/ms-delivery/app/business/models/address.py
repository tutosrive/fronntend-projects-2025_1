from app import db
from datetime import datetime

class Address(db.Model):
    __tablename__ = 'addresses'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    street = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    postal_code = db.Column(db.String(20), nullable=False)
    additional_info = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship with Order
    order = db.relationship('Order', back_populates='address')
    
    def __repr__(self):
        return f'<Address {self.street}, {self.city}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'postal_code': self.postal_code,
            'additional_info': self.additional_info,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }