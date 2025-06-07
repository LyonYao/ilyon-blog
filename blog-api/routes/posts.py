from flask import Blueprint, jsonify, request
from models import db
from models.post import Post
from models.category import Category
from models.tag import Tag
from utils.auth import token_required
import datetime

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('', methods=['GET'])
def get_published_posts():
    # Get query parameters
    category = request.args.get('category')
    tag = request.args.get('tag')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Base query for published posts
    query = Post.query.filter_by(published=True)
    
    # Filter by category if provided
    if category:
        query = query.join(Post.categories).filter(Category.name == category)
    
    # Filter by tag if provided
    if tag:
        query = query.join(Post.tags).filter(Tag.name.ilike(f'%{tag}%'))
    
    # Get paginated posts
    paginated_posts = query.order_by(Post.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'posts': [post.to_dict() for post in paginated_posts.items],
        'pagination': {
            'total': paginated_posts.total,
            'pages': paginated_posts.pages,
            'page': page,
            'per_page': per_page,
            'has_next': paginated_posts.has_next,
            'has_prev': paginated_posts.has_prev,
            'next_page': paginated_posts.next_num if paginated_posts.has_next else None,
            'prev_page': paginated_posts.prev_num if paginated_posts.has_prev else None
        }
    })

@posts_bp.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    
    # Allow access to unpublished posts for editing
    return jsonify(post.to_dict())

@posts_bp.route('', methods=['POST'])
@token_required
def create_post(current_user):
    """Create a new blog post."""
    data = request.get_json()
    
    # Validate required fields
    if not data:
        return jsonify({'message': 'No data provided!'}), 400
    
    if not data.get('title'):
        return jsonify({'message': 'Title is required!'}), 400
    
    if not data.get('content'):
        return jsonify({'message': 'Content is required!'}), 400
    
    # Create new post
    new_post = Post(
        title=data['title'],
        content=data['content'],
        published=data.get('published', False),
        user_id=current_user.id,
        created_at=datetime.datetime.utcnow(),
        updated_at=datetime.datetime.utcnow()
    )
    
    # Add categories
    if 'categories' in data and isinstance(data['categories'], list):
        for category_name in data['categories']:
            category = Category.query.filter_by(name=category_name).first()
            if category:
                new_post.categories.append(category)
    
    # Add tags
    if 'tags' in data and isinstance(data['tags'], list):
        for tag_name in data['tags']:
            # Find existing tag or create new one
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            new_post.tags.append(tag)
    
    # Save post to database
    db.session.add(new_post)
    db.session.commit()
    
    return jsonify({
        'message': 'Post created successfully!',
        'post': new_post.to_dict()
    }), 201

@posts_bp.route('/<int:post_id>', methods=['PUT'])
@token_required
def update_post(current_user, post_id):
    """Update an existing blog post."""
    post = Post.query.get_or_404(post_id)
    
    # Check if user is the author of the post
    if post.user_id != current_user.id and current_user.role != 'admin':
        return jsonify({'message': 'Unauthorized to edit this post!'}), 403
    
    data = request.get_json()
    
    # Validate required fields
    if not data:
        return jsonify({'message': 'No data provided!'}), 400
    
    # Update post fields
    if 'title' in data:
        post.title = data['title']
    
    if 'content' in data:
        post.content = data['content']
    
    if 'published' in data:
        post.published = data['published']
    
    # Update categories
    if 'categories' in data and isinstance(data['categories'], list):
        # Clear existing categories
        post.categories = []
        
        # Add new categories
        for category_name in data['categories']:
            category = Category.query.filter_by(name=category_name).first()
            if category:
                post.categories.append(category)
    
    # Update tags
    if 'tags' in data and isinstance(data['tags'], list):
        # Clear existing tags
        post.tags = []
        
        # Add new tags
        for tag_name in data['tags']:
            # Find existing tag or create new one
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            post.tags.append(tag)
    
    # Update timestamp
    post.updated_at = datetime.datetime.utcnow()
    
    # Save changes to database
    db.session.commit()
    
    return jsonify({
        'message': 'Post updated successfully!',
        'post': post.to_dict()
    })

@posts_bp.route('/<int:post_id>', methods=['DELETE'])
@token_required
def delete_post(current_user, post_id):
    """Delete a blog post."""
    post = Post.query.get_or_404(post_id)
    
    # Check if user is the author of the post
    if post.user_id != current_user.id and current_user.role != 'admin':
        return jsonify({'message': 'Unauthorized to delete this post!'}), 403
    
    # Delete post from database
    db.session.delete(post)
    db.session.commit()
    
    return jsonify({
        'message': 'Post deleted successfully!'
    })

@posts_bp.route('/all', methods=['GET'])
@token_required
def get_all_posts(current_user):
    """Get all posts (for admin/author)."""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # If user is admin, return all posts
    # If user is regular user, return only their posts
    if current_user.role == 'admin':
        query = Post.query
    else:
        query = Post.query.filter_by(user_id=current_user.id)
    
    # Get paginated posts
    paginated_posts = query.order_by(Post.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'posts': [post.to_dict() for post in paginated_posts.items],
        'pagination': {
            'total': paginated_posts.total,
            'pages': paginated_posts.pages,
            'page': page,
            'per_page': per_page,
            'has_next': paginated_posts.has_next,
            'has_prev': paginated_posts.has_prev,
            'next_page': paginated_posts.next_num if paginated_posts.has_next else None,
            'prev_page': paginated_posts.prev_num if paginated_posts.has_prev else None
        }
    })