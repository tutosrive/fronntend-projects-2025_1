from app import db
from app.business.models.issue import Issue
from datetime import datetime
from flask import jsonify

class IssueController:
    @staticmethod
    def get_all():
        issues = Issue.query.all()
        return [issue.to_dict() for issue in issues]
    
    @staticmethod
    def get_by_id(issue_id):
        issue = Issue.query.get_or_404(issue_id)
        return issue.to_dict()
    
    @staticmethod
    def create(data):
        new_issue = Issue(
            motorcycle_id=data.get('motorcycle_id'),
            description=data.get('description'),
            issue_type=data.get('issue_type'),
            date_reported=datetime.fromisoformat(data.get('date_reported')) if data.get('date_reported') else datetime.utcnow(),
            status=data.get('status', 'open')
        )
        
        db.session.add(new_issue)
        db.session.commit()
        
        return new_issue.to_dict(), 201
    
    @staticmethod
    def update(issue_id, data):
        issue = Issue.query.get_or_404(issue_id)
        
        if 'motorcycle_id' in data:
            issue.motorcycle_id = data['motorcycle_id']
        if 'description' in data:
            issue.description = data['description']
        if 'issue_type' in data:
            issue.issue_type = data['issue_type']
        if 'date_reported' in data:
            issue.date_reported = datetime.fromisoformat(data['date_reported'])
        if 'status' in data:
            issue.status = data['status']
        
        db.session.commit()
        
        return issue.to_dict()
    
    @staticmethod
    def delete(issue_id):
        issue = Issue.query.get_or_404(issue_id)
        
        db.session.delete(issue)
        db.session.commit()
        
        return {"message": "Issue deleted successfully"}, 200