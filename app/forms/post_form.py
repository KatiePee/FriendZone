from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileAllowed, FileField, FileRequired
from app.models import Post
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    content = StringField('Content')
    image = FileField('Upload Images', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # images = FileField('Upload Images', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))], render_kw={'multiple': True})
    # image = StringField('Upload Image')
