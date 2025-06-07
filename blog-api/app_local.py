import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import get_config
from models import init_db
from routes import init_routes

def create_app(config_name=None):
    """Create and configure the Flask application."""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(get_config())
    
    # Enable CORS
    CORS(app, supports_credentials=True)
    
    # Initialize database
    init_db(app)
    
    # Initialize routes
    init_routes(app)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'message': 'Resource not found!'}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({'message': 'Internal server error!'}), 500
    
    return app

# Create the application instance
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))