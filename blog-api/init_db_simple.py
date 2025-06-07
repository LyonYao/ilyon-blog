import os
import sqlite3
import json
import random
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

# Database file path
DB_FILE = 'blog.db'

# Delete existing database if it exists
if os.path.exists(DB_FILE):
    os.remove(DB_FILE)
    print(f"Removed existing database: {DB_FILE}")

# Connect to SQLite database (will create it if it doesn't exist)
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

print("Creating database tables...")

# Create users table
cursor.execute('''
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')

# Create user_sessions table
cursor.execute('''
CREATE TABLE user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
''')

# Create posts table
cursor.execute('''
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published BOOLEAN DEFAULT 0,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
''')

# Create categories table
cursor.execute('''
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
)
''')

# Create tags table
cursor.execute('''
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
)
''')

# Create post_categories junction table
cursor.execute('''
CREATE TABLE post_categories (
    post_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
)
''')

# Create post_tags junction table
cursor.execute('''
CREATE TABLE post_tags (
    post_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
)
''')

print("Creating indexes...")

# Create indexes
cursor.execute('CREATE INDEX idx_users_username ON users(username)')
cursor.execute('CREATE INDEX idx_users_email ON users(email)')
cursor.execute('CREATE INDEX idx_posts_user_id ON posts(user_id)')
cursor.execute('CREATE INDEX idx_posts_published ON posts(published)')
cursor.execute('CREATE INDEX idx_posts_created_at ON posts(created_at)')
cursor.execute('CREATE INDEX idx_user_sessions_token ON user_sessions(token)')
cursor.execute('CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id)')
cursor.execute('CREATE INDEX idx_post_categories_post_id ON post_categories(post_id)')
cursor.execute('CREATE INDEX idx_post_categories_category_id ON post_categories(category_id)')
cursor.execute('CREATE INDEX idx_post_tags_post_id ON post_tags(post_id)')
cursor.execute('CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id)')

print("Seeding users...")

# Create admin user (password: password123)
admin_password_hash = generate_password_hash('password123')
cursor.execute(
    'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
    ('admin', 'admin@example.com', admin_password_hash, 'admin')
)
admin_id = cursor.lastrowid

# Create regular user (password: password123)
user_password_hash = generate_password_hash('password123')
cursor.execute(
    'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
    ('user', 'user@example.com', user_password_hash, 'user')
)
user_id = cursor.lastrowid

print("Seeding categories...")

# Create categories
categories = [
    'Technology', 'Web Development', 'Travel', 
    'Photography', 'Food', 'Lifestyle', 'Health'
]

category_ids = {}
for category_name in categories:
    cursor.execute('INSERT INTO categories (name) VALUES (?)', (category_name,))
    category_ids[category_name] = cursor.lastrowid

print("Seeding tags...")

# Create tags
tags = [
    'react', 'javascript', 'frontend', 'css', 'web design',
    'layout', 'travel', 'photography', 'tips', 'nutrition',
    'meal prep', 'healthy eating', 'meditation', 'mindfulness', 'wellness'
]

tag_ids = {}
for tag_name in tags:
    cursor.execute('INSERT INTO tags (name) VALUES (?)', (tag_name,))
    tag_ids[tag_name] = cursor.lastrowid

print("Seeding posts...")

# Sample blog post content templates
blog_titles = [
    "Getting Started with {0}",
    "The Ultimate Guide to {0}",
    "10 Tips for Better {0}",
    "How to Master {0} in 30 Days",
    "The Future of {0}",
    "Why {0} Matters in 2023",
    "{0} Best Practices",
    "Understanding {0} Fundamentals",
    "Advanced {0} Techniques",
    "{0} for Beginners"
]

blog_topics = [
    "React Development", "JavaScript", "CSS Styling", "Web Design",
    "Frontend Frameworks", "Backend Development", "API Design",
    "Database Optimization", "Cloud Computing", "DevOps",
    "Mobile Development", "UI/UX Design", "Responsive Design",
    "Performance Optimization", "Security Best Practices"
]

blog_content_templates = [
    """<h2>Introduction to {0}</h2>
<p>{0} is a powerful tool in modern web development. This article will guide you through the basics and help you get started with your first project.</p>
<h3>Why Learn {0}?</h3>
<p>Learning {0} can significantly enhance your development skills and open up new career opportunities. It's widely used in the industry and has a strong community support.</p>
<h3>Setting Up Your Environment</h3>
<p>To get started with {0}, you'll need to set up your development environment. This includes installing the necessary tools and configuring your workspace.</p>
<h3>Your First {0} Project</h3>
<p>Let's create a simple project to demonstrate the basic concepts of {0}. Follow along with the code examples below.</p>
<h3>Conclusion</h3>
<p>Now that you have a basic understanding of {0}, you can continue exploring more advanced topics and building more complex applications.</p>""",
    
    """<h2>{0} Best Practices</h2>
<p>Following best practices in {0} is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with {0}.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your {0} code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your {0} code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your {0} code thoroughly.</p>""",
    
    """<h2>Advanced {0} Techniques</h2>
<p>Once you've mastered the basics of {0}, it's time to explore more advanced techniques that can take your skills to the next level.</p>
<h3>Design Patterns in {0}</h3>
<p>Understanding and implementing design patterns can significantly improve your {0} code structure and maintainability.</p>
<h3>Working with Complex Data</h3>
<p>Learn how to efficiently handle and process complex data structures in {0} applications.</p>
<h3>Integration with Other Technologies</h3>
<p>{0} works well with various other technologies. This section explores some common integration scenarios.</p>
<h3>Scaling {0} Applications</h3>
<p>As your application grows, you'll need strategies to scale your {0} implementation. This section covers key scaling considerations.</p>"""
]

# Generate 20 blog posts
print("Generating 20 blog posts...")
now = datetime.now()

for i in range(1, 21):
    # Randomly select title template and topic
    title_template = random.choice(blog_titles)
    topic = random.choice(blog_topics)
    title = title_template.format(topic)
    
    # Randomly select content template
    content_template = random.choice(blog_content_templates)
    content = content_template.format(topic)
    
    # Generate random dates within the last year
    days_ago = random.randint(0, 365)
    created_at = (now - timedelta(days=days_ago)).strftime('%Y-%m-%d %H:%M:%S')
    updated_at = (now - timedelta(days=random.randint(0, days_ago))).strftime('%Y-%m-%d %H:%M:%S')
    
    # Randomly assign to admin or user
    post_user_id = random.choice([admin_id, user_id])
    
    # 80% chance of being published
    published = 1 if random.random() < 0.8 else 0
    
    # Insert post
    cursor.execute(
        'INSERT INTO posts (title, content, created_at, updated_at, published, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        (title, content, created_at, updated_at, published, post_user_id)
    )
    post_id = cursor.lastrowid
    
    # Randomly assign 1-3 categories
    post_categories = random.sample(categories, random.randint(1, min(3, len(categories))))
    for category_name in post_categories:
        cursor.execute(
            'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)',
            (post_id, category_ids[category_name])
        )
    
    # Randomly assign 2-5 tags
    post_tags = random.sample(tags, random.randint(2, min(5, len(tags))))
    for tag_name in post_tags:
        cursor.execute(
            'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
            (post_id, tag_ids[tag_name])
        )
    
    print(f"Created post {i}/20: {title}")

# Also load mock posts from JSON file if it exists
try:
    if os.path.exists(os.path.join('db', 'mock_posts.json')):
        with open(os.path.join('db', 'mock_posts.json'), 'r') as f:
            mock_posts = json.load(f)
            
        print("Adding posts from mock_posts.json...")
        # Create posts
        for post_data in mock_posts:
            # Convert ISO format to SQLite timestamp
            created_at = datetime.fromisoformat(post_data['createdAt'].replace('Z', '+00:00')).strftime('%Y-%m-%d %H:%M:%S')
            updated_at = datetime.fromisoformat(post_data['updatedAt'].replace('Z', '+00:00')).strftime('%Y-%m-%d %H:%M:%S')
            
            # Determine user ID
            post_user_id = admin_id if post_data.get('author') == 'admin' else user_id
            
            # Insert post
            cursor.execute(
                'INSERT INTO posts (title, content, created_at, updated_at, published, user_id) VALUES (?, ?, ?, ?, ?, ?)',
                (post_data['title'], post_data['content'], created_at, updated_at, 1 if post_data['published'] else 0, post_user_id)
            )
            post_id = cursor.lastrowid
            
            # Add categories
            for category_name in post_data['categories']:
                if category_name in category_ids:
                    cursor.execute(
                        'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)',
                        (post_id, category_ids[category_name])
                    )
            
            # Add tags
            for tag_name in post_data['tags']:
                if tag_name in tag_ids:
                    cursor.execute(
                        'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
                        (post_id, tag_ids[tag_name])
                    )
except Exception as e:
    print(f"Note: Could not load mock_posts.json: {e}")

conn.commit()
print("Database seeded successfully!")
conn.close()