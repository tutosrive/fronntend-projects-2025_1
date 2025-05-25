from app.business.models.month_order_stats import MonthOrderStats
from sqlalchemy import desc

class MonthStatsController:
    @staticmethod
    def get_month_order_stats():
        """
        Retorna lista de { year_month, total_orders } ordenada DESC.
        """
        stats = MonthOrderStats.query.order_by(desc(MonthOrderStats.total_orders)).all()
        return [s.to_dict() for s in stats]