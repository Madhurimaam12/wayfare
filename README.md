# Wayfare - Corporate Travel Management Platform

A full-stack MERN application that streamlines business travel from request to reimbursement.

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-00d09c?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Features](#features) | [Demo](#demo-accounts) | [Installation](#installation) | [API](#api-reference) | [Screenshots](#screenshots) | [Contributing](#contributing)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Demo Accounts](#demo-accounts)
- [Feature Matrix](#feature-matrix)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Complete Workflow](#complete-workflow)
- [Security Features](#security-features)
- [Testing Workflows](#testing-workflows)
- [Deployment](#deployment)
- [Available Scripts](#available-scripts)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Known Issues](#known-issues)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Author](#author)

---

## Overview

Wayfare is a modern, enterprise-grade corporate travel management system built on the MERN stack. It digitizes the entire business travel lifecycle, from trip planning and multi-level approvals to expense tracking and reimbursement, eliminating paperwork, reducing costs, and providing complete visibility into organizational travel spend.

Whether managing occasional client visits or coordinating hundreds of trips monthly, Wayfare scales with role-based access, automated policy enforcement, and real-time analytics.

### The Problem

Fragmented emails, lost receipts, manual approvals, no spending visibility, and policy violations.

### The Solution

One unified platform with automated workflows, real-time tracking, policy enforcement, and a complete audit trail.

---

## Features

### Authentication and Security

- JWT-based sessions
- Bcrypt password hashing
- Role-Based Access Control (RBAC)
- Protected API routes
- Session timeout management
- Input sanitization

### Travel Request Management

- Multi-step request creation
- Destination and date management
- Cost estimation
- Purpose documentation
- Real-time status tracking
- Multi-level approval chains

### Expense Management

- Receipt upload (image or PDF)
- Category-based organization
- Policy compliance checks
- Review and approval workflow
- Reimbursement tracking
- Bulk operations

### Analytics and Reporting

- Real-time dashboards
- Spending trends by month
- Department breakdowns
- Top spender analysis
- Policy violation alerts
- Custom date ranges

### Export and Integration

- CSV (Excel-compatible)
- JSON (data backup)
- PDF (printable reports)
- Automated timestamps
- Filtered exports
- One-click download

### Modern UI and UX

- Fully responsive design
- Role-specific themes
- Smooth animations
- Accessible components
- Mobile-optimized
- Dark sidebar navigation

---

## User Roles

| Role | Color Theme | Responsibility |
|------|-------------|----------------|
| Admin | Slate | Manage users, departments, policies, and system settings |
| Manager | Amber | Approve team travel requests and view team analytics |
| Finance Officer | Emerald | Review expenses, approve reimbursements, and audit |
| Travel Coordinator | Blue | Book flights, hotels, transport, and manage vendors |
| Employee | Indigo | Create travel requests and submit expenses |

---

## Technology Stack

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18.x | UI library |
| Vite | 5.x | Build tool and dev server |
| React Router | 6.x | Client-side routing |
| Tailwind CSS | 3.4 | Utility-first styling |
| Lucide React | Latest | Icon library |
| Axios | 1.6 | HTTP client |

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| Express | 4.x | Web framework |
| Mongoose | 7.x | MongoDB ODM |
| Bcryptjs | 2.4 | Password hashing |
| JSONwebtoken | 9.x | JWT authentication |
| Multer | 1.4 | File uploads |
| CORS | 2.8 | Cross-origin requests |

### Development Tools

| Tool | Purpose |
|------|---------|
| Nodemon | Auto-restart backend |
| ESLint | Code linting |
| Git | Version control |

---

## Installation

### Prerequisites

| Requirement | Version | Download |
|-------------|---------|----------|
| Node.js | 18.x or higher | [nodejs.org](https://nodejs.org/) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| MongoDB Atlas | Free tier | [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas) |

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/wayfare.git
cd wayfare
```

### Step 2: MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster (Free M0 tier is sufficient)
3. Create a database user:
   - Navigate to: Security > Database Access
   - Click "Add New Database User"
   - Set username: `wayfare_user`
   - Set a strong password
   - Privileges: "Read and write to any database"
4. Whitelist your IP address:
   - Navigate to: Security > Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
5. Get the connection string:
   - Click your cluster, then Connect, then Drivers
   - Copy the connection string

### Step 3: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas - replace with your connection string
MONGO_URI=mongodb+srv://wayfare_user:YOUR_PASSWORD@cluster.mongodb.net/wayfare?retryWrites=true&w=majority

# JWT Secret - use a strong random string
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# File Uploads
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

Initialize the database with demo data:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

Backend runs at: http://localhost:5000

### Step 4: Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: http://localhost:5173

### Step 5: Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

Login with any of the demo accounts listed below.

---

## Demo Accounts

| Role | Email | Password | What to Test |
|------|-------|----------|--------------|
| Admin | admin@wayfare.com | admin123 | User management, departments, policies, settings |
| Employee | john@wayfare.com | password123 | Create requests, submit expenses, profile |
| Manager | mike@wayfare.com | password123 | Approve requests, view team, team reports |
| Finance Officer | sarah@wayfare.com | password123 | Review expenses, analytics, audit log |
| Travel Coordinator | robert@wayfare.com | password123 | Book flights, hotels, transport, vendors |

Note: On the login page, click any of the five colored icon buttons to log in instantly without typing.

---

## Feature Matrix

| Feature | Admin | Manager | Finance | Coordinator | Employee |
|---------|:-----:|:-------:|:-------:|:-----------:|:--------:|
| View Dashboard | Yes | Yes | Yes | Yes | Yes |
| Create Travel Request | Yes | Yes | No | No | Yes |
| Approve Requests | No | Yes | No | No | No |
| View Team | No | Yes | No | No | No |
| Submit Expense | Yes | Yes | No | No | Yes |
| Review Expenses | No | No | Yes | No | No |
| Book Travel | No | No | No | Yes | No |
| Manage Vendors | No | No | No | Yes | No |
| View Analytics | Yes | Yes | Yes | No | No |
| Manage Users | Yes | No | No | No | No |
| Manage Departments | Yes | No | No | No | No |
| Manage Policies | Yes | No | No | No | No |
| System Settings | Yes | No | No | No | No |
| Audit Logs | Yes | No | Yes | No | No |

---

## API Reference

### Base URL

```
http://localhost:5000/api
```

### Authentication

All protected routes require this header:

```
Authorization: Bearer <your_jwt_token>
```

### Auth Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| POST | /auth/register | Register new user | No |
| POST | /auth/login | Login user | No |
| GET | /auth/me | Get current user | Yes |

### Travel Request Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | /travel-requests | Create request | Employee and above |
| GET | /travel-requests/my | Get my requests | Employee and above |
| GET | /travel-requests/:id | Get single request | Employee and above |
| GET | /travel-requests/pending | Get pending approvals | Manager and above |
| PUT | /travel-requests/:id/approve | Approve request | Manager and above |
| PUT | /travel-requests/:id/reject | Reject request | Manager and above |

### Expense Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | /expenses | Submit expense | Employee and above |
| GET | /expenses/my | Get my expenses | Employee and above |
| GET | /expenses/:id | Get single expense | Employee and above |
| GET | /expenses/pending | Get pending review | Finance and above |
| PUT | /expenses/:id/approve | Approve expense | Finance and above |
| PUT | /expenses/:id/reject | Reject expense | Finance and above |

### User Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | /users | Get all users | Admin, Finance |
| GET | /users/:id | Get single user | Any authenticated |
| PUT | /users/:id | Update user | Owner or Admin |
| DELETE | /users/:id | Deactivate user | Admin |

### Department and Policy Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | /departments | Get all departments | Any authenticated |
| POST | /departments | Create department | Admin |
| PUT | /departments/:id | Update department | Admin |
| DELETE | /departments/:id | Delete department | Admin |
| GET | /policies | Get all policies | Any authenticated |
| POST | /policies | Create policy | Admin |
| PUT | /policies/:id | Update policy | Admin |
| DELETE | /policies/:id | Delete policy | Admin |

---

## Project Structure

```
wayfare/
|
|-- backend/                          # Express.js API
|   |-- src/
|   |   |-- config/                   # DB connection
|   |   |-- controllers/              # Business logic
|   |   |-- middleware/               # Auth, validation
|   |   |-- models/                   # Mongoose schemas
|   |   |   |-- User.js
|   |   |   |-- Department.js
|   |   |   |-- TravelPolicy.js
|   |   |   |-- TravelRequest.js
|   |   |   |-- Expense.js
|   |   |-- routes/                   # API endpoints
|   |   |-- seeders/                  # Test data
|   |   |-- utils/                    # Helpers
|   |   |-- index.js                  # Entry point
|   |-- uploads/                      # User uploads (gitignored)
|   |-- .env                          # Secrets (gitignored)
|   |-- .env.example                  # Template
|   |-- package.json
|
|-- frontend/                         # React + Vite SPA
|   |-- src/
|   |   |-- components/
|   |   |   |-- auth/                 # Auth components
|   |   |   |-- common/               # Layout, Sidebar, Header
|   |   |-- context/                  # React Context
|   |   |   |-- AuthContext.jsx
|   |   |-- pages/                    # Route pages
|   |   |   |-- LandingPage.jsx
|   |   |   |-- LoginPage.jsx
|   |   |   |-- RegisterPage.jsx
|   |   |   |-- EmployeeDashboard.jsx
|   |   |   |-- ManagerDashboard.jsx
|   |   |   |-- FinanceDashboard.jsx
|   |   |   |-- CoordinatorDashboard.jsx
|   |   |   |-- AdminDashboard.jsx
|   |   |   |-- NewTravelRequest.jsx
|   |   |   |-- MyTravelRequests.jsx
|   |   |   |-- NewExpense.jsx
|   |   |   |-- MyExpenses.jsx
|   |   |   |-- ProfilePage.jsx
|   |   |   |-- ... (and 15+ more)
|   |   |-- services/                 # API client
|   |   |   |-- api.js
|   |   |-- utils/                    # Export helpers
|   |   |   |-- exportUtils.js
|   |   |-- App.jsx                   # Routes
|   |   |-- main.jsx                  # Entry
|   |   |-- index.css                 # Tailwind
|   |-- .env                          # Env (gitignored)
|   |-- .env.example                  # Template
|   |-- package.json
|
|-- .gitignore
|-- LICENSE
|-- README.md
```

---

## Complete Workflow

```
Step 1: Employee creates travel request
   |
Step 2: Manager reviews and approves
   |
Step 3: Coordinator books flights, hotels, transport
   |
Step 4: Employee travels and submits expenses
   |
Step 5: Finance reviews and approves reimbursement
   |
Step 6: Admin monitors analytics and compliance
```

---

## Security Features

- JWT tokens with 7-day expiry
- Bcrypt password hashing (10 rounds)
- CORS whitelist configuration
- RBAC enforced on every route
- File upload validation (type and size)
- Server-side input validation
- Environment variables for all secrets
- Protected API endpoints
- Session management

---

## Testing Workflows

### Workflow 1: Full Travel Request Cycle

```
1. Login as Employee and create a travel request
2. Login as Manager and approve the request
3. Login as Employee to verify the "Approved" status
```

### Workflow 2: Expense Reimbursement

```
1. Login as Employee and submit an expense with receipt
2. Login as Finance Officer and approve the expense
3. Verify the entry appears in the Analytics dashboard
```

### Workflow 3: Admin Management

```
1. Login as Admin and add a new user
2. Create a department and configure a policy
3. View the audit log to see all recorded actions
```

---

## Deployment

### Backend - Render.com

1. Push code to GitHub
2. Create a new Web Service on render.com
3. Connect the repository and set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `.env`

### Frontend - Vercel

1. Import the GitHub repository on vercel.com
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_URL` environment variable

### Database - MongoDB Atlas

Already cloud-hosted.

---

## Available Scripts

### Backend

```bash
npm run dev     # Start dev server with nodemon
npm start       # Start production server
npm run seed    # Seed database with demo data
```

### Frontend

```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

---

## Screenshots

### Landing Page

Professional marketing page with feature showcase.

### Login Page

Split-screen design with one-click demo login.

### Role Dashboards

| Role | Theme Color | Key Features |
|------|-------------|--------------|
| Employee | Indigo | Travel requests, expenses, profile |
| Manager | Amber | Approvals, team, reports |
| Finance Officer | Emerald | Expense review, analytics, audit |
| Coordinator | Blue | Bookings, vendors, transport |
| Admin | Slate | Users, departments, policies, settings |

To add actual screenshots, upload images to GitHub and update this section.

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes:

```bash
git commit -m "Add amazing feature"
```

4. Push to the branch:

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

## Roadmap

- [x] Core authentication and RBAC
- [x] Travel request workflow
- [x] Expense management with uploads
- [x] Analytics dashboards
- [x] Export functionality
- [x] Role-specific dashboards
- [ ] Email notifications
- [ ] Real-time updates (WebSockets)
- [ ] Mobile app (React Native)
- [ ] Slack and Teams integration
- [ ] Multi-currency support
- [ ] Advanced reporting

---

## Known Issues

- MongoDB Atlas connection may timeout on some ISPs. Use the standard connection string.
- File uploads limited to 5MB per receipt.
- PDF export uses the browser print dialog.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

Built with these tools:

- [MongoDB Atlas](https://www.mongodb.com/atlas) - Free cloud database
- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icon set
- [Express.js](https://expressjs.com/) - Web framework

---

## Author

**[Your Name]**

Full-Stack Developer | Final Year Capstone Project

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [YOUR_PROFILE](https://linkedin.com/in/YOUR_PROFILE)
- Email: your.email@example.com

---

## Support

If you found this project helpful, please give it a star on GitHub.

Made for corporate travelers everywhere.