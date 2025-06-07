# Quick Start Guide (Without Docker)

Since you're experiencing Docker registry connection issues, here's a simplified setup that doesn't require Docker.

## Step 1: Set Up the Backend API with SQLite

```bash
# Navigate to the API directory
cd blog-api

# Run the setup script
run_local.bat

# This will:
# 1. Create a virtual environment
# 2. Install dependencies
# 3. Configure SQLite as the database
# 4. Start the Flask application
```

## Step 2: Initialize the SQLite Database

Open a new command prompt window:

```bash
# Navigate to the API directory
cd blog-api

# Run the database initialization script
init_db.bat

# This will create a SQLite database with sample data
```

## Step 3: Start the Frontend

Open a new command prompt window:

```bash
# Navigate to the frontend directory
cd blog-app

# Run the frontend startup script
start_frontend.bat

# This will install dependencies and start the React app
```

## Step 4: Test the Application

1. Open your browser and navigate to http://localhost:3000
2. You should see the blog posts loaded from the API
3. Try logging in with the following credentials:
   - Username: admin
   - Password: password123

## Troubleshooting

### API Issues

If the API isn't working:

1. Check that the Flask server is running (you should see it in the command prompt)
2. Verify the SQLite database was created (look for blog.db in the blog-api folder)
3. Try restarting the Flask server

### Frontend Issues

If the frontend isn't connecting to the API:

1. Make sure the API URL in `src/services/apiService.js` is set to `http://localhost:5000/api`
2. Check the browser console for CORS errors
3. Ensure you're using the real service implementations, not the mock ones

## Switching Between Mock and Real Services

To use the real API instead of mock data:

1. Edit `src/App.js` to import the real services:

```javascript
// Use real services
import authService from './services/realAuthService';
import blogService from './services/realBlogService';
import categoryService from './services/realCategoryService';
```

2. Make sure the API URL in `src/services/apiService.js` is correct