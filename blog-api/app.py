import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from config import get_config
from models import init_db
from routes import init_routes

# API signature for validation
API_SIGNATURE = "Hj5RTxP7kL9mZsQw2YcF"

def create_app(config_name=None):
    """Create and configure the Flask application."""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(get_config())
    
    # Enable CORS with proper options handling
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})
    
    # Handle OPTIONS requests for CORS preflight
    @app.before_request
    def handle_options():
        if request.method == 'OPTIONS':
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Signature',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Max-Age': '86400'  # 24 hours
            }
            return '', 200, headers
            
    # Validate API signature for all requests
    @app.before_request
    def validate_api_signature():
        # Skip validation for OPTIONS requests
        if request.method == 'OPTIONS':
            return None
            
        # List of paths exempt from API signature validation
        exempt_paths = ['/api/health']
        
        # Skip validation for exempt paths
        if request.path in exempt_paths:
            return None
            
        # Get signature from request header
        signature = request.headers.get('X-API-Signature')
        
        # Check if signature exists and matches expected value
        if not signature or signature != API_SIGNATURE:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'Invalid or missing API signature'
            }), 401
    
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

# AWS Lambda handler
#handler = Mangum(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))