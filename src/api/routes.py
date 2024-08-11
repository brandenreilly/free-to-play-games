"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def handle_users():
    users = User.query.all()
    list_users = list(map(lambda x: x.serialize(), users))
    return jsonify(list_users), 200

@api.route('/login', methods=['POST'])
def handle_login():
    sent_user = request.json
    username = sent_user['username']
    password = sent_user['password']
    find_user = User.query.filter_by(username=username,password=password).first()
    if find_user:
        if password == find_user.password:
            logged_in = find_user.serialize()
            access_token = create_access_token(identity=username, fresh=True)
            refresh_token = create_refresh_token(identity=username)
            return jsonify(access_token=access_token, refresh_token=refresh_token, id=find_user.id), 200
        else:
            return jsonify({"msg": "Incorrect login information."}), 401
    else:
        return jsonify({"msg": "No account with matching username found, try creating an account."}), 401
    
@api.route('/refresh', methods=['GET'])
@jwt_required(refresh=True)
def handle_refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity, fresh=False)
    return jsonify(access_token=access_token)

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

@api.route('/findusers', methods=['POST'])
@jwt_required()
def handle_get_user():
    current_user = get_jwt_identity()
    sent_info = request.json
    search = "%{}%".format(sent_info)
    find_results = User.query.filter(User.username.ilike(search)).all()
    results_serialize = list(map(lambda x: x.serialize(), find_results))

    return jsonify({"results": results_serialize}), 200
    


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
    
@api.route('/update/bio', methods=['PATCH'])
@jwt_required()
def handle_update_bio():
    current_user = get_jwt_identity()
    sent_info = request.json
    bio = sent_info['bio']
    find_user = User.query.filter_by(username=current_user).first()
    if find_user:
        find_user.bio = bio
        db.session.commit()
        updated = find_user.serialize_bio()
        return jsonify({"msg": "Updated Successfully", "updated": updated}), 201

@api.route('/update/avatar', methods=['PATCH'])
@jwt_required()
def handle_update_pic():
    current_user = get_jwt_identity()
    sent_info = request.json
    pic_id = sent_info['profile_pic']
    find_user = User.query.filter_by(username=current_user).first()
    if find_user:
        find_user.profile_pic = pic_id
        db.session.commit()
        updated = find_user.serialize_profile_pic()
        return jsonify({"msg": "Updated Successfully", "updated": updated}), 201
    
@api.route('/update/bio/profile', methods=['PATCH'])
@jwt_required()
def handle_update_both():
    current_user = get_jwt_identity()
    sent_info = request.json
    bio = sent_info['bio']
    pic_id = sent_info['profile_pic']
    get_user = User.query.filter_by(username=current_user).first()
    if get_user:
        get_user.bio = bio
        get_user.profile_pic = pic_id
        db.session.commit()
        updated_bio = get_user.serialize_bio()
        updated_pic = get_user.serialize_profile_pic()
        return jsonify({"msg": "Updated Successfully", "updated": {"bio": updated_bio, "pic": updated_pic}}), 201

@api.route('/addfavorite', methods=['POST'])
@jwt_required()
def handle_add_favorite():
    current_user = get_jwt_identity()
    data = request.json
    find_user = User.query.filter_by(username=current_user).first()
    if find_user:
        duplicate = Favorites.query.filter_by(game_id=data['game_id'], uid=find_user.id).first()
        if duplicate:
            return jsonify({"error": "Already favorited."})
        else:
            new_favorite = Favorites(uid=find_user.id,
                                 game_id=data['game_id'],
                                 title=data['title'],
                                 pic=data['pic'],
                                 url=data['url'],
                                 genre=data['genre'],
                                 platform=data['platform'],
                                 developer=data['developer'],
                                 publisher=data['publisher'],
                                 description=data['description'],
                                 release_date=data['release_date'])
            db.session.add(new_favorite)
            db.session.commit()
            return jsonify({"msg": "Successfully added to list."}), 201
    else: 
        return jsonify({"error": "Unsuccessful"}) 
    
@api.route('/removefavorite/<id>', methods=['DELETE'])
@jwt_required()
def handle_delete_favorite(id):
    current_user = get_jwt_identity()
    find_user = User.query.filter_by(username=current_user).first()
    if find_user:
        to_delete = Favorites.query.filter_by(id=id, uid=find_user.id).first()
        db.session.delete(to_delete)
        db.session.commit()
        return jsonify({"msg": "Deleted Successfully"}), 202
    else: 
        return jsonify({"error": "There was an error processing your request."})

@api.route('/getfavorites', methods=['GET'])
@jwt_required()
def handle_get_favorites():
    current_user = get_jwt_identity()
    find_user = User.query.filter_by(username=current_user).first()
    if find_user:
        get_favs = Favorites.query.filter_by(uid=find_user.id).all()
        serial = list(map(lambda x: x.serialize(), get_favs))
        return jsonify({"favorites": serial})
    
@api.route('/getuser', methods=['GET'])
@jwt_required()
def handle_get_user_data():
    current = get_jwt_identity()
    find_user = User.query.filter_by(username=current).first()
    if find_user:
        user = find_user.serialize()
        get_user_favs = Favorites.query.filter_by(uid=find_user.id).all()
        list_favorites = list(map(lambda x: x.serialize(), get_user_favs))
        following = find_user.serialize_followed()
        followers = find_user.serialize_followers()
        return jsonify({"user": user, "favorites": list_favorites, "follow_data": {"following": following, "followers": followers}}), 200
    else:
        return jsonify({"error": "Invalid Token"})

@api.route('/getfollow', methods=['GET'])
@jwt_required()
def handle_get_follow():
    current = get_jwt_identity()
    user = User.query.filter_by(username=current).first()
    if user:
        followed_users = user.serialize_followed()
        followers = user.serialize_followers()
        return jsonify({'followed': followed_users, 'followers': followers}), 200
    else:
        return jsonify({'msg': 'Error Getting Info'}), 400

@api.route('/token', methods=['GET'])
@jwt_required()
def handle_token():
    current_user = get_jwt_identity()
    get_user = User.query.filter_by(username=current_user).first()
    serialized = get_user.serialize()
    return jsonify(user=serialized), 200

@api.route('/profile/<username>', methods=['GET'])
@jwt_required()
def handle_get_profile(username):
    current_user = get_jwt_identity()
    if User.query.filter_by(username=current_user):
        # Getting User's Details and Favorites
        get_searched_user = User.query.filter_by(username=username).first()
        get_user_favorites = Favorites.query.filter_by(uid=get_searched_user.id).all()
        # Serializing User's Details and Favorites
        list_favorites = list(map(lambda x: x.serialize(), get_user_favorites))
        serialized = get_searched_user.serialize()
        # Return the details + favorites with a 200 status code.
        return jsonify({"user": serialized, "favorites": list_favorites}), 200
    else: 
        return jsonify({"msg": "User could not be verified."})