from app import db
from datetime import datetime

class Photo(db.Model):
    __tablename__ = 'photos'
    
    id = db.Column(db.Integer, primary_key=True)
    issue_id = db.Column(db.Integer, db.ForeignKey('issues.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(200), nullable=True)
    taken_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship with Issue
    issue = db.relationship('Issue', back_populates='photos')
    
    def __repr__(self):
        return f'<Photo {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'issue_id': self.issue_id,
            'image_url': self.image_url,
            'caption': self.caption,
            'taken_at': self.taken_at.isoformat() if self.taken_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }