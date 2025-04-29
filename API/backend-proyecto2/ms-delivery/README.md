# Restaurant Delivery System

A Flask application with a layered architecture for a restaurant delivery system.

## Project Structure

The application follows a layered architecture:

- **Presentation Layer**: Routes and API endpoints
- **Business Layer**: Models and Controllers
- **Data Access Layer**: Database operations

## Entity Relationships

- Restaurants sell many Products (many-to-many relationship through Menu)
- Customers can order multiple Menu items (many-to-many relationship through Order)
- Orders have a delivery Address (one-to-one relationship)
- Orders can be transported by Motorcycles (one-to-many relationship)
- Motorcycles can be driven by Drivers (many-to-many relationship through Shift)
- Motorcycles can have Issues (one-to-many relationship)
- Issues can have Photos as evidence (one-to-many relationship)

## Setup and Installation

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Set up environment variables in `.env` file
6. Run the application: `python run.py`

## API Endpoints

The application provides RESTful API endpoints for all entities with full CRUD operations:

- `/restaurants`
- `/products`
- `/menus`
- `/customers`
- `/orders`
- `/addresses`
- `/motorcycles`
- `/drivers`
- `/shifts`
- `/issues`
- `/photos`

Each endpoint supports:

- GET (all items)
- GET /:id (specific item)
- POST (create)
- PUT /:id (update)
- DELETE /:id (delete)