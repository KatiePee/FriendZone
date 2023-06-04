from app.models import db, Post, User, environment, SCHEMA
# from .users import users
# from .posts import posts
from sqlalchemy.sql import text
from random import randint

def post(posts):
    index = randint(0, len(posts) -1)
    return posts[index]
    

def seed_likes():
    users = User.query.all()
    posts = Post.query.all()

    [[post(posts).likes.append(user) for user in users] for n in range(3)]
    
    db.session.commit()
   

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
