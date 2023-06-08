from .db import db, environment, SCHEMA, add_prefix_for_prod
from .friendship import friendships
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import or_


class User(db.Model, UserMixin):
    """
    create a user model

    documentation:
      - self referential many-to-many: https://docs.sqlalchemy.org/en/20/orm/join_conditions.html#self-referential-many-to-many
    """
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    profile_picture_url = db.Column(db.String(255), nullable = False)
    cover_photo_url = db.Column(db.String(255), nullable = False)
    date_of_birth = db.Column(db.Date, nullable = False)
    gender = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    posts = db.relationship('Post', back_populates='user', cascade="all, delete-orphan")
    # likes = db.relationship('User', secondary="likes", back_populates="likes", passive_deletes=True, cascade="all, delete")
    # not sure about cascade="all, delete" vs. passive_deletes=True
    likes = db.relationship('Post', secondary="likes",  back_populates="likes", cascade="all, delete")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")

    friendships = db.relationship(
        "User",
        secondary="friendships",
        primaryjoin=or_(friendships.c.userA_id == id, friendships.c.userB_id == id),
        secondaryjoin=or_(friendships.c.userA_id == id, friendships.c.userB_id == id),
        back_populates='friendships',
        cascade="all, delete"
        )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profilePicURL": self.profile_picture_url,
            "coverPhotoURL": self.cover_photo_url,
            "gender": self.gender,
            "createdAt": self.created_at # TODO: maybe convert to string here?
       }
