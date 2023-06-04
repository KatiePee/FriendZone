from app.models import db, friendships, User, environment, SCHEMA
from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text


def seed_friendships():
  friendships_to_seed = [
    {'userA_id': 1, 'userB_id': 2},
    {'userA_id': 1, 'userB_id': 3},
    {'userA_id': 1, 'userB_id': 4},
    {'userA_id': 1, 'userB_id': 5},
    {'userA_id': 1, 'userB_id': 6},
    {'userA_id': 1, 'userB_id': 7},
    {'userA_id': 1, 'userB_id': 8},
    {'userA_id': 4, 'userB_id': 5},
    {'userA_id': 4, 'userB_id': 6},
    {'userA_id': 4, 'userB_id': 7},
    {'userA_id': 4, 'userB_id': 8},
    {'userA_id': 5, 'userB_id': 8},
    {'userA_id': 5, 'userB_id': 7},
    {'userA_id': 5, 'userB_id': 6},
    {'userA_id': 6, 'userB_id': 7},
    {'userA_id': 7, 'userB_id': 8},
  ]

  for friendship_data in friendships_to_seed:
    userA_id = friendship_data['userA_id']
    userB_id = friendship_data['userB_id']

    friendship = insert(friendships).values(userA_id=userA_id, userB_id=userB_id)

    try:
        db.session.execute(friendship)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(f"Error inserting friendship: {e}")

def undo_friendships():
  if environment == "production":                  
        db.session.execute(f"TRUNCATE table {SCHEMA}.friendships RESTART IDENTITY CASCADE;")
  else:
        db.session.execute(text("DELETE FROM friendships"))

  db.session.commit()
