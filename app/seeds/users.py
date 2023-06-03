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
        gender='Female',
        age=36,
        )

    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        first_name='Mariniesa',
        last_name='paprika',
        profile_picture_url= 'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg',
        cover_photo_url= 'https://t4.ftcdn.net/jpg/04/67/93/01/360_F_467930159_UcfrOkjhFG436zoT9fSetYccBgpNkokp.jpg',
        date_of_birth= datetime.strptime('05/05/96', '%m/%d/%y'),
        gender='Female',
        age=27
        )

    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        first_name='bobathu',
        last_name='barthalemu',
        profile_picture_url= 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
        cover_photo_url= 'https://marketplace.canva.com/EAENvp21inc/1/0/1600w/canva-simple-work-linkedin-banner-qt_TMRJF4m0.jpg',
        date_of_birth= datetime.strptime('12/25/96', '%m/%d/%y'),
        gender='Male',
        age=27
        )

    adanna = User(
        username = 'adanna.liu',
        email = 'adanna.c.liu@gmail.com',
        password = 'adanna',
        first_name = 'Adanna',
        last_name = 'Liu',
        profile_picture_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1114339580863336458/1675961959647.png',
        cover_photo_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1114339683044954172/1667592397009.png',
        date_of_birth = datetime.strptime('06/10/98', '%m/%d/%y'),
        gender = 'Female',
        age = '24'
    )

    albert = User(
        username = 'trebs',
        email = 'Alberthsk115@gmail.com',
        password = 'albert',
        first_name = 'Albert',
        last_name = 'Kim',
        profile_picture_url = 'https://cdn.discordapp.com/attachments/1114341543340408832/1114341568766300221/Screenshot_2023-06-02_at_4.54.20_PM.png',
        cover_photo_url = 'https://i.imgur.com/fYT3mbn.jpg',
        date_of_birth = datetime.strptime('01/15/96', '%m/%d/%y'),
        gender = 'Male',
        age = '27'
    )

    katie = User(
        username = 'KatiePee',
        email = 'katie@gmail.com',
        password = 'katie',
        first_name = 'Katie',
        last_name = 'Pee',
        profile_picture_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1114339232719327252/IMG_4570.jpg',
        cover_photo_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1114339866310889492/coverphoto_1.jpeg',
        date_of_birth = datetime.strptime('08/16/89', '%m/%d/%y'),
        gender = 'Female',
        age = '34'
    )


    pj = User(
        username = 'pjsingh22',
        email = 'pjsingh1359@gmail.com',
        password = 'password',
        first_name = 'Pj',
        last_name = 'Singh',
        profile_picture_url = 'https://cdn.discordapp.com/attachments/1113217055446024242/1114668789393522878/profile-pic-professional.jpg',
        cover_photo_url = 'https://static.vecteezy.com/system/resources/thumbnails/005/715/816/small/banner-abstract-background-board-for-text-and-message-design-modern-free-vector.jpg',
        date_of_birth = datetime.strptime('05/03/96', '%m/%d/%y'),
        gender = 'Male',
        age = '27'
    )

    lord_keegan = User(
        username = 'LordKeegan',
        email = 'lordkeegan@gmail.com',
        password = 'password',
        first_name = 'Keegan',
        last_name = 'Abley',
        profile_picture_url = 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/01/pokemon-squirtle-squad-return-anime.jpg',
        cover_photo_url = 'https://www.pokeharbor.com/wp-content/uploads/2021/04/Firefighter-Squirtle-Squad.jpg',
        date_of_birth = datetime.strptime('02/05/92', '%m/%d/%y'),
        gender = 'Male',
        age = '33'
    )



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(adanna)
    db.session.add(katie)
    db.session.add(pj)
    db.session.add(albert)
    db.session.add(lord_keegan)
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
