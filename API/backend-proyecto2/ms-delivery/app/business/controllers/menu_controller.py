from app import db
from app.business.models.menu import Menu
from flask import jsonify

class MenuController:
    @staticmethod
    def get_all():
        menus = Menu.query.all()
        return [menu.to_dict() for menu in menus]
    
    @staticmethod
    def get_by_id(menu_id):
        menu = Menu.query.get_or_404(menu_id)
        return menu.to_dict()
    
    @staticmethod
    def create(data):
        new_menu = Menu(
            restaurant_id=data.get('restaurant_id'),
            product_id=data.get('product_id'),
            price=data.get('price'),
            availability=data.get('availability', True)
        )
        
        db.session.add(new_menu)
        db.session.commit()
        
        return new_menu.to_dict(), 201
    
    @staticmethod
    def update(menu_id, data):
        menu = Menu.query.get_or_404(menu_id)
        
        if 'restaurant_id' in data:
            menu.restaurant_id = data['restaurant_id']
        if 'product_id' in data:
            menu.product_id = data['product_id']
        if 'price' in data:
            menu.price = data['price']
        if 'availability' in data:
            menu.availability = data['availability']
        
        db.session.commit()
        
        return menu.to_dict()
    
    @staticmethod
    def delete(menu_id):
        menu = Menu.query.get_or_404(menu_id)
        
        db.session.delete(menu)
        db.session.commit()
        
        return {"message": "Menu item deleted successfully"}, 200