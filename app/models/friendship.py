from .db import db, environment, SCHEMA, add_prefix_for_prod

friendship = db.Table(
    "friendships",
    db.Column(
        'userA_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    db.Column(
        'userB_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    # db.UniqueContrainst("userA_id", "userB_id")
)

if environment == "production":
    friendship.schema = SCHEMA
