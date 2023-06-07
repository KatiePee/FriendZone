from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileAllowed


class CommentForm(FlaskForm):
    content = StringField('Content')
    post_id = IntegerField("post_id")
