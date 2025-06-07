from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    """Initialize the database with the Flask app."""
    db.init_app(app)
    
    # Import models to ensure they are registered with SQLAlchemy
    from .user import User
    from .post import Post
    from .category import Category
    from .tag import Tag
    from .user_session import UserSession
    
    # Create tables if they don't exist
    with app.app_context():
        db.create_all()