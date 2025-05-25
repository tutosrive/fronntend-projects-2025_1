from app import db

class MonthOrderStats(db.Model):
    __tablename__ = 'month_order_stats'

    year_month = db.Column(
        db.String(7),
        primary_key=True,
        nullable=False
    )
    total_orders = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    def to_dict(self):
        return {
            'year_month': self.year_month,
            'total_orders': self.total_orders
        }