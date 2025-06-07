#!/bin/bash

echo "Creating zip archive of blog-api..."

# Get current date in YYYYMMDD format for the filename
timestamp=$(date +"%Y%m%d")

# Define the output zip filename
zipfile="blog-api_${timestamp}.zip"

# Create zip file directly without temporary directory
zip -r "$zipfile" \
    *.py *.txt *.md *.bat *.sh *.yml *.json \
    models/ routes/ services/ utils/ db/ \
    -x "*.pyc" "__pycache__/*" "*.log" "blog.db" "venv/*" ".git/*"

echo "Archive created: $zipfile"