from flask import render_template, request, redirect, url_for
from flask_admin.contrib.sqla import ModelView
from flask_admin.base import expose
from flask_admin.form import rules
from flask_wtf import FlaskForm 
from wtforms import QuerySelectMultipleField
from flask_admin.form import widgets

from .models import User, Favorites

class UserAdmin(ModelView):
    column_list = ('id', 'username', 'email', 'bio', 'followed')
    column_labels = dict(id='Id', username='Username', email='Email', bio='Bio', followed='Following')
    column_filters = ('id', 'username', 'email', 'bio', 'followed')
    edit_modal = True
    edit_modal_template = 'admin/model/modals/edit.html'

    def _listed_followed_formatter(view, context, model, name):
        return ', '.join([user.username for user in model.followed])

    column_formatters = {
        'followed': _listed_followed_formatter
    }

    form_columns = ('username', 'email', 'bio', 'followed')
    form_overrides = {
        'followed': QuerySelectMultipleField
    }

    def __init__(self, session, **kwargs):
        super(UserAdmin, self).__init__(User, session, **kwargs)

class FavoritesAdmin(ModelView):
    column_list = ('title', 'user.username', 'user.email')
    column_labels = {'title': 'Title', 'user.username': 'Username', 'user.email': 'Email'}
    column_filters = ('title', 'user.username', 'user.email')