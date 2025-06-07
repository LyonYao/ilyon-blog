from flask import Blueprint, request, jsonify
from models import db
from models.tag import Tag
from utils.auth import token_required, admin_required

tags_bp = Blueprint('tags', __name__)

@tags_bp.route('', methods=['GET'])
def get_tags():
    """Get all tags."""
    tags = Tag.query.all()
    
    return jsonify({
        'tags': [tag.to_dict() for tag in tags]
    })

@tags_bp.route('/popular', methods=['GET'])
def get_popular_tags():
    """Get popular tags based on post count."""
    # This query counts posts for each tag and orders by count
    popular_tags = db.session.query(
        Tag, db.func.count(Tag.posts).label('post_count')
    ).join(
        Tag.posts
    ).group_by(
        Tag.id
    ).order_by(
        db.desc('post_count')
    ).limit(10).all()
    
    return jsonify({
        'tags': [{'id': tag.id, 'name': tag.name, 'count': count} 
                for tag, count in popular_tags]
    })

@tags_bp.route('', methods=['POST'])
@token_required
def create_tag(current_user):
    """Create a new tag."""
    data = request.get_json()
    
    # Check if required fields are provided
    if not data or not data.get('name'):
        return jsonify({'message': 'Missing tag name!'}), 400
    
    # Check if tag already exists
    if Tag.query.filter_by(name=data['name']).first():
        return jsonify({'message': 'Tag already exists!'}), 400
    
    # Create new tag
    new_tag = Tag(name=data['name'])
    
    # Save tag to database
    db.session.add(new_tag)
    db.session.commit()
    
    return jsonify({
        'message': 'Tag created successfully!',
        'tag': new_tag.to_dict()
    }), 201

@tags_bp.route('/<int:tag_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_tag(current_user, tag_id):
    """Delete a tag (admin only)."""
    tag = Tag.query.get_or_404(tag_id)
    
    # Delete tag from database
    db.session.delete(tag)
    db.session.commit()
    
    return jsonify({
        'message': 'Tag deleted successfully!'
    })