import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # Maxfiy kalitlar va umumiy sozlamalar
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'mars_space_secret_key_1298471'
    
    # Ma'lumotlar bazasi manzili (SQLAlchemy)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'mars_space.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
