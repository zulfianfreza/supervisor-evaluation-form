# Fullstack App - Express.js + PostgreSQL + Next.js

Modern fullstack application built with Express.js backend, PostgreSQL database, and Next.js frontend, all containerized with Docker.

## 🚀 Quick Start

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/)

### 1. Clone Repository

```bash
git clone https://github.com/zulfianfreza/supervisor-evaluation-form
cd supervisor-evaluation-form
```

### 2. Setup Environment Variables

```bash
# Copy environment example files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Or create manually (see Environment Setup section below)
```

### 3. Start Application

```bash
docker-compose up --build
```

### 4. Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000

## 🎉 That's it!

The application will automatically:

- ✅ Setup PostgreSQL database
- ✅ Run database migrations
- ✅ Seed with sample data
- ✅ Start backend API server
- ✅ Start frontend server

## 🌐 API Endpoints

### Questions

- `GET /api/v1/questions` - Get all questions
- `GET /api/v1/questions/:id` - Get question by id
- `POST /api/v1/questions` - Create new question
- `PUT /api/v1/questions/:id` - Update question
- `DELETE /api/v1/questions/:id` - Delete question

### Respondents

- `POST /api/v1/respondents/submit` - Submit respondent
- `GET /api/v1/respondents` - Get all respondents
- `GET /api/v1/respondents/:id` - Get detail respondent
- `DELETE /api/v1/respondents/:id` - Delete respondent

## 🔧 Environment Setup

### Option 1: Copy from Example Files (Recommended)

```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

### Option 2: Create Manually

**Backend (.env):**

```env
# APP
APP_NAME="Supervisor Evaluation Form"
NODE_ENV=development
PORT=8000
BASE_URL=http://localhost:8000

# DATABASE
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=supervisor_evaluation_form

```

**Frontend (.env):**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```
