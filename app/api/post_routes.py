from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post, User, PostImage
from sqlalchemy.orm import joinedload
post_routes = Blueprint('posts', __name__)

@post_routes.route("/")
@login_required
def posts():
    """
    Query for all posts and returns then in a list of post dictionaries
    """

    # posts = Post.query.all()
    posts = Post.query.join(User).join(PostImage, isouter=True).options(joinedload(Post.post_images)).all()
    print('---------posts dir--------', dir(posts[0]))
    return [{'post': post.to_dict(), 'user': post.user.to_dict(), 'postImages': [post.post_image.to_dict() for post.post_image in post.post_images] } for post in posts]
    # return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:id>')
@login_required
def single_post():
    """
    Query for a single post and returns it in a dictionary 
    """
    

