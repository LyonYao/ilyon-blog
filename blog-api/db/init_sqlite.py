import os
import sys
import json
from datetime import datetime
from werkzeug.security import generate_password_hash

# Add parent directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Use local app configuration
os.environ['FLASK_APP'] = 'app_local.py'
os.environ['FLASK_ENV'] = 'development'

from app_local import create_app
from models import db
from models.user import User
from models.post import Post
from models.category import Category
from models.tag import Tag

def init_sqlite_db():
    """Initialize SQLite database with sample data."""
    print("Creating application context...")
    app = create_app()
    
    with app.app_context():
        print("Dropping all tables...")
        db.drop_all()
        
        print("Creating all tables...")
        db.create_all()
        
        print("Seeding users...")
        # Create admin user
        admin = User(
            username='admin',
            email='admin@example.com',
            role='admin'
        )
        admin.password = 'password123'
        
        # Create regular user
        user = User(
            username='user',
            email='user@example.com',
            role='user'
        )
        user.password = 'password123'
        
        db.session.add(admin)
        db.session.add(user)
        db.session.commit()
        
        print("Seeding categories...")
        # Create categories
        categories = [
            'Technology', 'Web Development', 'Travel', 
            'Photography', 'Food', 'Lifestyle', 'Health'
        ]
        
        for category_name in categories:
            category = Category(name=category_name)
            db.session.add(category)
        
        db.session.commit()
        
        print("Seeding tags...")
        # Create tags
        tags = [
            'react', 'javascript', 'frontend', 'css', 'web design',
            'layout', 'travel', 'photography', 'tips', 'nutrition',
            'meal prep', 'healthy eating', 'meditation', 'mindfulness', 'wellness'
        ]
        
        for tag_name in tags:
            tag = Tag(name=tag_name)
            db.session.add(tag)
        
        db.session.commit()
        
        print("Seeding posts...")
        # Load mock posts from JSON file
        try:
            with open(os.path.join(os.path.dirname(__file__), 'mock_posts.json'), 'r') as f:
                mock_posts = json.load(f)
                
            # Create posts
            for post_data in mock_posts:
                post = Post(
                    title=post_data['title'],
                    content=post_data['content'],
                    created_at=datetime.fromisoformat(post_data['createdAt'].replace('Z', '+00:00')),
                    updated_at=datetime.fromisoformat(post_data['updatedAt'].replace('Z', '+00:00')),
                    published=post_data['published'],
                    user_id=admin.id if post_data.get('author') == 'admin' else user.id
                )
                
                # Add categories
                for category_name in post_data['categories']:
                    category = Category.query.filter_by(name=category_name).first()
                    if category:
                        post.categories.append(category)
                
                # Add tags
                for tag_name in post_data['tags']:
                    tag = Tag.query.filter_by(name=tag_name).first()
                    if tag:
                        post.tags.append(tag)
                
                db.session.add(post)
            
            db.session.commit()
            print("SQLite database initialized successfully!")
            
        except Exception as e:
            print(f"Error seeding posts: {e}")
            db.session.rollback()

if __name__ == '__main__':
    init_sqlite_db()