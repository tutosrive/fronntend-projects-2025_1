from app import db
from app.business.models.customer import Customer
from flask import jsonify

class CustomerController:
    @staticmethod
    def get_all():
        customers = Customer.query.all()
        return [customer.to_dict() for customer in customers]
    
    @staticmethod
    def get_by_id(customer_id):
        customer = Customer.query.get_or_404(customer_id)
        return customer.to_dict()
    
    @staticmethod
    def create(data):
        new_customer = Customer(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone')
        )
        
        db.session.add(new_customer)
        db.session.commit()
        
        return new_customer.to_dict(), 201
    
    @staticmethod
    def update(customer_id, data):
        customer = Customer.query.get_or_404(customer_id)
        
        if 'name' in data:
            customer.name = data['name']
        if 'email' in data:
            customer.email = data['email']
        if 'phone' in data:
            customer.phone = data['phone']
        
        db.session.commit()
        
        return customer.to_dict()
    
    @staticmethod
    def delete(customer_id):
        customer = Customer.query.get_or_404(customer_id)
        
        db.session.delete(customer)
        db.session.commit()
        
        return {"message": "Customer deleted successfully"}, 200