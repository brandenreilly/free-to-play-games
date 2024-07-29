from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    bio = db.Column(db.String(250), unique=False, nullable=True)
    profile_pic = db.Column(db.String(255), unique=False, nullable=True)
    favorites = db.relationship('Favorites', backref='user', lazy=True)

    def __repr__(self):
        return f'User {self.email}'
    
    def as_dict(self):
        return {
            "id": self.id
        }

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "bio": self.bio,
            "profile_pic": self.profile_pic,
            # do not serialize the password, its a security breach
        }
    
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    game_id = db.Column(db.Integer)
    title = db.Column(db.String(250))
    pic = db.Column(db.String(250))
    url = db.Column(db.String(250))
    genre = db.Column(db.String(250))
    platform = db.Column(db.String(250))
    developer = db.Column(db.String(250))
    publisher = db.Column(db.String(250))
    description = db.Column(db.String(250))
    release_date = db.Column(db.String(250))

    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "game_id": self.game_id,
            "title": self.title,
            "pic": self.pic,
            "url": self.url,
            "genre": self.genre,
            "platform": self.platform,
            "developer": self.developer,
            "publisher": self.publisher,
            "description": self.description,
            "release_date": self.release_date
        }