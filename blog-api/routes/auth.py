from flask import Blueprint, request, jsonify, make_response
from models import db
from models.user import User
from utils.auth import generate_token, save_token_to_db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    data = request.get_json()
    
    # Check if required fields are provided
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing required fields!'}), 400
    
    # Check if username already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists!'}), 400
    
    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists!'}), 400
    
    # Create new user
    new_user = User(
        username=data['username'],
        email=data['email'],
        role=data.get('role', 'user')
    )
    new_user.password = data['password']
    
    # Save user to database
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'message': 'User registered successfully!',
        'user': new_user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user and return token."""
    data = request.get_json()
    
    # Check if required fields are provided
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing username or password!'}), 400
    
    # Check if user exists
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.verify_password(data['password']):
        return jsonify({'message': 'Invalid username or password!'}), 401
    
    # Generate token
    token = generate_token(user.id)
    
    # Save token to database
    save_token_to_db(user.id, token)
    
    # Create response with token in cookie
    response = make_response(jsonify({
        'message': 'Login successful!',
        'token': token,
        'user': user.to_dict()
    }))
    
    # Set cookie with token
    response.set_cookie(
        'token', 
        token, 
        httponly=True, 
        max_age=30*60,  # 30 minutes
        samesite='Strict'
    )
    
    return response

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Logout user by clearing token cookie."""
    response = make_response(jsonify({'message': 'Logout successful!'}))
    response.delete_cookie('token')
    return response