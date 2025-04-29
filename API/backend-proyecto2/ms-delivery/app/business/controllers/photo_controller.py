from app import db
from app.business.models.photo import Photo
from datetime import datetime
from flask import jsonify
from flask import current_app
from werkzeug.utils import secure_filename
import os
from flask import send_file, abort,send_from_directory

class PhotoController:
    @staticmethod
    def get_all():
        photos = Photo.query.all()
        return [photo.to_dict() for photo in photos]
    
    @staticmethod
    def get_by_id(photo_id):
        photo = Photo.query.get_or_404(photo_id)
        image_path = os.path.join(current_app.root_path, photo.image_url)
        print(image_path)
        # Comprobar si el archivo existe
        if os.path.isfile(image_path):
            return send_file(image_path, mimetype='image/png')
        else:
            abort(404, description="Imagen no encontrada")
        """
        print("----->",photo_id)
        return send_from_directory('uploads', 'Captura_de_pantalla_122.png')
        """
    """
    @staticmethod
    def get_by_id(photo_id):
        photo = Photo.query.get_or_404(photo_id)
        return photo.to_dict()
    """
    
    @staticmethod
    def create(data):
        new_photo = Photo(
            issue_id=data.get('issue_id'),
            image_url=data.get('image_url'),
            caption=data.get('caption'),
            taken_at=datetime.fromisoformat(data.get('taken_at')) if data.get('taken_at') else None
        )
        
        db.session.add(new_photo)
        db.session.commit()
        
        return new_photo.to_dict(), 201
    
    @staticmethod
    def update(photo_id, data):
        photo = Photo.query.get_or_404(photo_id)
        
        if 'issue_id' in data:
            photo.issue_id = data['issue_id']
        if 'image_url' in data:
            photo.image_url = data['image_url']
        if 'caption' in data:
            photo.caption = data['caption']
        if 'taken_at' in data:
            photo.taken_at = datetime.fromisoformat(data['taken_at']) if data['taken_at'] else None
        
        db.session.commit()
        
        return photo.to_dict()
    
    @staticmethod
    def delete(photo_id):
        photo = Photo.query.get_or_404(photo_id)
        
        db.session.delete(photo)
        db.session.commit()
        
        return {"message": "Photo deleted successfully"}, 200

    @staticmethod
    def create_with_file(data, file):
        filename = secure_filename(file.filename)
        upload_folder = current_app.config['UPLOAD_FOLDER']
        os.makedirs(upload_folder, exist_ok=True)

        # Ruta absoluta para guardar el archivo
        abs_path = os.path.join(upload_folder, filename)
        file.save(abs_path)

        # Ruta relativa a guardar en la DB
        rel_path = os.path.relpath(abs_path, start=current_app.root_path)

        new_photo = Photo(
            issue_id=data.get('issue_id'),
            image_url=rel_path,  # Ruta relativa
            caption=data.get('caption'),
            taken_at=datetime.fromisoformat(data.get('taken_at')) if data.get('taken_at') else None
        )

        db.session.add(new_photo)
        db.session.commit()

        return new_photo.to_dict(), 201