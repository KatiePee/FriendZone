from flask_wtf import FlaskForm
from wtforms import StringField, MultipleFileField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed, FileField, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    content = StringField('Content')
    images = MultipleFileField('Upload Images', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))], render_kw={'multiple': True})
    # image = FileField('Upload Images', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # image = StringField('Upload Image')
