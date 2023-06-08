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
    #user1
    users[0].likes.append(posts[0])
    users[0].likes.append(posts[1])
    users[0].likes.append(posts[2])
    users[0].likes.append(posts[3])
    users[0].likes.append(posts[4])
    users[0].likes.append(posts[5])
    users[0].likes.append(posts[6])
    users[0].likes.append(posts[7])
    users[0].likes.append(posts[11])

    #user2
    users[1].likes.append(posts[0])
    users[1].likes.append(posts[2])
    users[1].likes.append(posts[3])
    users[1].likes.append(posts[6])
    users[1].likes.append(posts[7])
    users[1].likes.append(posts[11])
    
    #user3
    users[2].likes.append(posts[0])
    users[2].likes.append(posts[2])
    users[2].likes.append(posts[3])
    users[2].likes.append(posts[4])
    users[2].likes.append(posts[5])
    users[2].likes.append(posts[6])
    users[2].likes.append(posts[7])
    users[2].likes.append(posts[8])
    users[2].likes.append(posts[9])
    users[2].likes.append(posts[10])
    users[2].likes.append(posts[11])
    
    # user 4
    users[3].likes.append(posts[5])
    users[3].likes.append(posts[6])
    users[3].likes.append(posts[7])
    users[3].likes.append(posts[8])
    users[3].likes.append(posts[9])
    users[3].likes.append(posts[10])
    users[3].likes.append(posts[11])

    # user 5
    users[4].likes.append(posts[3])
    users[4].likes.append(posts[4])
    users[4].likes.append(posts[7])
    users[4].likes.append(posts[8])
    users[4].likes.append(posts[9])
    users[4].likes.append(posts[10])
    users[4].likes.append(posts[11])

    # user 6
    users[5].likes.append(posts[3])
    users[5].likes.append(posts[4])
    users[5].likes.append(posts[7])
    users[5].likes.append(posts[8])
    users[5].likes.append(posts[11])

    # user 7
    users[6].likes.append(posts[3])
    users[6].likes.append(posts[4])
    users[6].likes.append(posts[5])
    users[6].likes.append(posts[6])
    users[6].likes.append(posts[7])
    users[6].likes.append(posts[8])
    users[6].likes.append(posts[11])

    # user 8
    users[7].likes.append(posts[3])
    users[7].likes.append(posts[4])
    users[7].likes.append(posts[5])
    users[7].likes.append(posts[6])
    users[7].likes.append(posts[7])
    users[7].likes.append(posts[11])



    # entries = []

    # for n in range(3):
    #   for user in users:
    #       rand_post = post(posts)

    #       if (user.id, rand_post.id) not in entries:
    #           entries.append((user.id, rand_post.id))
    #           rand_post.likes.append(user)

    # [[post(posts).likes.append(user) for user in users] for n in range(3)]

    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
