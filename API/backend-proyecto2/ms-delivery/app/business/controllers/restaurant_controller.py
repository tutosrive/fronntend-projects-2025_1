from app import db
from app.business.models.restaurant import Restaurant
from flask import jsonify

class RestaurantController:
    @staticmethod
    def get_all():
        restaurants = Restaurant.query.all()
        return [restaurant.to_dict() for restaurant in restaurants]
    
    @staticmethod
    def get_by_id(restaurant_id):
        restaurant = Restaurant.query.get_or_404(restaurant_id)
        return restaurant.to_dict()
    
    @staticmethod
    def create(data):
        new_restaurant = Restaurant(
            name=data.get('name'),
            address=data.get('address'),
            phone=data.get('phone'),
            email=data.get('email')
        )
        
        db.session.add(new_restaurant)
        db.session.commit()
        
        return new_restaurant.to_dict(), 201
    
    @staticmethod
    def update(restaurant_id, data):
        restaurant = Restaurant.query.get_or_404(restaurant_id)
        
        if 'name' in data:
            restaurant.name = data['name']
        if 'address' in data:
            restaurant.address = data['address']
        if 'phone' in data:
            restaurant.phone = data['phone']
        if 'email' in data:
            restaurant.email = data['email']
        
        db.session.commit()
        
        return restaurant.to_dict()
    
    @staticmethod
    def delete(restaurant_id):
        restaurant = Restaurant.query.get_or_404(restaurant_id)
        
        db.session.delete(restaurant)
        db.session.commit()
        
        return {"message": "Restaurant deleted successfully"}, 200