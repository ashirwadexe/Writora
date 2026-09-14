# Writora — Backend

The backend API for **Writora**, an AI-powered SaaS blogging platform designed to provide a complete and secure blogging experience.

Writora allows users to create, edit, save drafts, publish blogs, manage their content, and interact with AI-powered writing features.

The backend is built with **Node.js, Express.js, MongoDB, and Mongoose**, with a focus on clean architecture, authentication, authorization, validation, and scalable API design.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login
* Secure password hashing with bcrypt
* JWT-based authentication
* Protected routes
* User authorization
* Get authenticated user
* Update user profile
* Delete user account

### 📝 Blog Management

* Create blogs
* Update blogs
* Delete blogs
* Publish blogs
* Save blogs as drafts
* Retrieve user's blogs
* Retrieve individual blogs
* Public access to published blogs
* Private access to user's drafts

### 📊 Blog Analytics

* Total stories
* Active writers
* Average reading time
* MongoDB aggregation for statistics

### 🤖 AI-Powered Features

Writora is designed to integrate AI into the writing workflow, including features such as:

* AI-assisted content generation
* Blog title generation
* Content improvement
* Summarization
* AI-generated ideas and suggestions
* SEO-oriented content assistance

### 🖼️ Image Management

* Blog cover image uploads
* User profile images
* Cloudinary integration
* Secure image URL storage

### 🛡️ Validation & Security

* Request validation using Zod
* Password hashing with bcrypt
* JWT authentication
* Protected API routes
* User ownership checks
* Centralized error handling
* Environment variable based configuration

---

# 🏗️ Tech Stack

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | JavaScript runtime        |
| Express.js | Backend framework         |
| MongoDB    | Database                  |
| Mongoose   | MongoDB ODM               |
| Zod        | Request validation        |
| JWT        | Authentication            |
| bcrypt     | Password hashing          |
| Cloudinary | Image storage             |
| AI API     | AI-powered features       |
| dotenv     | Environment configuration |

---

# 📁 Project Structure

```text
backend/
│
├── controllers/
│   ├── user.controller.js
│   ├── blog.controller.js
│   └── ...
│
├── models/
│   ├── user.model.js
│   ├── blog.model.js
│   └── ...
│
├── routes/
│   ├── user.routes.js
│   ├── blog.routes.js
│   └── ...
│
├── validators/
│   ├── user.validator.js
│   ├── blog.validator.js
│   └── ...
│
├── middleware/
│   ├── auth.middleware.js
│   └── ...
│
├── config/
│   ├── db.js
│   └── ...
│
├── utils/
│   └── ...
│
├── index.js
├── package.json
├── .env
└── README.md
```

---

# 🔑 Authentication Flow

Writora uses JWT-based authentication.

```text
User
  ↓
Register / Login
  ↓
Backend validates credentials
  ↓
JWT generated
  ↓
Client stores token
  ↓
Token sent with protected requests
  ↓
Auth Middleware
  ↓
User authenticated
  ↓
Protected Controller
```

Protected operations verify the authenticated user's identity before performing actions.

For example, when updating or deleting a blog, the backend verifies that the blog belongs to the logged-in user.

---

# 📝 Blog Draft & Publishing Flow

Blogs support two states:

```text
draft
published
```

A new blog can be saved as a draft:

```text
Create Blog
     ↓
Save Draft
     ↓
status = "draft"
```

The author can later edit the draft and publish it:

```text
Draft
  ↓
Update
  ↓
Publish
  ↓
status = "published"
```

### Draft Privacy

Drafts are private.

Only the blog's author can access, edit, delete, or publish their draft.

Published blogs can be accessed publicly.

```text
                 Blog
                  │
          ┌───────┴────────┐
          ↓                ↓
        Draft           Published
          ↓                ↓
      Only Owner        Public
```

---

# 🌐 API Overview

## Authentication

```http
POST /api/users/register
POST /api/users/login
GET  /api/users/me
PATCH /api/users/update
DELETE /api/users/delete-account
```

---

## Blogs

```http
POST   /api/blog/create
GET    /api/blog/my-blogs
GET    /api/blog/my/:id
GET    /api/blog/:id
PATCH  /api/blog/:id
PATCH  /api/blog/:id/publish
DELETE /api/blog/:id
```

### Important behavior

`GET /api/blog/:id`

Returns only published blogs publicly.

`GET /api/blog/my-blogs`

Returns the authenticated user's blogs, including both drafts and published blogs.

`GET /api/blog/my/:id`

Allows the authenticated owner to access their own blog, including drafts.

---

# 📊 Blog Statistics

Writora provides blog-level statistics using MongoDB aggregation.

Example statistics include:

```json
{
  "totalStories": 10,
  "activeWriters": 5,
  "avgReadTime": 4.2
}
```

MongoDB aggregation is used to calculate statistics efficiently from blog data.

---

# 🧪 Validation

Writora uses **Zod** to validate incoming request data before processing it.

Example:

```js
const result = createBlogSchema.safeParse(req.body);

if (!result.success) {
    return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: result.error.flatten()
    });
}
```

This helps prevent invalid or incomplete data from reaching the database.

---

# 🔒 Authorization

Authentication alone is not enough.

Writora also checks resource ownership.

For example:

```js
const blog = await Blog.findOne({
    _id: blogId,
    author: req.user
});
```

This ensures that a user cannot modify or delete another user's blog simply by changing the blog ID.

---

# ⚙️ Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

AI_API_KEY=your_ai_api_key
```

> Never commit your `.env` file or expose secret keys publicly.

Add it to `.gitignore`:

```gitignore
.env
node_modules/
```

---

# 🛠️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create your `.env` file and configure the required environment variables.

Start the development server:

```bash
npm run dev
```

For production:

```bash
npm start
```

---

# 📌 Development Principles

The backend follows several important principles:

* RESTful API design
* Separation of concerns
* Controller-based architecture
* Mongoose models for database interaction
* Zod-based request validation
* JWT-based authentication
* Resource ownership authorization
* Secure environment configuration
* Async/await based asynchronous operations
* Meaningful HTTP status codes
* Consistent API responses

---

# 🔮 Future Improvements

Potential improvements include:

* Advanced AI writing assistant
* AI-generated SEO optimization
* Blog recommendations
* Full-text search
* Pagination and cursor-based pagination
* Rate limiting
* Redis caching
* Background jobs
* Email verification
* Password reset
* Social authentication
* Advanced analytics
* API documentation with Swagger/OpenAPI

---

# 👨‍💻 Project

**Writora** is being built as a full-stack SaaS blogging platform with a focus on modern backend development, secure authentication, scalable APIs, AI integration, and real-world application architecture.

---

## ⭐ If you like the project

Give the repository a ⭐ and feel free to explore, contribute, or suggest improvements.
