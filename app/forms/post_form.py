from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileAllowed
from app.models import Post

class CreatePost(FlaskForm):
    content = StringField('Content')
    # images = FileField('Upload Images', validators=[FileAllowed(['jpg', 'jpeg', 'png'])], render_kw={'multiple': True})
    image = StringField('Upload Image')
