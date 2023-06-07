from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Post, User, PostImage, db, friendships, likes, Comment

like_routes = Blueprint('likes', __name__)


#Get all likes by User Id - NEED TESTING
@like_routes.route('/users/<int:id>')
@login_required
def likes_by_user(id):
    """
    Get all the likes by a User Id
    """

    user = User.query.get(id)

    user_likes = user.likes
    likes_list = [user_like.to_dict() for user_like in user_likes]

    return likes_list


#Get all likes by Post Id - NEED TESTING
@like_routes.route('/posts/<int:id>')
@login_required
def likes_by_post(id):
    """
    Get all likes by Post Id
    """

    post = Post.query.get(id)

    post_likes = post.likes
    post_likes_list = [post_like.to_dict() for post_like in post_likes]
    keys_to_remove = ["coverPhotoURL", "createdAt", "gender", "email"]
    for key in keys_to_remove:
        for post_like in post_likes_list:
            if key in post_like:
                del post_like[key]

    return post_likes_list

#like a post by post ID - NEED TESTING
@like_routes.route('/posts/<int:id>', methods=["POST"])
@login_required
def like_a_post(id):
    """
    like a post by post ID
    """
    user = User.query.get(current_user.id)
    post = Post.query.get(id)

    user.likes.append(post)

    db.session.commit()

    return {"message": "Successfully Liked!"}


#Remove a like - NEED TESTING
@like_routes.route('/posts/<int:id>', methods=["DELETE"])
@login_required
def remove_a_like_post(id):
    """
    remove a like on a post by post ID
    """
    user = User.query.get(current_user.id)
    post = Post.query.get(id)

    user.likes.remove(post)

    db.session.commit()

    return {"message": "Successfully unliked!"}
