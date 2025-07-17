# Task Management Project Overview

This document provides a comprehensive overview of the Task Management project, covering both backend and frontend components, their structure, and the basic flow of the application.

---

## Backend Overview

### Technology Stack
- Node.js with Express framework
- MongoDB for database (via Mongoose schemas)

### Entry Point
- `Backend/src/server.js`: Sets up Express server, middleware, static file serving, routes, and database connection.

### API Routes
- Registered under `/api` prefix in `Backend/src/routes/MainRoute.js`.
- Modular routes for:
  - Authentication (`Auth.routes.js`)
  - Projects (`Project.routes.js`)
  - Tasks (`Task.routes.js`)
  - Chat (`Chat.routes.js`)

### Controllers and Features

#### Authentication (`Auth.controller.js`)
- User registration with validation, password hashing (bcrypt).
- User login with JWT token generation and validation.
- Fetch all users (excluding passwords).
- Update user profile with role-based permissions.
- Get user profile by ID.
- Logout endpoint (client handles token removal).

#### Project Management (`Project.controller.js`)
- Create new projects with owner as creator.
- Add members with roles (owner, manager, developer) and authorization checks.
- Update project progress and auto-complete when progress reaches 100%.
- Get project details with populated user info.
- Update project status (active, completed, archived).
- Get all projects for a user by role.
- Get a member's role in a project.

#### Task Management (`Task.controller.js`)
- Create tasks linked to projects with details like title, description, assigned user, status, priority, due date, estimated hours.
- Get task by ID with populated user and project info.
- Get tasks by project ID sorted by due date.
- Get tasks assigned to the current user.
- Update and delete tasks by ID.

#### Chat Functionality (`Chat.controller.js`)
- Add project messages (text, file, voice) with file upload handling.
- Get all messages for a project with sender info.
- Update and delete text messages by sender only.
- Authorization checks for project membership.

---

## Frontend Overview

### Technology Stack
- React with React Router for routing
- Formik and Yup for form handling and validation
- Axios for API requests

### Entry Point
- `Frontend/src/App.jsx`: Defines routing structure and authentication token expiry handling.

### Routing Structure
- **Public Routes** (no authentication required):
  - `/login` - Login page
  - `/register` - Registration page (enabled only on localhost)
- **Private Routes** (require authentication):
  - `/` - Home dashboard
  - `/project-dashboard/:id` - Project dashboard view
  - `/add-project` - Add new project
  - `/profileForm` - User profile form
  - `/taskBoard` - Task board view
  - `/chatBox/:projectId` - Project chat box

### Authentication Flow
- Login page (`Login.jsx`) uses Formik for form and posts credentials to backend.
- On successful login, JWT token and user info are stored in localStorage with expiry.
- Auto-logout after 30 minutes of token expiry.
- Private routes are protected and redirect to login if unauthenticated.

### Main Pages and Components

#### Layout (`Layout.jsx`)
- Wraps main pages with Sidebar and MobileSidebar for navigation.

#### Home Dashboard (`Home.jsx`)
- Displays user greeting and task statistics (pending, completed).
- Shows productivity stats and weekly goals.
- Lists tasks with filtering by priority.
- Lists projects with progress bars and task counts.
- Provides navigation to profile and other pages.

---

## Basic User Flow

1. **Authentication**
   - Users register (if allowed) and login.
   - Tokens are stored and managed with expiry.
   - Private routes require valid authentication.

2. **Project Management**
   - Users create projects and add members with roles.
   - Projects have progress tracking and status updates.

3. **Task Management**
   - Users create, update, assign, and delete tasks within projects.
   - Tasks have priorities, statuses, due dates, and estimated hours.

4. **Communication**
   - Users communicate via project-specific chat with support for text, file, and voice messages.
   - Messages can be edited or deleted by their senders.

5. **Profile Management**
   - Users can view and update their profiles with role-based permissions.

---

This overview aims to provide new developers and users with a clear understanding of the Task Management project's structure and flow.
