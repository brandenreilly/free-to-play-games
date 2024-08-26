import os
from flask_admin import Admin
from .models import db, User, Favorites
from .views import UserAdmin, FavoritesAdmin
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'lux'
    admin = Admin(app, name='F2PF Admin', template_mode='bootstrap4')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(UserAdmin(User, db.session))
    #admin.add_view(ModelView(User, db.session))
    admin.add_view(FavoritesAdmin(Favorites, db.session))
    #admin.add_view(ModelView(Favorites, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))