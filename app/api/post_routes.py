from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Post, User, PostImage, db, friendships, likes, Comment
from app.forms import PostForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.orm import joinedload
from sqlalchemy import or_


post_routes = Blueprint('posts', __name__)

## Get all posts - FINISHED
@post_routes.route("/")
# @login_required
def posts():
    """
    Query for all posts and returns then in a list of post dictionaries
    """
    #Grabs current user
    user = User.query.get(current_user.id)

    #Grabs current user friendships
    friends = user.friendships

    posts_list = []
    for friend in friends:
        posts = friend.posts
        for post in posts:
            post_dict = post.to_dict()

            post_dict['postImages'] = [post.post_image.to_dict() for post.post_image in post.post_images]

            post_dict['comments'] = [post.comment.to_dict() for post.comment in post.comments]

            likes = post.likes
            post_dict['numLikes'] = len(likes)
            likedBy = [like.to_dict() for like in likes]

            author = User.query.get(post_dict["userId"])
            author_dict = author.to_dict()

            keys_to_remove = ["coverPhotoURL", "createdAt", "gender", "email"]
            for key in keys_to_remove:
                if key in author_dict:
                    del author_dict[key]
                for like in likedBy:
                    if key in like:
                        del like[key]

            post_dict['author'] = author_dict
            post_dict['likedBy'] = likedBy

            del post_dict['userId']

            posts_list.append(post_dict)
    return posts_list


## Create New Post - FINISHED
@post_routes.route("/new", methods=['POST'])
@login_required
def create_post():
    """
    Create a post
    """
    form = PostForm()
    print(current_user)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            content = form.data['content'],
            user_id = current_user.id
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()


## Delete A Post - NOT FINISHED/CHECKED
@post_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def remove_post(id):
    """
    Delete a post
    """

    """
        1. Query the post id
        2. Check to see if the post_id matches the owner of the id? I guess we can do this in react
        3. Remove post
    """
    post = Post.query.get(id)
    if post:
        post.remove()
        return jsonify({'message': 'Post deleted successfully'})




## Get Single Post - CHECK THIS
@post_routes.route('/<int:id>')
@login_required
def single_post(id):
    """
    Query for a single post and returns it in a dictionary
    """
    post = Post.query\
        .filter_by(id=id)\
        .join(User)\
        .join(PostImage, isouter=True)\
        .options(joinedload(Post.post_images))\
        .join(likes, Post.id == likes.c.post_id, isouter=True) \
        .first()

    post_dic = {}

    post_dic.update(post.to_dict())
    post_dic.update({'user': post.user.to_dict()} )
    post_dic.update({'postImages': [post.post_image.to_dict() for post.post_image in post.post_images]})
    del post_dic['userId']
    post_likes = post.likes
    liked_by = [user.to_dict() for user in post_likes]
    post_dic['likes'] = len(post.likes)
    post_dic['liked_by'] = liked_by

    return post_dic

# TODO: Update Post - INCOMPLETE
@post_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_post():
    """
    Update a post
    """
    form = PostForm()
    print(current_user)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            content = form.data['content'],
            user_id = current_user.id
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()

# TODO: Get User Posts
    #Grabs current user
    # user = User.query.get(current_user.id)

    # #Grabs current user posts
    # user_posts = user.posts
    # print('----------------user posts---------', user_posts)
