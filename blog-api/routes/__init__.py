from flask import Blueprint
from .auth import auth_bp
from .posts import posts_bp
from .categories import categories_bp
from .tags import tags_bp

# Create main API blueprint
api_bp = Blueprint('api', __name__, url_prefix='/api')

# Register route blueprints
api_bp.register_blueprint(auth_bp, url_prefix='/auth')
api_bp.register_blueprint(posts_bp, url_prefix='/posts')
api_bp.register_blueprint(categories_bp, url_prefix='/categories')
api_bp.register_blueprint(tags_bp, url_prefix='/tags')

# Import and register additional routes here

def init_routes(app):
    """Initialize all routes with the Flask app."""
    app.register_blueprint(api_bp)