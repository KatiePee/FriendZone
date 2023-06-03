from .db import db, environment, SCHEMA, add_prefix_for_prod

class PostImage(db.Model):
    __tablename__='post_images'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    image_url = db.Column(db.String(255), nullable= False)

    post = db.relationship('Post', back_populates='post_images')

    def to_dict(self):
        return {
            "id": self.id,
            "postId": self.post_id,
            "imageUrl": self.image_url
        }
