from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import Length, DataRequired
from flask_wtf.file import FileAllowed


class CommentForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired(), Length(min=1, max=255)])
    post_id = IntegerField("post_id")
