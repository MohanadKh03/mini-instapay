# User Service

The **User Service** is a backend microservice responsible for managing user-related operations such as registration, login, profile management, and JWT-based authentication. It is built using **Node.js**, **Express**, and **TypeScript**, with **MongoDB** as the database.

## Features

- **User Registration**: Allows users to register with a unique username and email.
- **User Login**: Authenticates users and generates a JWT token for session management.
- **Profile Management**: Fetches user profile details.
- **JWT Authentication**: Verifies and validates JWT tokens for secure API access.
- **Error Handling**: Centralized error handling middleware for consistent error responses.
- **Logging**: Uses `pino` for structured and formatted logging.

## Installation
1. First install the dependancies

```bash
npm install
```

2. Create a .env in the ```user-service``` directory with the following variables
```
PORT=
JWT_SECRET=
MONGO_URI=
```
3. Start the server using 
```
npm run start
```
or for development
```
npm run start:dev
```