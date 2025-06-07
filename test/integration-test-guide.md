# Integration Testing Guide

This guide explains how to test the integration between the React frontend and Flask backend API.

## Step 1: Start the Backend API

```bash
# Navigate to the API directory
cd blog-api

# Run the simplified Flask application
run_simple.bat
```

The API will start and be available at http://localhost:5000

## Step 2: Start the Frontend

```bash
# Open a new command prompt
# Navigate to the frontend directory
cd blog-app

# Start the React development server
npm start
```

The frontend will be available at http://localhost:3000

## Step 3: Test the Integration

1. Open your browser and navigate to http://localhost:3000
2. You should see the blog posts loaded from the API
3. Try the following features:
   - View blog posts with pagination
   - Filter posts by category or tag
   - View a single post detail
   - Login with admin/password123

## What Changed

### Frontend Changes:

1. **Removed Mock Services**:
   - Updated `App.js` to use real API services instead of mock services

2. **Updated Components**:
   - Modified components to accept services as props
   - Updated data handling to match the API response format
   - Added better error handling and logging

3. **API Service**:
   - Created `apiService.js` for making HTTP requests to the backend
   - Implemented authentication with JWT tokens
   - Added error handling and interceptors

### Backend Changes:

1. **Simplified API**:
   - Created `simple_app.py` that combines all components in one file
   - Implemented key endpoints needed by the frontend
   - Added automatic database initialization

2. **SQLite Database**:
   - Configured to use SQLite for easy local testing
   - Added sample data initialization

## Troubleshooting

### API Connection Issues

If the frontend can't connect to the API:

1. Check that the API is running at http://localhost:5000
2. Test the API directly in your browser or with curl:
   ```
   curl http://localhost:5000/api/posts
   ```
3. Check for CORS errors in the browser console

### Data Format Issues

If you see errors related to data format:

1. Check the browser console for specific errors
2. Compare the API response format with what the frontend expects
3. Look for property name mismatches (e.g., `created_at` vs `createdAt`)

### Authentication Issues

If login doesn't work:

1. Try the default credentials: admin/password123
2. Check the browser console for authentication errors
3. Verify that cookies are being set correctly