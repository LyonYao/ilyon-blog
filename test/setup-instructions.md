# Blog Application Setup Instructions

This document provides step-by-step instructions for setting up and running the blog application with Docker.

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed (for frontend development)

## Step 1: Set Up PostgreSQL Database

First, we'll start the PostgreSQL database using Docker:

```bash
# Navigate to the API directory
cd blog-api

# Create a .env file if it doesn't exist
# The file should contain database credentials and other configuration

# Start PostgreSQL container
docker-compose up -d postgres

# Wait for PostgreSQL to initialize (about 10-15 seconds)
```

## Step 2: Initialize the Database

The database schema will be automatically initialized when the PostgreSQL container starts, as we've mounted the schema.sql file as an initialization script.

To verify the database is properly set up:

```bash
# Connect to the PostgreSQL container
docker exec -it blog-postgres psql -U postgres -d blog_db

# List tables
\dt

# You should see tables like users, posts, categories, tags, etc.
# Exit PostgreSQL
\q
```

## Step 3: Start the Backend API

Now let's start the Flask API:

```bash
# Start the API container
docker-compose up -d api

# Check logs to ensure the API started correctly
docker-compose logs api

# The API will be available at http://localhost:5000
```

## Step 4: Test the API

Let's make sure the API is working correctly:

```bash
# Test the API endpoints
curl http://localhost:5000/api/posts
curl http://localhost:5000/api/categories
```

You should see JSON responses with blog posts and categories.

## Step 5: Start the Frontend

Now let's set up and start the React frontend:

```bash
# Navigate to the frontend directory
cd ../blog-app

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at http://localhost:3000

## Step 6: Test the Complete Application

1. Open your browser and navigate to http://localhost:3000
2. You should see the blog posts loaded from the API
3. Try logging in with the following credentials:
   - Username: admin
   - Password: password123
4. After logging in, you should be able to create, edit, and delete posts

## Troubleshooting

### Database Connection Issues

If the API can't connect to the database:

```bash
# Check if PostgreSQL container is running
docker ps

# Check PostgreSQL logs
docker-compose logs postgres

# Ensure the DATABASE_URL in .env is correct
# It should be: postgresql://postgres:postgres@postgres:5432/blog_db
```

### API Issues

If the API isn't working correctly:

```bash
# Check API logs
docker-compose logs api

# Restart the API container
docker-compose restart api
```

### Frontend Issues

If the frontend isn't connecting to the API:

1. Check that the API URL in `src/services/apiService.js` is correct
2. Ensure CORS is properly configured in the API
3. Check browser console for errors

## Stopping the Application

When you're done, you can stop the containers:

```bash
# Stop all containers
docker-compose down

# To remove volumes as well (this will delete the database data)
docker-compose down -v
```