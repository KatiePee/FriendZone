from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, friendships, db
from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_, delete

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
    friends_list = [friend.to_dict() for friend in friends if current_user.id != friend.id]
    return friends_list

@user_routes.route('/<int:id>/friends')
@login_required
def friends(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    friends = user.friendships
    friends_list = [friend.to_dict() for friend in friends if user.id != friend.id]
    return friends_list

@user_routes.route('/<int:id>/add', methods=['POST'])
@login_required
def add_friend(id):
    """
    Post new friendship current user is adding new user based on userid
    """
    # current_user = User.query.get(current_user.id)
    new_friend = User.query.get(id)

    # current_user.freindships.append(new_friend)
    friendship = insert(friendships).values(userA_id=current_user.id, userB_id=id)

    db.session.execute(friendship)
    db.session.commit()

    # return {"message": f"Successfully added {new_friend.first_name} as a friend, yay!"}
    print('~~~~~~~~~~~~~~~~~~~~~~~~~~~ new friend', new_friend)
    if new_friend != current_user:
        return new_friend.to_dict()
    else: 
        return {'errors': ['User cannot be their own friend']}, 404
    # return new_friend.to_dict()


@user_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def unfriend(id):
    """
    Delete a friendship
    """

    friend = User.query.get(id)
    current_user_friends = current_user.friendships

    delete_query = delete(friendships).where(
    ((friendships.c.userA_id == current_user.id) & (friendships.c.userB_id == id)) |
    ((friendships.c.userA_id == id) & (friendships.c.userB_id == current_user.id)))

    db.session.execute(delete_query)
    db.session.commit()
    # return {"message": f"Successfully unfriended 😈"}
    return friend.to_dict()
