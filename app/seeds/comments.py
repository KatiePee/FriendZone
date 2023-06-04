from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from .posts import random_date

def seed_comments():

    comment1 = Comment(
        user_id = 8,
        post_id = 6,
        content = 'Eat, sleep breath Code! It never stops!!',
        created_at = random_date(datetime(2023,5,1), datetime.now()),
    )

    comment2 = Comment(
        user_id = 4,
        post_id = 8,
        content = 'OMG! Millie is so cute! 😻',
        created_at = random_date(datetime(2023,5,1), datetime.now()),
    )

    comment3 = Comment(
        user_id = 4,
        post_id = 12,
        content = "ALL HAIL LORD KEEGAN 🙌",
        created_at = random_date(datetime(2023,5,1), datetime.now()),
    )

    comment4 = Comment(
        user_id = 5,
        post_id = 12,
        content = 'Yes, Lord Keegan',
        created_at = random_date(datetime(2023,5,1), datetime.now()),
    )

    comment5 = Comment(
        user_id = 5,
        post_id = 10,
        content = 'Reach for the stars! Say 100k and I gotchu instead!',
        created_at = random_date(datetime(2023,5,1), datetime.now()),
    )

    comment6 = Comment(
        user_id = 6,
        post_id = 12, # Just changed
        content = 'I will never dissapoint you again, m\'lord!',
        created_at = random_date(datetime(2023,5,1), datetime.now()),        
    )

    comment7 = Comment(
        user_id = 6,
        post_id = 4,
        content = 'OMG! Look at those toe beans, so cuteeeeeeee, yummy! playdate with Millie soon! :)',
        created_at = random_date(datetime(2023,5,1), datetime.now())
    )
    
    comment8 = Comment(
        user_id = 7,
        post_id = 12,
        content = 'We are at your service, Lord Keegan!',
        created_at = random_date(datetime(2023,5,1), datetime.now()),
    )

    comment9= Comment(
        user_id = 7,
        post_id = 7,
        content = 'Too bad, we have a group project to do!',
        created_at = random_date(datetime(2023,5,1), datetime.now()),
    )

    
    comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9]
    [db.session.add(comment) for comment in comments]
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()