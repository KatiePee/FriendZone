from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Comment, User
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.orm import joinedload
from sqlalchemy import or_

comment_routes = Blueprint('comments', __name__)


#Create - FINISHED AND WORKING!!!
@comment_routes.route('/new', methods=["POST"])
@login_required
def create_comment():
    """
    Create a comment
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            content = form.data['content'],
            user_id = current_user.id,
            post_id = form.data["post_id"]
        )

        author = User.query.get(current_user.id)

        db.session.add(new_comment)
        db.session.commit()

        comment = new_comment.to_dict()
        comment["commentAuthor"] = author.to_dict()

        keys_to_remove = ["coverPhotoURL", "createdAt", "gender", "email"]

        for key in keys_to_remove:
          if key in comment["commentAuthor"]:
                        del comment["commentAuthor"][key]

        # new_comment["commentAuthor"].append(author.to_dict())

        return comment

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Update - NEED TESTING
@comment_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_comment(id):
    """
    Update a comment
    """
    form = CommentForm()
    comment_post = Comment.query.get(id)

    if form.validate_on_submit():
        comment_post.content = form.data['content']

        db.session.commit()
        return comment_post.to_dict()


#Delete - NEED TESTING
@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_comment(id):
    comment_to_delete = Comment.query.get(id)
    db.session.delete(comment_to_delete)
    db.session.commit()
    return jsonify({"message": "Sucessfully deleted"})
