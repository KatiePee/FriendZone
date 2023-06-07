from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, friendships, db
from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/friends')
@login_required
def my_friends():
    """
    Query for current users friends
    """
    friends = current_user.friendships

    return [friend.to_dict() for friend in friends]

@user_routes.route('/<int:id>/friends')
@login_required
def friends(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    friends = user.friendships

    return [friend.to_dict() for friend in friends]

# @user_routes.route('/<int:id>/add', method=['POST'])
# @login_required
# def add_friend(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     current_user = current_user.id
#     new_friend = User.query.get(id)
    
#     friendship = insert(friendships).values(userA_id=current_user, userB_id=id)

#     try:
#         db.session.execute(friendship)
#         db.session.commit()
#         return {"message": f"current user successfully added {new_friend.firstName} as a friend, yay!"}
#     except IntegrityError as e:
#         db.session.rollback()
#         print(f"Error inserting friendship: {e}")
#         return {"error": f"Error inserting friendship: {e}"}