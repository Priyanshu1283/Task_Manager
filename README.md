# Task Management Application

A production-ready full-stack Task Management Application built with Node.js, Express, MongoDB, and Next.js.

## Architecture

The application follows a clean architecture pattern:

### Backend (Server)
- **Framework**: Node.js + Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based, stored in HTTP-only cookies.
- **Security**:
  - `helmet` for security headers.
  - `cors` for cross-origin resource sharing.
  - `express-validator` for input validation.
  - **AES-256-CBC Encryption**: Sensitive fields (like task descriptions) are encrypted before storage and decrypted on retrieval using the `crypto` module.
  - **Environment Variables**: Managed via `dotenv`.
  - **Centralized Error Handling**: Unified error response format and async wrapper.

### Frontend (Client)
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Client**: Axios (configured with `withCredentials: true`)
- **State Management**: React `useState` and `useEffect` with clean service layer separation.

## Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB running locally or a MongoDB Atlas URI.

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the requirements:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret
   COOKIE_SECRET=your_cookie_secret
   AES_SECRET_KEY=your_32_character_aes_key
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run start (ensure server.js is the entry point)
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Auth Endpoints
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive JWT in cookie.
- `POST /api/auth/logout`: Clear the auth cookie.
- `GET /api/auth/me`: Get current user info.

### Task Endpoints
- `GET /api/tasks?page=1&limit=10&status=pending&search=title`: List tasks with pagination, filtering, and search.
- `POST /api/tasks`: Create a new task.
- `GET /api/tasks/:id`: Get task by ID.
- `PUT /api/tasks/:id`: Update task.
- `DELETE /api/tasks/:id`: Delete task.

## Security Decisions
1. **HTTP-only Cookies**: JWTs are stored in cookies with `httpOnly: true` and `sameSite: strict` to prevent XSS and CSRF attacks.
2. **AES Encryption**: Even if the database is compromised, sensitive task data remains encrypted.
3. **NoSQL Injection**: Using Mongoose schemas and strict validation prevents NoSQL injection.
4. **Validation**: All incoming requests are validated at the router level.
