from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Post, User, PostImage, db, friendships, likes, Comment
from app.forms import PostForm
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

## Get all posts - FINISHED
@post_routes.route("/")
@login_required
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

            comments = post.comments
            comments_list = []
            for comment in comments:
                commentAuthor = comment.user.to_dict()
                comment_dict = comment.to_dict()
                comment_dict["commentAuthor"] = commentAuthor
                comments_list.append(comment_dict)

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
                for comment in comments_list:
                    if key in comment["commentAuthor"]:
                        del comment["commentAuthor"][key]

            post_dict['comments'] = comments_list
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


## Delete A Post - FINISHED
@post_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def remove_post(id):
    """
    Delete a post
    """
    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post successfully deleted'}


## Get Single Post - FINISHED
@post_routes.route('/<int:id>')
@login_required
def single_post(id):
    """
    Query for a single post and returns it in a dictionary
    """
    post = Post.query.get(id)
    post_dict = post.to_dict()

    post_dict['postImages'] = [post.post_image.to_dict() for post.post_image in post.post_images]

    comments = post.comments
    comments_list = []
    for comment in comments:
        commentAuthor = comment.user.to_dict()
        comment_dict = comment.to_dict()
        comment_dict["commentAuthor"] = commentAuthor
        comments_list.append(comment_dict)

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
        for comment in comments_list:
                    if key in comment["commentAuthor"]:
                        del comment["commentAuthor"][key]

    post_dict['comments'] = comments_list
    post_dict['author'] = author_dict
    post_dict['likedBy'] = likedBy

    del post_dict['userId']

    return post_dict

## Update Post - NEEDS TESTING
@post_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_post(id):
    """
    Update a post
    """
    post = Post.query.get(id)

    # if not post:
    #     return {'message': 'Post not found'}, 404

    # if id != current_user.id:
    #     return {'message': 'Forbidden'}, 403

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.content = form.data['content']

        db.session.commit()
        return post.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


## Get Posts by User ID - FINISHED
@post_routes.route("/users/<int:id>")
@login_required
def user_posts(id):
    """
    Query for all posts by userId
    """
    #Grabs user
    user = User.query.get(id)

    #Grabs current user posts
    user_posts = user.posts

    posts_list = []
    for post in user_posts:
        post_dict = post.to_dict()

        post_dict['postImages'] = [post.post_image.to_dict() for post.post_image in post.post_images]

        comments = post.comments
        comments_list = []
        for comment in comments:
            commentAuthor = comment.user.to_dict()
            comment_dict = comment.to_dict()
            comment_dict["commentAuthor"] = commentAuthor
            comments_list.append(comment_dict)

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
            for comment in comments_list:
                    if key in comment["commentAuthor"]:
                        del comment["commentAuthor"][key]

        post_dict['comments'] = comments_list
        post_dict['author'] = author_dict
        post_dict['likedBy'] = likedBy

        del post_dict['userId']

        posts_list.append(post_dict)
    return posts_list
