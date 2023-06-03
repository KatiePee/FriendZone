from app.models import db, Post, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    user1 = User.query.get(1)
    post1 = Post.query.get(1)
    user1.likes.append(post1)

    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
