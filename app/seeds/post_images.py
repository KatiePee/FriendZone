from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_post_images():
  post_image1 = PostImage(
    post_id = 1,
    image_url = 'https://i.imgur.com/sJuu6eF.jpeg'
  )

  post_image2 = PostImage(
    post_id = 2,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1115049444912660570/sheep-in-suburbia-a-basic-care-guide.png'
  )

  post_image3 = PostImage(
    post_id = 2,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1115049445411795065/JWQe11218625.png'
  )

  post_image4 = PostImage(
    post_id = 2,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1115049445697011794/adorable-baby-lamb-in-green-meadow.png'
  )

  post_image5 = PostImage(
    post_id = 3,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1115045952680644648/flattencrop_downwebpautojpeg_quality70.png'
  )

  post_image6 = PostImage(
    post_id = 3,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1115047826838261961/wtqqnkYDYi2ifsWZVW2MT4-1200-80.png'
  )

  post_image7 = PostImage(
    post_id = 4,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1114398335567147008/3A257035-4E3D-4738-B196-F7667C080B38.jpg'
  )

  post_image8 = PostImage(
    post_id = 5,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1114399597444468757/30AA907B-7240-442E-B50F-E76F4F948269.jpg'
  )

  post_image9 = PostImage(
    post_id = 8,
    image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002535002223/IMG_3347.jpg'
  )

  post_image10 = PostImage(
    post_id = 9,
    image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1114698881171718155/IMG_2939.jpg'
  )

  post_image11 = PostImage(
    post_id = 9,
    image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002258169896/IMG_2938.jpg'
  )

  post_image12 = PostImage(
    post_id = 6,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1115040244962689114/programming-code-abstract-technology-background-of-software-developer-and-computer-script.png'
  )

  post_image13 = PostImage(
    post_id = 11,
    image_url = 'https://cdn.discordapp.com/attachments/1114339565491200170/1115045185945088050/Scrambled-Egg-Whites-2-3.png'
  )

  post_image14 = PostImage(
    post_id = 12,
    image_url = 'https://i.imgur.com/BbcmTMa.jpeg'
  )

  db.session.add_all([post_image1, post_image2, post_image3, post_image4, post_image5, post_image6, post_image7, post_image8, post_image9, post_image10, post_image11, post_image12, post_image13, post_image14])

  db.session.commit()


def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
