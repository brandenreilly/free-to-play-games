"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    sent_user = request.json
    username = sent_user['username']
    password = sent_user['password']
    find_user = User.query.filter_by(username=username,password=password).first()
    if find_user:
        if password == find_user.password:
            logged_in = find_user.serialize()
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token, id=find_user.id), 200
        else:
            return jsonify({"msg": "Incorrect login information."}), 401
    else:
        return jsonify({"msg": "No account with matching username found, try creating an account."}), 

@api.route('/create', methods=['POST'])
def handle_create_user():
    sent_info = request.json
    email = sent_info['email']
    username = sent_info['username']
    password = sent_info['password']
    if email != '':
        if username != '':
            if password != '':
                new_user = User(email=sent_info['email'], username=sent_info['username'], password=sent_info['password'])
                db.session.add(new_user)
                db.session.commit()
                get_user = User.query.filter_by(email=sent_info['email']).first()
                if get_user:
                    return jsonify({"completed": True, "msg": "Account created successfully."}), 201
                else:
                    return jsonify({"completed": False, "msg": "There was an error creating your account."}), 500
            else: 
                return jsonify({"completed": False, "msg": "There was an error creating your account."}), 500
        else: 
            return jsonify({"completed": False, "msg": "There was an error creating your account."}), 500
    else: 
        return jsonify({"completed": False, "msg": "There was an error creating your account."}), 500

@api.route('/finduser/<email>', methods=['GET'])
def handle_get_user(email):
    find_user = User.query.filter_by(email=email).first()
    if find_user:
        send_user = find_user.serialize()
        return jsonify(id=find_user.id), 200
    
@api.route('/update/password', methods=['PATCH'])
@jwt_required()
def handle_update_user():
    current_user = get_jwt_identity()
    sent_info = request.json
    password = sent_info['password']
    find_user = User.query.filter_by(username=current_user).first()
    if(find_user):
        find_user.password = password
        db.session.commit()
        return jsonify({"msg": "Updated Successfully"}), 201

@api.route('/token', methods=['GET'])
@jwt_required()
def handle_token():
    current_user = get_jwt_identity()
    get_user = User.query.filter_by(username=current_user).first()
    serialized = get_user.serialize()
    return jsonify(user=serialized), 200