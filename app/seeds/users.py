from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password',
        first_name = 'Demoyshia',
        last_name = 'Userea',
        profile_picture_url = 'https://marketplace.canva.com/EAE_4-ugJng/1/0/1600w/canva-blue-yellow-simple-professional-instagram-profile-picture-kpwvs_syWG8.jpg',
        cover_photo_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1114339683044954172/1667592397009.png',
        date_of_birth = datetime.strptime('01/01/86', '%m/%d/%y'),
        gender = 'Female',
        age = 36,
        )
    
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()