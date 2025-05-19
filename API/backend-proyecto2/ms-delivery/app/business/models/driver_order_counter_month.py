from datetime import datetime
from app import db

class DriverOrderCounterMonth(db.Model):
    __tablename__ = 'driverOrderCounterMonth'

    # PK compuesta: driver_id + year_month
    driver_id  = db.Column(db.Integer, db.ForeignKey('drivers.id'), primary_key=True)
    year_month = db.Column(db.String(7), nullable=False, primary_key=True, default=lambda: datetime.utcnow().strftime('%Y-%m'))
    quantity   = db.Column(db.Integer, nullable=False, default=0)

    driver = db.relationship('Driver', back_populates='order_counters', uselist=False)