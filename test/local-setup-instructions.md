# Blog Application Local Setup Instructions

This document provides alternative setup instructions for running the blog application locally without Docker.

## Prerequisites

- Python 3.9+ installed
- PostgreSQL installed locally
- Node.js and npm installed (for frontend development)

## Step 1: Set Up PostgreSQL Database Locally

First, set up PostgreSQL on your local machine:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE blog_db;

# Exit PostgreSQL
\q

# Import the schema (adjust the path as needed)
psql -U postgres -d blog_db -f blog-api/db/schema.sql
```

## Step 2: Set Up the Backend API

```bash
# Navigate to the API directory
cd blog-api

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Update .env file with local PostgreSQL connection
# Edit .env to contain:
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/blog_db

# Run the Flask application
flask run
```

The API will be available at http://localhost:5000

## Step 3: Start the Frontend

```bash
# Open a new terminal
# Navigate to the frontend directory
cd blog-app

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at http://localhost:3000

## Step 4: Test the Complete Application

1. Open your browser and navigate to http://localhost:3000
2. You should see the blog posts loaded from the API
3. Try logging in with the following credentials:
   - Username: admin
   - Password: password123

## Troubleshooting Docker Registry Issues

If you're experiencing Docker registry connection issues:

1. Check your internet connection
2. Try using a VPN if your network blocks Docker registry
3. Configure Docker to use a different registry mirror:

```bash
# Create or edit Docker daemon configuration
notepad %USERPROFILE%\.docker\daemon.json

# Add the following content (using a public mirror):
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}

# Restart Docker Desktop
```

4. If you're behind a corporate proxy, configure Docker to use it:

```bash
# Set proxy environment variables
set HTTP_PROXY=http://proxy.example.com:8080
set HTTPS_PROXY=http://proxy.example.com:8080

# Or configure in Docker Desktop settings
```

## Alternative: Use SQLite Instead of PostgreSQL

For the simplest setup without any database installation:

1. Edit `config.py` in the blog-api directory:
   - Change the development database URL to use SQLite:
   ```python
   SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///blog.db')
   ```

2. Run the Flask application:
   ```bash
   cd blog-api
   flask run
   ```

This will create a SQLite database file in your blog-api directory.