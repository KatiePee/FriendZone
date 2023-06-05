from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    content = db.Column(db.String(2040), nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    user = db.relationship('User', back_populates='posts')
    likes = db.relationship('User', secondary="likes", back_populates="likes")
    post_images = db.relationship('PostImage', back_populates='post')

    comments = db.relationship('Comment', back_populates='post')
    

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "content": self.content,
            "createdAt": self.created_at # TODO: maybe convert to string here?
        }
