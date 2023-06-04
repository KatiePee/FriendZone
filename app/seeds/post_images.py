from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_post_images():
  post_image1 = PostImage(
    post_id = 1,
    image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1114698881171718155/IMG_2939.jpg'
  )

  post_image2 = PostImage(
    post_id = 3,
    image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002535002223/IMG_3347.jpg'
  )

  post_image3 = PostImage(
    post_id = 4,
    image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002258169896/IMG_2938.jpg'
  )

  post_image4 = PostImage(
    post_id = 5,
    image_url = 'https://i.imgur.com/sJuu6eF.jpeg'
  )

  post_image5 = PostImage(
    post_id = 5,
    image_url = 'https://i.imgur.com/BbcmTMa.jpeg'
  )

  post_image6 = PostImage(
    post_id = 6,
    image_url = 'https://i.imgur.com/RnGLfOi.png'
  )

  db.session.add_all([post_image1, post_image2, post_image3, post_image4, post_image5, post_image6])

  db.session.commit()


def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
