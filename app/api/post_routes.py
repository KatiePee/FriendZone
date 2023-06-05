from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Post, User, PostImage, db, friendships, likes
from app.forms import PostForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.orm import joinedload


post_routes = Blueprint('posts', __name__)

## Get all posts - FINISHED
@post_routes.route("/")
# @login_required
def posts():
    """
    Query for all posts and returns then in a list of post dictionaries
    """
    # get the current user
    user = current_user.id
    print('----------user----------', user)
    friends = User.query \
        .join(friendships, (User.id == friendships.c.userA_id) | (User.id == friendships.c.userB_id)) \
        .filter(friendships.c.userA_id == user or friendships.c.userB_id == user)\
        .all()
    
    print('--------friends----------', friends)

    friend_ids = [user.id for user in friends]
    print('--------friend ids-----------', friend_ids)
    
    user4 = User.query.get(4)
    print('-------user4 in friends-------', user4 in friends)

    # posts = Post.query.all()
    posts = Post.query \
        .join(User) \
        .join(PostImage, isouter=True) \
        .join(likes, Post.id == likes.c.post_id, isouter=True) \
        .options(joinedload(Post.post_images)) \
        .filter(User.id.in_(friend_ids))\
        .order_by(Post.created_at.desc())\
        .all()
    
    # .filter(Post.user in friends) \
    # all_posts = [{'post': post.to_dict(), 'user': post.user.to_dict(), 'postImages': [post.post_image.to_dict() for post.post_image in post.post_images] } for post in posts]
    return_posts = []
    for post in posts:
        post_dic = {}
        
        post_dic.update(post.to_dict())
        post_dic.update({'user': post.user.to_dict()} )
        post_dic.update({'postImages': [post.post_image.to_dict() for post.post_image in post.post_images]})
        del post_dic['userId']


        return_posts.append(post_dic)

    all_posts = [{'post': post.to_dict(), 'user': post.user.to_dict(), 'postImages': [post.post_image.to_dict() for post.post_image in post.post_images] } for post in posts]
    return return_posts

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




## Get Single Post
@post_routes.route('/<int:id>')
@login_required
def single_post(id):
    """
    Query for a single post and returns it in a dictionary
    """
    post = Post.query.filter_by(id=id).join(User).join(PostImage, isouter=True).options(joinedload(Post.post_images)).first()
    return {'post': post.to_dict(), 'user': post.user.to_dict(), 'postImages': [post.post_image.to_dict() for post.post_image in post.post_images] }
