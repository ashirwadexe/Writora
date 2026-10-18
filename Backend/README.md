# Writora Backend

**A RESTful backend for a modern blogging platform built with the MERN stack.**

Writora is a blogging platform designed to let users create, publish, discover, like, and comment on blog articles. The backend provides authentication, blog management, pagination, search, engagement features, statistics, and cloud-based cover image uploads.

AI-powered blog writing and article summarization are planned as the initial AI features.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [Technology Stack](#3-technology-stack)
4. [System Architecture](#4-system-architecture)
5. [Project Structure](#5-project-structure)
6. [Getting Started](#6-getting-started)
7. [Environment Variables](#7-environment-variables)
8. [API Documentation](#8-api-documentation)
9. [Database Models](#9-database-models)
10. [Authentication and Authorization](#10-authentication-and-authorization)
11. [Image Upload Architecture](#11-image-upload-architecture)
12. [Validation and Error Handling](#12-validation-and-error-handling)
13. [AI Integration Roadmap](#13-ai-integration-roadmap)
14. [Security Considerations](#14-security-considerations)
15. [Known Limitations and Future Improvements](#15-known-limitations-and-future-improvements)
16. [Development Scripts](#16-development-scripts)
17. [Contributing](#17-contributing)
18. [License](#18-license)

---

## 1. Project Overview

Writora is a full-stack blogging platform whose backend is responsible for managing users, articles, and user interactions.

The backend follows a modular architecture using Express routes, controllers, middleware, Mongoose models, validation schemas, and reusable services.

### Core responsibilities

- Authenticate users securely.
- Manage user accounts and profiles.
- Create, retrieve, update, and delete blog posts.
- Support public blog discovery, search, and pagination.
- Allow authenticated users to like and comment on articles.
- Provide blog engagement statistics.
- Upload blog cover images to Cloudinary.
- Prepare the platform for AI-assisted blog writing and summarization.

### Design principles

- Separation of concerns between routes, controllers, models, and services.
- Request validation before database operations.
- Authentication and ownership checks for protected resources.
- Reusable middleware and utility functions.
- Centralized configuration through environment variables.

---

## 2. Features

### Authentication and user management

- User registration.
- User login and logout.
- Password hashing with bcrypt.
- JWT-based authentication using an HTTP-only cookie.
- Protected user profile endpoint.
- Account deletion.

### Blog management

- Create and publish blog posts.
- Retrieve an individual article.
- Retrieve all published blogs.
- Retrieve the current user's blogs.
- Update and delete owned blogs.
- Search by title, content, category, and tags.
- Paginated blog listing.
- Blog creation and modification timestamps.
- Optional blog cover images.
- Blog statistics.

### Engagement

- Like and unlike blog posts.
- Prevent duplicate likes through a unique compound database index.
- Return total like counts.
- Indicate whether the authenticated user has liked a blog.
- Add comments to articles.
- Retrieve comments with author names.
- Delete comments by their authors.

### Media management

- Multipart image uploads using Multer.
- Cloudinary image hosting.
- Five-megabyte upload size limit.
- Cloudinary secure URLs stored in MongoDB.

### Planned AI capabilities

- **AI Blog Writer:** Generate an editable blog draft from a topic and writing tone.
- **AI Article Summary:** Generate a concise summary and key takeaways from an existing article.

These AI capabilities should be marked as implemented only after their backend endpoints and frontend flows have been completed and tested.

---

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js 5 | REST API and request handling |
| MongoDB | NoSQL database |
| Mongoose | Database schemas and queries |
| JavaScript ES modules | Modular code using `import` and `export` |
| Zod | Request validation |
| bcrypt | Password hashing and verification |
| JSON Web Token | Authentication token generation and verification |
| Cookie Parser | Reading authentication cookies |
| Multer | Processing multipart image uploads |
| Cloudinary | Cloud-based image storage |
| dotenv | Environment variable management |
| Nodemon | Development server auto-restart |
| OpenAI API | Proposed provider for future AI functionality |

### Package configuration

The backend uses ES modules through `"type": "module"`.

The application entry point is `index.js`.

```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

---

## 4. System Architecture

Writora follows a layered backend architecture.

```text
React + Vite Frontend
         |
         | HTTP / JSON / FormData
         v
    Express Server
         |
         v
    API Routes
         |
         v
 Middleware Layer
 Authentication / Upload
         |
         v
    Controllers
         |
         +-------------------+
         |                   |
         v                   v
   Mongoose Models      Service Layer
         |                   |
         v                   v
      MongoDB             Cloudinary
```

The planned AI architecture adds a dedicated service:

```text
Frontend
   |
   v
/api/ai Routes
   |
   v
AI Controller
   |
   v
AI Service
   |
   v
OpenAI API
```

The AI service will remain separate from the existing blog controller to keep AI-specific logic maintainable.

### Request lifecycle

1. The client sends an HTTP request.
2. Express matches the request to a route.
3. Middleware checks authentication or processes uploads when required.
4. The controller validates input and executes application logic.
5. Mongoose reads or modifies MongoDB documents.
6. External services are called when necessary.
7. The server returns a JSON response with an appropriate HTTP status.

---

## 5. Project Structure

The following structure represents the main backend modules. Adjust filenames to match the actual repository.

```text
backend/
├── configs/
│   ├── db.js
│   └── cloudinary.js
│
├── controllers/
│   ├── user.controller.js
│   ├── blog.controller.js
│   ├── like.controller.js
│   └── comment.controller.js
│
├── middleware/
│   ├── isAuthenticated.js
│   ├── optionalAuth.js
│   └── upload.js
│
├── models/
│   ├── User.js
│   ├── Blog.js
│   ├── Like.js
│   └── Comment.js
│
├── routes/
│   ├── user.route.js
│   ├── blog.route.js
│   ├── like.route.js
│   └── comment.route.js
│
├── validators/
│   ├── user.validator.js
│   └── comment.validator.js
│
├── utils/
│   └── uploadToCloudinary.js
│
├── index.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

### Module responsibilities

| Layer | Responsibility |
|---|---|
| `configs/` | Database and Cloudinary configuration |
| `controllers/` | Application logic and HTTP responses |
| `middleware/` | Authentication and upload processing |
| `models/` | MongoDB document schemas |
| `routes/` | Endpoint definitions and middleware attachment |
| `validators/` | Request data validation |
| `utils/` | Reusable utility functions |
| `services/` | External service integration, including the planned AI service |

---

## 6. Getting Started

### Prerequisites

Install or prepare the following:

- Node.js and npm.
- MongoDB locally or a MongoDB Atlas database.
- A Cloudinary account for image uploads.
- An API testing tool such as Postman or Insomnia.

An OpenAI API account and API key will be required when the planned AI module is implemented.

### Step 1: Clone the repository

```bash
git clone <your-repository-url>
cd <repository-folder>/backend
```

Replace the placeholders with your actual GitHub repository URL and folder name.

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create a `.env` file in the backend directory.

See [Environment Variables](#7-environment-variables).

### Step 4: Start the development server

```bash
npm run dev
```

### Step 5: Verify the server

Send a GET request to:

```http
GET http://localhost:5000/
```

Expected response:

```text
server is live...
```

The application connects to MongoDB before starting to listen for incoming requests.

### Production start

```bash
npm start
```

---

## 7. Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Planned AI configuration

When the AI module is implemented, add:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=your_available_model_id
```

Use a model ID that is currently available to your API account.

### Important configuration notes

- The current Cloudinary configuration expects `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
- `CLOUDINARY_URL` alone will not satisfy the current configuration unless the code is updated to use it.
- Never expose secret values in the frontend.
- Never commit `.env` to GitHub.
- Use a strong, randomly generated JWT secret.
- If a secret is accidentally committed, rotate it immediately.

Add the following to `.gitignore` if it is not already present:

```gitignore
node_modules/
.env
.env.*
!.env.example
```

An `.env.example` file may be committed with placeholder values, but it must never contain real credentials.

---

## 8. API Documentation

Base URL for local development:

```text
http://localhost:5000
```

All request and response examples are illustrative. The actual response depends on the request, validation result, and database state.

### 8.1 Authentication API

Base path: `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Authenticate a user |
| GET | `/api/auth/logout` | Session cookie | Log out the current user |
| GET | `/api/auth/user-profile` | Protected | Retrieve the current user's profile |
| DELETE | `/api/auth/delete-account` | Protected | Delete the account and authored blogs |

#### Register a user

```http
POST /api/auth/register
Content-Type: application/json
```

Request body:

```json
{
  "name": "Example Writer",
  "email": "writer@example.com",
  "password": "strong-password"
}
```

The registration process:

1. Validates the input using Zod.
2. Checks whether the email is already registered.
3. Hashes the password with bcrypt.
4. Creates the user document.
5. Returns the created user's public information.

The current implementation does not automatically log the user in after registration.

#### Log in

```http
POST /api/auth/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "writer@example.com",
  "password": "strong-password"
}
```

On successful login, the backend verifies the password and creates a JWT.

The JWT is stored in an HTTP-only cookie named `token`.

#### Retrieve profile

```http
GET /api/auth/user-profile
```

Requires a valid authentication cookie.

The response contains the user's `id`, `name`, and `email`.

#### Log out

```http
GET /api/auth/logout
```

Clears the authentication cookie.

#### Delete account

```http
DELETE /api/auth/delete-account
```

Requires authentication.

The current implementation deletes the user's authored blog documents and then the user document. Related likes and comments require additional cleanup before this endpoint can be considered a complete production-grade account-deletion workflow.

---

### 8.2 Blog API

Base path: `/api/blog`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/blog/create-blog` | Protected | Create a blog |
| GET | `/api/blog/` | Public, optional authentication | Retrieve blogs |
| GET | `/api/blog/my-blogs` | Protected | Retrieve the current user's blogs |
| GET | `/api/blog/stats` | Public | Retrieve blog statistics |
| GET | `/api/blog/:id` | Public | Retrieve one blog |
| PATCH | `/api/blog/update/:id` | Protected owner | Update a blog |
| DELETE | `/api/blog/delete/:id` | Protected owner | Delete a blog |

#### Create a blog

```http
POST /api/blog/create-blog
```

Requires authentication.

For an image upload, use `multipart/form-data`.

Supported fields:

| Field | Type | Required |
|---|---|---|
| `title` | String | Yes |
| `content` | String | Yes |
| `category` | String | No |
| `tags` | Array of strings | No |
| `readTime` | Number | Yes |
| `image` | Image file or optional URL | No |

For multipart requests, send `tags` as JSON text, for example:

```json
["javascript", "nodejs", "web-development"]
```

The backend parses the tags and converts `readTime` into a number before validation.

When an image is supplied, the file is uploaded to Cloudinary and the resulting secure URL is stored in the blog document.

#### Retrieve blogs

```http
GET /api/blog/?page=1&search=javascript
```

Supported query parameters:

| Parameter | Description |
|---|---|
| `page` | Page number; defaults to 1 |
| `search` | Searches title, content, category, and tags |

Current behavior:

- Page size is 10 blogs.
- Search is case-insensitive.
- Results are sorted by `createdAt` in descending order.
- Search is applied before pagination.
- The response includes pagination metadata.
- Each returned blog includes `totalLikes` and `isLiked`.

Example response structure:

```json
{
  "success": true,
  "blogs": [],
  "pagination": {
    "currentPage": 1,
    "totalBlogs": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

#### Retrieve the current user's blogs

```http
GET /api/blog/my-blogs
```

Requires authentication.

Returns blogs associated with the authenticated user.

#### Retrieve blog statistics

```http
GET /api/blog/stats
```

Returns:

- `totalStories` — total number of blog posts.
- `activeWriters` — number of distinct blog authors.
- `avgReadTime` — average reading time of blog posts.

The frontend should handle the empty-database case appropriately.

#### Retrieve a single blog

```http
GET /api/blog/:id
```

Returns the requested blog or a `404` response if it does not exist.

#### Update a blog

```http
PATCH /api/blog/update/:id
```

Requires authentication and blog ownership.

The endpoint supports updating blog fields and optionally replacing the cover image.

#### Delete a blog

```http
DELETE /api/blog/delete/:id
```

Requires authentication and verifies ownership before deletion.

---

### 8.3 Likes API

Base path: `/api/likes`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/likes/:blogId` | Protected | Like a blog |
| DELETE | `/api/likes/:blogId` | Protected | Remove a like |

#### Like a blog

```http
POST /api/likes/:blogId
```

The backend verifies that the blog exists and prevents duplicate likes.

A successful response includes:

- `success`
- `message`
- `totalLikes`
- `isLiked`

#### Unlike a blog

```http
DELETE /api/likes/:blogId
```

Removes the authenticated user's like.

The current controller returns HTTP status `201` for a successful unlike operation. This can be standardized to `200` or `204` in a future improvement.

#### Duplicate-like prevention

The Like model uses a unique compound index on:

```js
{
  userId: 1,
  blogId: 1
}
```

This ensures that the same user cannot create multiple like documents for the same blog.

---

### 8.4 Comments API

Comment routes are mounted under `/api/blog`.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/blog/:blogId/comments` | Protected | Add a comment |
| GET | `/api/blog/:blogId/comments` | Public | Retrieve comments |
| DELETE | `/api/blog/:commentId/delete` | Protected comment author | Delete a comment |

#### Add a comment

```http
POST /api/blog/:blogId/comments
Content-Type: application/json
```

Request body:

```json
{
  "content": "This article was helpful."
}
```

Comment content is trimmed and validated to contain between 3 and 500 characters.

The backend associates the comment with the authenticated user and the specified blog.

#### Retrieve comments

```http
GET /api/blog/:blogId/comments
```

Returns comments for the specified blog, sorted newest first.

The user reference is populated with the comment author's name.

#### Delete a comment

```http
DELETE /api/blog/:commentId/delete
```

Only the comment author can delete their comment under the current authorization logic. Blog owners do not automatically receive comment-moderation permissions.

---

## 9. Database Models

Writora uses Mongoose schemas to define the document structure and relationships in MongoDB.

### 9.1 User Model

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required, trimmed |
| `email` | String | Required, unique, trimmed, lowercase |
| `password` | String | Required, minimum length 6 |
| `createdAt` | Date | Automatic timestamp |
| `updatedAt` | Date | Automatic timestamp |

Passwords are hashed before storage and are never intended to be returned in API responses.

### 9.2 Blog Model

| Field | Type | Constraints |
|---|---|---|
| `title` | String | Required |
| `content` | String | Required |
| `author` | ObjectId | Required reference to `User` |
| `image` | String | Optional image URL |
| `category` | String | Optional |
| `tags` | Array of strings | Optional |
| `readTime` | Number | Required |
| `createdAt` | Date | Automatic timestamp |
| `updatedAt` | Date | Automatic timestamp |

The `author` field links a blog to its creator.

### 9.3 Like Model

| Field | Type | Constraints |
|---|---|---|
| `userId` | ObjectId | Required reference to `User` |
| `blogId` | ObjectId | Required reference to `Blog` |
| `createdAt` | Date | Automatic timestamp |
| `updatedAt` | Date | Automatic timestamp |

The compound unique index on `userId` and `blogId` prevents duplicate likes.

### 9.4 Comment Model

| Field | Type | Constraints |
|---|---|---|
| `userId` | ObjectId | Required reference to `User` |
| `blogId` | ObjectId | Required reference to `Blog` |
| `content` | String | Required, trimmed, 3–500 characters |
| `createdAt` | Date | Automatic timestamp |
| `updatedAt` | Date | Automatic timestamp |

Comments reference both the author and the blog they belong to.

### Entity relationships

```text
User
 ├── has many Blogs
 ├── has many Likes
 └── has many Comments

Blog
 ├── belongs to one User (author)
 ├── has many Likes
 └── has many Comments
```

These relationships are represented using MongoDB ObjectId references rather than relational SQL foreign keys.

---

## 10. Authentication and Authorization

Writora uses JWT-based authentication stored in an HTTP-only cookie.

### Login flow

1. The client submits an email and password.
2. Zod validates the request.
3. The backend retrieves the user by email.
4. bcrypt verifies the submitted password.
5. A JWT is signed using `JWT_SECRET`.
6. The server sets a cookie named `token`.
7. The client can use that cookie for subsequent protected requests.

### Authentication middleware

The `isAuthenticated` middleware:

1. Reads `req.cookies.token`.
2. Verifies the token using `JWT_SECRET`.
3. Retrieves the corresponding user.
4. Excludes the password field.
5. Attaches the user to `req.user`.
6. Rejects missing, invalid, or expired sessions with an appropriate `401` response.

### Optional authentication

The `optionalAuth` middleware supports public blog listing.

- Guests can retrieve blogs without logging in.
- Authenticated users can receive personalized like status.
- Invalid or missing tokens do not necessarily block a public request.

### Frontend integration

For cookie-based authentication, the frontend should send credentials with its requests.

For example, Axios can be configured with:

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default api;
```

The backend must also configure CORS for the exact permitted frontend origin with credentials enabled. Wildcard origins should not be used for credentialed requests.

---

## 11. Image Upload Architecture

Writora uses Multer and Cloudinary to process and store blog cover images.

### Upload flow

```text
Frontend FormData
       |
       v
Multer Memory Storage
       |
       v
Image Validation
       |
       v
Cloudinary Upload Stream
       |
       v
Cloudinary Secure URL
       |
       v
Blog.image in MongoDB
```

### Multer configuration

The upload middleware:

- Uses memory storage.
- Accepts files whose declared MIME type starts with `image/`.
- Limits the file size to 5 MB.

### Cloudinary integration

Images are uploaded to:

```text
writora/blog-covers
```

The upload utility streams the file buffer to Cloudinary and returns the upload result.

The resulting `secure_url` is stored in the blog's `image` field.

### Frontend requirements

- Use `FormData` for file uploads.
- Use the field name `image`.
- Convert tags to JSON text for multipart requests.
- Send `readTime` as a string if using `FormData`; the backend converts it to a number.
- Let the browser or Axios set the multipart content-type boundary.

MIME-type checking is only a basic filter. Production deployments should consider file-signature validation, stricter allowed formats, and upload error handling.

---

## 12. Validation and Error Handling

Zod validates external request data before it is used in application logic.

Current validation includes:

- Registration and login input.
- Blog creation and update data.
- Comment content.

### Common HTTP status codes

| Status | Meaning |
|---|---|
| `200` | Request completed successfully |
| `201` | Resource created |
| `400` | Invalid request data |
| `401` | Authentication required or session invalid |
| `403` | Authenticated user lacks permission |
| `404` | Resource not found |
| `409` | Duplicate resource or conflicting request |
| `500` | Unexpected server error |

Actual status codes depend on the endpoint and the current controller implementation.

### Error-handling recommendations

- Return consistent JSON response shapes.
- Avoid returning internal stack traces to clients.
- Handle malformed ObjectIds explicitly.
- Handle Multer upload errors in a centralized error handler.
- Distinguish validation errors from unexpected server failures.
- Log enough diagnostic information without logging secrets or sensitive content.

---

## 13. AI Integration Roadmap

Writora's initial AI scope consists of two features.

**Status: Planned — not yet confirmed as implemented.**

### 13.1 AI Blog Writer

The AI Blog Writer will help authenticated writers generate blog drafts from a topic.

#### Expected workflow

1. The writer enters a topic.
2. The writer optionally chooses a tone, such as Professional, Casual, or Informative.
3. The frontend submits the request to the backend.
4. The backend validates the request and calls the configured AI provider.
5. The generated title and draft are returned to the frontend.
6. The writer reviews and edits the result.
7. The writer publishes through the existing Create Blog API.

#### Proposed endpoint

```http
POST /api/ai/write
```

#### Example request

```json
{
  "topic": "How artificial intelligence is changing education",
  "tone": "Informative"
}
```

The final request and response schemas will be defined during implementation.

### 13.2 AI Article Summary

The AI Article Summary feature will help readers understand long articles more quickly.

#### Expected workflow

1. A reader opens a published blog.
2. The reader clicks **Summarize with AI**.
3. The backend retrieves the blog by ID.
4. The AI service receives the article title and content.
5. The AI returns a concise summary and key takeaways.
6. The frontend displays the generated result.

#### Proposed endpoint

```http
POST /api/ai/summary/:blogId
```

The summary should be based on the actual article content. The AI should not invent unsupported information or treat instructions embedded in article text as trusted instructions.

### Proposed AI module structure

```text
backend/
├── controllers/
│   └── ai.controller.js
├── routes/
│   └── ai.route.js
├── services/
│   └── ai.service.js
└── validators/
    └── ai.validator.js
```

### AI provider

The proposed starting provider is the OpenAI API, using the official JavaScript SDK.

Install the SDK when beginning implementation:

```bash
npm install openai
```

Configure the backend environment:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=your_available_model_id
```

The model identifier should be verified against the models available to the API account.

### AI security and cost controls

Before public release, implement:

- Zod validation and maximum input lengths.
- Output token limits.
- Request timeouts.
- Rate limiting.
- Per-user usage limits where appropriate.
- Spending alerts and usage monitoring.
- Safe provider error handling.
- Backend-only API credentials.

The AI key must never be exposed in frontend environment variables or browser code.

---

## 14. Security Considerations

The current implementation includes password hashing, JWT authentication, HTTP-only cookies, input validation, and authorization checks on protected blog operations.

Additional production hardening is recommended.

### Authentication and cookies

- Use HTTPS in production.
- Configure the cookie's `secure` property appropriately.
- Review `sameSite` behavior based on the frontend and backend deployment domains.
- Keep JWT secrets strong and private.
- Consider token revocation and session invalidation requirements.

### CORS

- Allow only trusted frontend origins.
- Enable credentials only where required.
- Do not use `Access-Control-Allow-Origin: *` for credentialed browser requests.

### Database and request validation

- Validate all user input.
- Escape user search input before using it in MongoDB regular expressions.
- Validate MongoDB ObjectIds.
- Add indexes appropriate to frequently queried fields.
- Avoid trusting client-supplied ownership identifiers.

### Media uploads

- Enforce size limits.
- Validate actual file content and allowed formats.
- Handle upload failures without leaving inconsistent blog records.
- Consider deleting replaced or orphaned Cloudinary assets.

### Resource cleanup

The current account-deletion and blog-deletion flows should be reviewed for associated Like and Comment records.

A deliberate cleanup strategy or an appropriate cascading-deletion approach is needed to prevent orphaned documents.

### AI endpoints

- Rate-limit public summary generation.
- Restrict writing requests to authenticated users.
- Limit article and prompt size.
- Protect against prompt injection from article content.
- Avoid logging API keys and unnecessary private content.

This README is a technical description of the project, not a claim that a formal security audit has been completed.

---

## 15. Known Limitations and Future Improvements

Potential next steps include:

- Implement and test AI Blog Writing and AI Article Summary.
- Add automated tests for authentication, ownership, likes, comments, and uploads.
- Add OpenAPI/Swagger API documentation.
- Add centralized Express error handling.
- Standardize response shapes and HTTP status codes.
- Clean up likes and comments when related accounts or blogs are deleted.
- Add comment moderation permissions if required.
- Improve search input handling and query performance.
- Add stricter image-content validation.
- Improve Cloudinary asset cleanup.
- Add API rate limiting and production monitoring.
- Review production CORS and cookie settings.
- Add AI usage tracking and cost limits after AI integration.

---

## 16. Development Scripts

Run these commands from the backend directory.

### Start development server

```bash
npm run dev
```

Uses Nodemon to restart the server when files change.

### Start the server normally

```bash
npm start
```

Runs the application using Node.js.

### Install dependencies

```bash
npm install
```

---

## 17. Contributing

Contributions and improvements are welcome.

1. Fork the repository.
2. Create a branch for your feature or fix.
3. Follow the existing modular architecture.
4. Validate request data and check authorization.
5. Test the relevant endpoints.
6. Update documentation when API behavior changes.
7. Never commit credentials or `.env` files.
8. Submit a pull request describing the changes.

---

## 18. License

The current `package.json` specifies the ISC license.

Before distributing the repository, confirm that this is the intended project license and include an appropriate root-level `LICENSE` file.
