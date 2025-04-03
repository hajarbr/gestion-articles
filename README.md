# Gestion des Articles

This is a [Next.js](https://nextjs.org) project for managing articles, built with React, TypeScript, and Tailwind CSS. The project includes user authentication, account management, and article management functionalities. It uses a Symfony backend for API communication.

## Features

### General
- Built with **Next.js** and **React** for a modern, responsive UI.
- Styled using **Tailwind CSS** for rapid design and customization.
- Written in **TypeScript** for type safety and better developer experience.

### Authentication
- JWT-based authentication.
- Login and registration pages for user access.

### Account Management
- View and update personal account information (name, email).

### Article Management
- View a paginated list of articles (title, author, publication date).
- Add, edit, and delete articles.
- REST API integration with Axios for backend communication.

## -----------------Getting Started------------

### Prerequisites
- Node.js (v16 or later)
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/gestion-articles.git
    cd gestion-articles

2. Install dependencies:
    npm install
    # or
    yarn install
    # or
    pnpm install

3. Set up environment variables: Create a .env.local file in the root directory and add the following variables:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

# Running the Development Server (Open http://localhost:3000)
npm run dev
# or
yarn dev
# or
pnpm dev

# Building for Production
npm run build

# Start the production server:
npm start

# Docker Setup
1. Build the Docker image:
    docker-compose build

2. docker-compose up
    docker-compose up

# API Endpoints
This project communicates with a Symfony backend. Below are the key API endpoints

- Authentication
    POST /api/login - User login
    POST /api/register - User registration
- Account
    GET /api/account - Fetch user account details
    PUT /api/account - Update user account details
- Articles
    GET /api/articles - Fetch paginated list of articles
    POST /api/articles - Add a new article
    PUT /api/articles/:id - Update an article
    DELETE /api/articles/:id - Delete an article

# Testing ()
This project uses Jest for unit testing. To run tests:
    npm test