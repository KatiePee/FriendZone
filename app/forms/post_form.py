from flask_wtf import FlaskForm
from wtforms import StringField, MultipleFileField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileAllowed
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    content = StringField('Content')
    images = MultipleFileField('Upload Images', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))], render_kw={'multiple': True})
