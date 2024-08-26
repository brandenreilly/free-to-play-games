from flask import render_template, request, redirect, url_for
from flask_admin.contrib.sqla import ModelView
from .models import User, Favorites

class UserAdmin(ModelView):
    column_list = ('id', 'username', 'email', 'bio')
    column_labels = dict(id='Id', username='Username', email='Email', bio='Bio')
    column_filters = ('id', 'username', 'email', 'bio')

class FavoritesAdmin(ModelView):
    column_list = ('title', 'user')
    column_labels = {'title': 'Title', 'user': 'User'}
    column_filters = ('title', 'user')