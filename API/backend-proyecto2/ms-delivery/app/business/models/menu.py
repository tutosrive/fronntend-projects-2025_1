from app import db
from datetime import datetime

class Menu(db.Model):
    __tablename__ = 'menus'
    
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)  # This could be different from the product price
    availability = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    restaurant = db.relationship('Restaurant', back_populates='menus')
    product = db.relationship('Product', back_populates='menus')
    orders = db.relationship('Order', back_populates='menu', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Menu {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'product_id': self.product_id,
            'price': self.price,
            'availability': self.availability,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'product': self.product.to_dict() if self.product else None,
            'restaurant': self.restaurant.to_dict() if self.restaurant else None
        }