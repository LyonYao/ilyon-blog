# Blog API Backend

This is the backend API for the blog application. It provides RESTful endpoints for the frontend to interact with.

## Technologies Used
- Python 3.9+
- Flask (Web Framework)
- PostgreSQL (Database)
- AWS Lambda (Deployment)
- JWT (Authentication)

## Project Structure
```
blog-api/
├── app.py                 # Main application entry point
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── .env.example           # Example environment variables
├── db/                    # Database scripts
│   ├── schema.sql         # Database schema
│   ├── seed.py            # Database seeding script
│   └── mock_posts.json    # Mock data for seeding
├── models/                # Database models
│   ├── __init__.py        # Database initialization
│   ├── user.py            # User model
│   ├── post.py            # Post model
│   ├── category.py        # Category model
│   ├── tag.py             # Tag model
│   └── user_session.py    # User session model
├── routes/                # API routes
│   ├── __init__.py        # Routes initialization
│   ├── auth.py            # Authentication routes
│   ├── posts.py           # Post routes
│   ├── categories.py      # Category routes
│   └── tags.py            # Tag routes
├── services/              # Business logic
└── utils/                 # Utility functions
    └── auth.py            # Authentication utilities
```

## Setup Instructions

### Prerequisites
- Python 3.9+
- PostgreSQL
- AWS CLI (for deployment)

### Local Development
1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Create a `.env` file based on `.env.example`
6. Set up the PostgreSQL database:
   ```
   psql -U postgres -f db/schema.sql
   ```
7. Seed the database:
   ```
   python db/seed.py
   ```
8. Run the application:
   ```
   flask run
   ```

### AWS Lambda Deployment
1. Create a PostgreSQL database on AWS RDS
2. Update the `.env` file with the RDS connection string
3. Package the application:
   ```
   pip install -r requirements.txt -t package/
   cp -r app.py config.py models/ routes/ services/ utils/ package/
   cd package && zip -r ../deployment-package.zip .
   ```
4. Deploy to AWS Lambda using the AWS CLI or console
5. Configure API Gateway to expose the Lambda function

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `POST /api/auth/logout` - Logout and clear token

### Posts
- `GET /api/posts` - Get all published posts
- `GET /api/posts/<id>` - Get a specific post
- `GET /api/posts/all` - Get all posts (admin only)
- `POST /api/posts` - Create a new post
- `PUT /api/posts/<id>` - Update a post
- `DELETE /api/posts/<id>` - Delete a post

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category (admin only)
- `PUT /api/categories/<id>` - Update a category (admin only)
- `DELETE /api/categories/<id>` - Delete a category (admin only)

### Tags
- `GET /api/tags` - Get all tags
- `GET /api/tags/popular` - Get popular tags
- `POST /api/tags` - Create a new tag
- `DELETE /api/tags/<id>` - Delete a tag (admin only)