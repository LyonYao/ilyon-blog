from flask import Blueprint, request, jsonify
from models import db
from models.category import Category
from utils.auth import token_required, admin_required

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('', methods=['GET'])
def get_categories():
    """Get all categories."""
    categories = Category.query.all()
    
    return jsonify({
        'categories': [category.to_dict() for category in categories]
    })

@categories_bp.route('', methods=['POST'])
@token_required
@admin_required
def create_category(current_user):
    """Create a new category (admin only)."""
    data = request.get_json()
    
    # Check if required fields are provided
    if not data or not data.get('name'):
        return jsonify({'message': 'Missing category name!'}), 400
    
    # Check if category already exists
    if Category.query.filter_by(name=data['name']).first():
        return jsonify({'message': 'Category already exists!'}), 400
    
    # Create new category
    new_category = Category(name=data['name'])
    
    # Save category to database
    db.session.add(new_category)
    db.session.commit()
    
    return jsonify({
        'message': 'Category created successfully!',
        'category': new_category.to_dict()
    }), 201

@categories_bp.route('/<int:category_id>', methods=['PUT'])
@token_required
@admin_required
def update_category(current_user, category_id):
    """Update an existing category (admin only)."""
    category = Category.query.get_or_404(category_id)
    
    data = request.get_json()
    
    # Check if required fields are provided
    if not data or not data.get('name'):
        return jsonify({'message': 'Missing category name!'}), 400
    
    # Check if new name already exists
    existing_category = Category.query.filter_by(name=data['name']).first()
    if existing_category and existing_category.id != category_id:
        return jsonify({'message': 'Category name already exists!'}), 400
    
    # Update category name
    category.name = data['name']
    
    # Save changes to database
    db.session.commit()
    
    return jsonify({
        'message': 'Category updated successfully!',
        'category': category.to_dict()
    })

@categories_bp.route('/<string:category_name>', methods=['PUT', 'DELETE'])
@token_required
@admin_required
def manage_category_by_name(current_user, category_name):
    """Manage category by name (admin only)."""
    # Find category by name
    category = Category.query.filter_by(name=category_name).first_or_404()
    
    if request.method == 'PUT':
        data = request.get_json()
        
        # Check if required fields are provided
        if not data or not data.get('name'):
            return jsonify({'message': 'Missing category name!'}), 400
        
        # Check if new name already exists
        existing_category = Category.query.filter_by(name=data['name']).first()
        if existing_category and existing_category.id != category.id:
            return jsonify({'message': 'Category name already exists!'}), 400
        
        # Update category name
        category.name = data['name']
        
        # Save changes to database
        db.session.commit()
        
        return jsonify({
            'message': 'Category updated successfully!',
            'category': category.to_dict()
        })
    
    elif request.method == 'DELETE':
        # Delete category from database
        db.session.delete(category)
        db.session.commit()
        
        return jsonify({
            'message': 'Category deleted successfully!'
        })

@categories_bp.route('/<int:category_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_category(current_user, category_id):
    """Delete a category (admin only)."""
    category = Category.query.get_or_404(category_id)
    
    # Delete category from database
    db.session.delete(category)
    db.session.commit()
    
    return jsonify({
        'message': 'Category deleted successfully!'
    })