import jwt
import datetime
from functools import wraps
from flask import request, jsonify, current_app
from models import db
from models.user import User
from models.user_session import UserSession

def generate_token(user_id):
    """Generate JWT token for user authentication."""
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(
        payload,
        current_app.config.get('JWT_SECRET_KEY'),
        algorithm='HS256'
    )

def save_token_to_db(user_id, token):
    """Save token to database for session tracking."""
    # Remove expired sessions for this user
    expired_sessions = UserSession.query.filter(
        UserSession.user_id == user_id,
        UserSession.expires_at < datetime.datetime.utcnow()
    ).all()
    
    for session in expired_sessions:
        db.session.delete(session)
    
    # Create new session
    new_session = UserSession(
        user_id=user_id,
        token=token
    )
    db.session.add(new_session)
    db.session.commit()
    
    return new_session

def token_required(f):
    """Decorator for routes that require authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check if token is in headers
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        # Check if token is in cookies
        if not token and 'token' in request.cookies:
            token = request.cookies.get('token')
            
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # Decode token
            payload = jwt.decode(
                token, 
                current_app.config.get('JWT_SECRET_KEY'),
                algorithms=['HS256']
            )
            
            # Check if token exists in database
            session = UserSession.query.filter_by(token=token).first()
            if not session or session.is_expired:
                return jsonify({'message': 'Token is invalid or expired!'}), 401
                
            # Get user from database
            current_user = User.query.get(payload['sub'])
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
                
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
            
        return f(current_user, *args, **kwargs)
    
    return decorated

def admin_required(f):
    """Decorator for routes that require admin privileges."""
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.role != 'admin':
            return jsonify({'message': 'Admin privileges required!'}), 403
        return f(current_user, *args, **kwargs)
    
    return decorated