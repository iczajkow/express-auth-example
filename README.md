# Express.js Authentication Template with Prisma and JWT

This template provides a basic setup for implementing authentication in an Express.js application using Prisma and JSON Web Tokens (JWT).

## Features

- **User authentication**: User registration and login endpoints (`/auth/register` and `/auth/login`).
- **Password hashing**: Secure password hashing using bcrypt.
- **JWT authentication**: Authorization middleware to protect routes.
- **Prisma client**: Database access with Prisma Client.
- **Refresh tokens**: Secure refresh tokens for long-lived sessions.

## Getting Started
1. Clone the repository:

   ```bash
   git clone
    ```
2. Install the dependencies:

   ```bash
   pnpm install
   ```
3. Set up postgres database using docker
4. Create a `.env` file in the root of the project with the following environment variables:

   ```bash
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="YourJWTSecret"
    REFRESH_TOKEN_SECRET="YourRefreshTokenSecret"
    ```
5. Run the Prisma migrations:

   ```bash
    pnpm prisma migrate dev
    ```
6. Start the development server:

   ```bash
   pnpm dev
   ```
7. The server is now running on [http://localhost:3000](http://localhost:3000).
   

## Endpoints
* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Login an existing user.
* `POST /api/auth/refresh`: Refresh the access token.
* `GET /api/profile`: Fets the current user - protecter route.