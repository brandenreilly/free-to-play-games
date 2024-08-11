from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

following = db.Table('following',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('timestamp', db.DateTime, default=datetime.utcnow)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    bio = db.Column(db.String(250), unique=False, nullable=True)
    profile_pic = db.Column(db.String(255), unique=False, nullable=True)
    favorites = db.relationship('Favorites', backref='user', lazy=True)

    # Defining a Many-To-Many relationship
    followed = db.relationship(
        'User',
        secondary=following,
        primaryjoin=id==following.c.follower_id,
        secondaryjoin=id==following.c.followed_id,
        backref=db.backref('followers', lazy='dynamic'),
        lazy='dynamic'
    )
    
    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)
            db.session.commit()

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)
            db.session.commit()

    def is_following(self, user):
        return self.followed.filter(following.c.followed_id == user.id).count() > 0
    
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
    def serialize_bio(self):
        return {
            "bio": self.bio
        }
    def serialize_profile_pic(self):
        return {
            "profile_pic": self.profile_pic
        }
    def serialize_followed(self):
        return [user.serialize() for user in self.followed]
    def serialize_followers(self):
        return [user.serialize() for user in self.followers]


    
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
