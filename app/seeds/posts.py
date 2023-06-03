from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

from random import randint

def random_date(start, end):
    """Generate a random datetime between `start` and `end` which
    should be datetime objects"""
    random_date = start + timedelta(
        # Get a random amount of seconds between `start` and `end`
        seconds=randint(0, int((end - start).total_seconds())),
    )
    return random_date

def seed_posts():
    post1 = Post(
        user_id = 1,
        content = 'toe beans 🐾',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    post2 = Post(
        user_id = 2,
        content = 'Coding all day, coding all night!',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    post3 = Post(
        user_id = 3,
        content = 'Millie and her brothers having a cuddle! ❤️',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )
    post4 = Post(
        user_id = 4,
        content = "In the realm of pure enchantment, where whiskers dance and eyes gleam,\nThere resides a profound love, like a poet's wistful dream.\n\nWith tender grace and playful whims, cats captivate my soul,\nTheir gentle purrs, a symphony, that makes my heart console.\n\nIn moments of solitude, they're my solace, my truest confidant,\nTheir presence, a sanctuary, where worries cease to haunt.\n\nOh, how their feline mystique bewitches with each gentle touch,\nAs they curl upon my lap, an embrace that means so much.\n\nIn their eyes, I find a universe, secrets hidden deep within,\nA universe where love resides, boundless and akin.\n\nWith every rub against my cheek, they leave a trail of bliss,\nA testament to love's embrace, a tender, whiskered kiss.\n\nSo here's to the magical creatures, who grace our lives with glee,\nCats, the poets of the heart, forever cherished, forever free.\n\nIn this ode to their beauty, I declare with love so vast,\nMy heart forever sings their praise, for I am smitten, unsurpassed.",
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    post5 = Post(
        user_id = 1,
        content = 'Jelly enjoying the cherry blossoms 🌸',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    post6 = Post(
        user_id = 6,
        content = 'This is the sixth post from user number 6',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    post7 = Post(
        user_id = 7,
        content = 'This is the sixth post from user number 7',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    post8 = Post(
        user_id = 8,
        content = 'This is the sixth post from user number 8',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    post9 = Post(
        user_id = 9,
        content = 'This is the sixth post from user number 9',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    post10 = Post(
        user_id = 10,
        content = 'This is the sixth post from user number 10',
        created_at = random_date(datetime(2022, 1, 1), datetime.now())
    )

    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10]

    [db.session.add(post) for post in posts]
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
