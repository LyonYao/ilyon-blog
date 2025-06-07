# Quick Start Guide

Follow these simple steps to get the blog application running locally:

## Step 1: Initialize the Database

```bash
# Navigate to the API directory
cd blog-api

# Run the database initialization script
init_db.bat
```

This will create a SQLite database with sample data.

## Step 2: Start the Backend API

```bash
# In the blog-api directory
run_simple.bat
```

The API will start and be available at http://localhost:5000

## Step 3: Start the Frontend

```bash
# Open a new command prompt
# Navigate to the frontend directory
cd blog-app

# Start the React development server
npm start
```

The frontend will be available at http://localhost:3000

## Step 4: Test the Application

1. Open your browser and navigate to http://localhost:3000
2. You should see the blog posts loaded from the API
3. Try logging in with these credentials:
   - Username: admin
   - Password: password123

## Troubleshooting

### If the API doesn't start:

1. Make sure you've initialized the database first
2. Check for error messages in the command prompt
3. Try running `python simple_app.py` directly

### If the frontend doesn't connect to the API:

1. Make sure the API is running at http://localhost:5000
2. Check the browser console for errors
3. Verify that the API URL in `apiService.js` is correct