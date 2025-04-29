from app import db
from datetime import datetime

class Issue(db.Model):
    __tablename__ = 'issues'
    
    id = db.Column(db.Integer, primary_key=True)
    motorcycle_id = db.Column(db.Integer, db.ForeignKey('motorcycles.id'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    issue_type = db.Column(db.String(50), nullable=False)  # accident, breakdown, maintenance
    date_reported = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False, default='open')  # open, in_progress, resolved
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    motorcycle = db.relationship('Motorcycle', back_populates='issues')
    photos = db.relationship('Photo', back_populates='issue', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Issue {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'motorcycle_id': self.motorcycle_id,
            'description': self.description,
            'issue_type': self.issue_type,
            'date_reported': self.date_reported.isoformat() if self.date_reported else None,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'photos': [photo.to_dict() for photo in self.photos] if self.photos else []
        }