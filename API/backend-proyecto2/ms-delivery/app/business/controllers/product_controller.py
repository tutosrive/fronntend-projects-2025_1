from app import db
from app.business.models.product import Product
from flask import jsonify

class ProductController:
    @staticmethod
    def get_all():
        products = Product.query.all()
        return [product.to_dict() for product in products]
    
    @staticmethod
    def get_by_id(product_id):
        product = Product.query.get_or_404(product_id)
        return product.to_dict()
    
    @staticmethod
    def create(data):
        new_product = Product(
            name=data.get('name'),
            description=data.get('description'),
            price=data.get('price'),
            category=data.get('category')
        )
        
        db.session.add(new_product)
        db.session.commit()
        
        return new_product.to_dict(), 201
    
    @staticmethod
    def update(product_id, data):
        product = Product.query.get_or_404(product_id)
        
        if 'name' in data:
            product.name = data['name']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = data['price']
        if 'category' in data:
            product.category = data['category']
        
        db.session.commit()
        
        return product.to_dict()
    
    @staticmethod
    def delete(product_id):
        product = Product.query.get_or_404(product_id)
        
        db.session.delete(product)
        db.session.commit()
        
        return {"message": "Product deleted successfully"}, 200