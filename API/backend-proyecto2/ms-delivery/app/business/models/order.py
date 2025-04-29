from app import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    menu_id = db.Column(db.Integer, db.ForeignKey('menus.id'), nullable=False)
    motorcycle_id = db.Column(db.Integer, db.ForeignKey('motorcycles.id'), nullable=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')  # pending, in_progress, delivered, cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    customer = db.relationship('Customer', back_populates='orders')
    menu = db.relationship('Menu', back_populates='orders')
    motorcycle = db.relationship('Motorcycle', back_populates='orders')
    address = db.relationship('Address', back_populates='order', uselist=False, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Order {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'menu_id': self.menu_id,
            'motorcycle_id': self.motorcycle_id,
            'quantity': self.quantity,
            'total_price': self.total_price,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'address': self.address.to_dict() if self.address else None,
            'customer': self.customer.to_dict() if self.customer else None,
            'menu': self.menu.to_dict() if self.menu else None
        }