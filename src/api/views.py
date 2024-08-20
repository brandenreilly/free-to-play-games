from flask import render_template, request, redirect, url_for
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_admin.contrib.sqla import ModelView
from app import app, db
from models import User, Favorites