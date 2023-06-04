from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

from random import randint

def random_date(start, end):
    """Generate a random datetime between `start` and `end` which
    should be datetime objects"""
    random_date = start + timedelta(
        # Get a random amount of seconds between `start` and `end`
        seconds = randint(0, int((end - start).total_seconds())),
    )
    return random_date

def seed_posts():
    post1 = Post(
        user_id = 1,
        content = 'DEMO USER IN THE HOUSE!',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post2 = Post(
        user_id = 2,
        content = 'Marie had a little lamb, little lamb, little lamb',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post3 = Post(
        user_id = 3,
        content = 'Should I go to the beach or to an amusement park?',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post4 = Post(
        user_id = 4,
        content = 'toe beans 🐾',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post5 = Post(
        user_id = 4,
        content = 'Jelly enjoying the cherry blossoms 🌸',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post6 = Post(
        user_id = 5,
        content = 'Coding all day, coding all night!',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post7 = Post(
        user_id = 5,
        content = "Today, I don\'t feel like doing anything~",
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post8 = Post(
        user_id = 6,
        content = 'Millie and her brothers having a cuddle! ❤️',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post9 = Post(
        user_id = 6,
        content = "In the realm of pure enchantment, where whiskers dance and eyes gleam,\nThere resides a profound love, like a poet's wistful dream.\n\nWith tender grace and playful whims, cats captivate my soul,\nTheir gentle purrs, a symphony, that makes my heart console.\n\nIn moments of solitude, they're my solace, my truest confidant,\nTheir presence, a sanctuary, where worries cease to haunt.\n\nOh, how their feline mystique bewitches with each gentle touch,\nAs they curl upon my lap, an embrace that means so much.\n\nIn their eyes, I find a universe, secrets hidden deep within,\nA universe where love resides, boundless and akin.\n\nWith every rub against my cheek, they leave a trail of bliss,\nA testament to love's embrace, a tender, whiskered kiss.\n\nSo here's to the magical creatures, who grace our lives with glee,\nCats, the poets of the heart, forever cherished, forever free.\n\nIn this ode to their beauty, I declare with love so vast,\nMy heart forever sings their praise, for I am smitten, unsurpassed.",
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post10 = Post(
        user_id = 7,
        content = '70k and I gotchu! 🤑',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post11 = Post(
        user_id = 7,
        content = 'Eating some egg whites and going for a run!',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    post12 = Post(
        user_id = 8,
        content = 'Our group only writes perfect code. 😤',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )


    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12]

    [db.session.add(post) for post in posts]
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
