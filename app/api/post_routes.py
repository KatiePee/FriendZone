from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post, User

post_routes = Blueprint('posts', __name__)

@post_routes.route("/")
@login_required
def posts():
    """
    Query for all posts and returns then in a list of post dictionaries
    """

    posts = Post.query.all()
    posts2 = Post.query.join(User).all()

    post_list = [post for post in posts2]
    print("-------------------------------------------", dir(post_list[0].user))
    return [{'post': post.to_dict(), 'user': post.user.to_dict()} for post in posts2]
    # return {'posts': [post.to_dict() for post in posts]}
