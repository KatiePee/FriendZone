from app.models import db, friendship, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_friendhips():
    pass

def undo_friendships():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friendships RESTART IDENTITY CASCADE;")
  else:
        db.session.execute(text("DELETE FROM likes"))

  db.session.commit()
