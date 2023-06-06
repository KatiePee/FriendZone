from flask_wtf import FlaskForm
# from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed, FileField, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class PostImageForm(FlaskForm):
    # image = FileField('Upload Images', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    images = FileField('Upload Images', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))], render_kw={'multiple': True})