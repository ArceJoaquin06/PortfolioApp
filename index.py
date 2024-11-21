from flask import Flask, render_template, redirect, url_for, request, flash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Thisissupossedtobesecret!!!'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'Conection Uri: mysql://utgsqhyck7aesers:8VfS4FtfBd4fE8j27Ozp@bmytf04g6ebfei2orhrn-mysql.services.clever-cloud.com:3306/bmytf04g6ebfei2orhrn'
) or 'mysql://utgsqhyck7aesers:8VfS4FtfBd4fE8j27Ozp@bmytf04g6ebfei2orhrn-mysql.services.clever-cloud.com:3306/bmytf04g6ebfei2orhrn'


db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

#crear las clases para la base de datos
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(255))
    is_admin = db.Column(db.Boolean, default=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

with app.app_context():
    db.create_all()  # Crea todas las tablas si no existen
    # Verifica si el usuario ya existe
    existing_user = User.query.filter_by(username='joaquin').first()
    if not existing_user:
        hashed_password = generate_password_hash('joaco123', method='pbkdf2:sha256')
        new_user = User(username='joaquin', email='joaquin@example.com', password=hashed_password, is_admin=True)
        db.session.add(new_user)
        db.session.commit()

# Formularios de Flask-WTF
class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
    remember = BooleanField('remember me')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)

            return redirect(url_for('principal'))

        return '<h1>Invalid username or password</h1>'

    return render_template('login.html', form=form)

class Contact:
    def __init__(self, name, url):
        self.name = name
        self.url = url

@app.route('/')
def principal():
    contact_list = [
        Contact(name="Gmail", url="mailto:arcejoaquin06@gmail.com"),
        Contact(name="Github", url="https://github.com/ArceJoaquin06"),
        Contact(name="Linkedin", url="https://github.com/ArceJoaquin06"),
        Contact(name="Instagram", url="https://www.instagram.com/")
    ]

    return render_template('index.html', contacts=contact_list)

if __name__ == '__main__':
    app.run(debug=True, port=3500)