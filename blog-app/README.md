# Personal Blog Web Application

A React-based web application for managing a personal blog with user authentication.

## Features

- User authentication (login/logout)
- User registration
- Blog post creation and editing
- Categories and tags for posts
- Public blog view with filtering
- Dashboard for blog management
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd blog-app
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser



## Project Structure

- `src/components/` - React components
  - `src/components/auth/` - Authentication components (Login, Register)
  - `src/components/blog/` - Blog-related components (Dashboard, CreatePost, EditPost, PublicBlog, PostDetail)
  - `src/components/layout/` - Layout components (Header, Footer)
  - `src/components/common/` - Common/shared components
- `src/services/` - API and service functions
- `src/mockData/` - Mock data for testing
- `src/App.js` - Main application component with routing

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Next Steps

- Implement comment system
- Add search functionality
- Add user profile management
- Implement rich text editor for post creation