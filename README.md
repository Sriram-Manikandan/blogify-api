# Blogify API — Module 3 Integration Checkpoint

A fully integrated, data-driven REST API built with Node.js, Express, and MongoDB Atlas. This is the capstone project for Module 3.

## Project Architecture

```
blogify-api/
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB connection (connectDB)
│   ├── models/
│   │   ├── user.model.js       # User schema & model
│   │   └── post.model.js       # Post schema with author ref
│   ├── services/
│   │   └── posts.service.js    # All Mongoose query logic
│   ├── controllers/
│   │   └── posts.controller.js # Thin controllers (req/res only)
│   ├── routes/
│   │   └── posts.routes.js     # Express route definitions
│   └── index.js                # App entry point
├── .env.example
├── .gitignore
└── package.json
```

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd blogify-api
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB Atlas connection string:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/blogify?retryWrites=true&w=majority
```

### 3. Run the Server

```bash
npm run dev
```

You should see:
```
MongoDB Connected: <your-cluster>.mongodb.net
Server running in development mode on port 3000
```

---

## API Endpoints

| Method | Endpoint                  | Description         |
|--------|---------------------------|---------------------|
| GET    | `/api/v1/posts`           | Get all posts       |
| GET    | `/api/v1/posts/:id`       | Get one post by ID  |
| POST   | `/api/v1/posts`           | Create a new post   |
| PATCH  | `/api/v1/posts/:id`       | Update a post       |
| DELETE | `/api/v1/posts/:id`       | Delete a post       |

---

## Full-Cycle Postman Testing Guide

### Step A — Create a User (via MongoDB Compass)

Open MongoDB Compass, connect to your Atlas cluster, navigate to the `blogify` database → `users` collection, and insert:

```json
{
  "username": "john_doe",
  "email": "john@example.com"
}
```

Copy the generated `_id` value (e.g., `664f1a2b3c4d5e6f7a8b9c0d`).

---

### Step B — Create a Post

**POST** `http://localhost:3000/api/v1/posts`

Body (JSON):
```json
{
  "title": "My First Blog Post",
  "body": "This is the content of my first post on Blogify!",
  "author": "664f1a2b3c4d5e6f7a8b9c0d"
}
```

Expected response (`201 Created`):
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "My First Blog Post",
    "body": "This is the content of my first post on Blogify!",
    "author": "664f1a2b3c4d5e6f7a8b9c0d",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### Step C — Get All Posts

**GET** `http://localhost:3000/api/v1/posts`

Expected response — note the `author` field is **populated** with username:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "My First Blog Post",
      "body": "...",
      "author": {
        "_id": "664f1a2b3c4d5e6f7a8b9c0d",
        "username": "john_doe"
      },
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

### Step D — Get One Post

**GET** `http://localhost:3000/api/v1/posts/<post_id>`

Same populated response as above, for a single post.

---

### Step E — Update a Post

**PATCH** `http://localhost:3000/api/v1/posts/<post_id>`

Body (JSON):
```json
{
  "title": "My Updated Blog Post Title"
}
```

Expected response (`200 OK`) with updated document.

---

### Step F — Delete a Post

**DELETE** `http://localhost:3000/api/v1/posts/<post_id>`

Expected response:
```json
{
  "success": true,
  "data": {}
}
```

---

### Error Cases to Test

- **404 Not Found**: GET/PATCH/DELETE with a valid but non-existent ID
- **400 Bad Request**: POST without a required field (e.g., missing `author`)

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feat/integrate-database-layer

# After completing all integration work:
git add .
git commit -m "feat: connect Blogify API to MongoDB Atlas"
git commit -m "feat: add User and Post mongoose models with timestamps"
git commit -m "feat: implement posts service layer with full CRUD"
git commit -m "feat: refactor posts controller to delegate to service layer"
git commit -m "feat: add populate for author on GET post endpoints"

# Push and open PR
git push origin feat/integrate-database-layer
```

Then open a Pull Request on GitHub from `feat/integrate-database-layer` → `main`.