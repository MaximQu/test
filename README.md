# Nest.js + React + Docker Template

## Features

- **Backend:** Nest.js (with REST API and GraphQL support)
- **Frontend:** React (using Vite.js for fast builds and hot-reloading)
- **Database:** PostgreSQL (with Docker support)
- **TypeScript:** Fully typed codebase for better maintainability and fewer runtime errors
- **Docker:** Pre-configured Docker setup for easy containerization of your entire stack

## Getting Started

To start the project with containers and run everything locally, follow these steps:

1. Clone the repository and navigate to the project folder:

    ```bash
    git clone <repository-url> && cd <repository-folder>
    ```

2. Before starting Docker container, need build frontend:

    ```bash
    cd ./frontend && npm run build
    ```

3. After frontend build, go back and run Docker containers

    ```bash
    npm run docker:build
    ```

4. Navigate to the backend directory, install the required dependencies, and start the backend server:

    ```bash
    cd ./backend && npm install && npm run start:dev
    ```

5. Navigate to the frontend directory, install the dependencies, and start the frontend development server:

    ```bash
    cd .. && cd ./frontend && npm install && npm run dev
    ```

Summary of Ports:

- Backend (Nest.js): Running on port 3000
- Frontend (React): Running on port 5173
