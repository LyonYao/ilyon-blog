# Blog Application Integration Guide

This guide explains how to integrate the static web frontend with the Python Flask backend API and set up the development environment using Docker.

## Project Structure

```
blog-app/           # Frontend React application
  ├── public/       # Static files
  ├── src/          # Source code
  │   ├── components/
  │   ├── services/ # API services
  │   └── ...
  └── package.json

blog-api/           # Backend Flask API
  ├── app.py        # Main application
  ├── config.py     # Configuration
  ├── models/       # Database models
  ├── routes/       # API routes
  ├── utils/        # Utilities
  ├── db/           # Database scripts
  └── docker-compose.yml
```

## Integration Steps

### 1. Set Up PostgreSQL with Docker

```bash
# Navigate to the API directory
cd blog-api

# Start PostgreSQL container
docker-compose up -d postgres

# Wait for PostgreSQL to initialize (about 10-15 seconds)
```

### 2. Start the Backend API

```bash
# Start the API container
docker-compose up -d api

# The API will be available at http://localhost:5000
```

### 3. Configure the Frontend

```bash
# Navigate to the frontend directory
cd ../blog-app

# Install dependencies
npm install

# Install axios for API requests if not already installed
npm install axios

# Start the development server
npm start

# The frontend will be available at http://localhost:3000
```

## Testing the Integration

1. Open your browser and navigate to http://localhost:3000
2. You should see the blog posts loaded from the API
3. Try logging in with the following credentials:
   - Username: admin
   - Password: password123

## Switching Between Mock and Real Services

To switch between mock services and real API services:

1. Open `src/App.js`
2. Import the real services instead of mock services:

```javascript
// Use real services
import authService from './services/realAuthService';
import blogService from './services/realBlogService';
import categoryService from './services/realCategoryService';

// Instead of mock services
// import authService from './services/authService';
// import blogService from './services/blogService';
// import categoryService from './services/categoryService';
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `POST /api/auth/logout` - Logout and clear token

### Posts
- `GET /api/posts` - Get all published posts with pagination
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

## Pagination

The API supports pagination for post listings:

```
GET /api/posts?page=1&per_page=10
```

The response includes pagination metadata:

```json
{
  "posts": [...],
  "pagination": {
    "total": 100,
    "pages": 10,
    "page": 1,
    "per_page": 10,
    "has_next": true,
    "has_prev": false,
    "next_page": 2,
    "prev_page": null
  }
}
```

## Troubleshooting

### Database Connection Issues
- Check if PostgreSQL container is running: `docker ps`
- Check logs: `docker-compose logs postgres`

### API Connection Issues
- Check if API container is running: `docker-compose logs api`
- Ensure the API is accessible: `curl http://localhost:5000/api/posts`

### Frontend Issues
- Check browser console for errors
- Ensure API URL is correct in `apiService.js`
- Clear browser cache and local storage