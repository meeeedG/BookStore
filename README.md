# Full-Stack BookStore Management Application

A robust, professional-grade full-stack web application designed for managing a library or bookstore. This application provides a modern user interface, a reliable backend system, and secure authentication flows, showcasing best-in-class integration using React, Node.js, MongoDB, and Keycloak.

## 📸 Screenshots

### 🏠 Public Interface
| 1. Landing Page (Guest) | 2. Books Collection |
|:---:|:---:|
| ![Landing Page](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/1.png) | ![Books Collection](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/7.png) |
| *Modern landing page welcoming guests.* | *Browse and filter the book collection.* |

### 🔐 Authentication Flow (Custom Keycloak Theme)
| 3. Login Page | 4. Registration Page | 5. Login Error State |
|:---:|:---:|:---:|
| ![Login Page](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/2.png) | ![Registration Page](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/3.png) | ![Login Error](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/5.png) |
| *Unified glassmorphism login UI.* | *Multi-column registration layout.* | *Custom red validation error feedback.* |

### 🔑 User Sessions & Management (Authenticated)
| 6. Landing Page (User) | 7. User Details (Keycloak) |
|:---:|:---:|
| ![User Landing](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/6.png) | ![User Table](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/4.png) |
| *Protected 'Add Book' actions visible.* | *Keycloak backend user management.* |

### 📚 Book Operations
| 8. Add/Edit Book | 9. Book Details Page |
|:---:|:---:|
| ![Add Book](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/8.png) | ![Book Details](https://raw.githubusercontent.com/meeeedG/BookStore/main/frontend/screenshots/9.png) |
| *Clean, responsive book entry forms.* | *Detailed view with edit/delete actions.* |


## ✨ Features

- **Book Management (CRUD)**: Create, read, update, and delete books in the store.
- **Secure Authentication**: Integrated with Keycloak for industry-standard identity and access management.
- **Role-Based Access Control**: Ensures content and operations are correctly restricted based on user roles and permissions.
- **Custom Keycloak Theme**: Features a personalized, styled authentication flow that seamlessly matches the main app's branding.
- **Containerized Infrastructure**: Effortlessly deploys Data and Identity layers (MongoDB & Keycloak) using Docker Compose.
- **Modern & Responsive UI**: Fast and aesthetic user experience built on React and Vite.

## 🗂️ Project Structure

```text
gestion-des-livres/
├── backend/                  # Node.js/Express REST API
│   ├── server.js             # API entrypoint
│   └── package.json          # Backend dependencies
├── frontend/                 # React application (Vite)
│   ├── src/                  # Components, contexts, and Keycloak logic
│   └── package.json          # Frontend dependencies
├── theme/                    # Custom Keycloak authorization theme
│   └── login/                # CSS and view customizations for Keycloak
├── docker-compose.yaml       # Infrastructure configuration
└── README.md                 # Project documentation
```

## 📚 Tech Stack

- **Frontend**: React (Vite), React Router DOM, Axios, Vanilla CSS, Keycloak-js
- **Backend**: Node.js, Express, Mongoose (MongoDB ODM), CORS
- **Database**: MongoDB (via Docker), Mongo-Express
- **Authentication**: Keycloak (via Docker)

## ⚙️ Installation & Execution

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose
- NPM (or Yarn/PNPM)

### 1. Start Infrastructure (MongoDB & Keycloak)

First, launch the development containers that host the database and identity provider.

```bash
docker-compose up -d
```
*Services started:*
- **MongoDB**: `localhost:27017`
- **Mongo-Express** (DB UI): `http://localhost:8081`
- **Keycloak**: `http://localhost:8080` (Admin credentials: `admin` / `admin`)

### 2. Configure Keycloak

- Go to the Keycloak admin console (`http://localhost:8080/admin`).
- Create a realm, client, and necessary roles needed for the application.
- *Note:* The custom theme provided in the `theme/` directory is automatically mounted into the Keycloak container as `bookstore-theme`.

### 3. Run the Backend Server

```bash
cd backend
npm install
npm run dev
```
*The Express server will start up and connect to the local MongoDB instance.*

### 4. Run the Frontend App

Open a new terminal session:

```bash
cd frontend
npm install
npm run dev
```
*The Vite development server will start the React app in your browser.*

## 👤 Author

**Mohamed Ghalib**  
Email: mohamedghalib157@gmail.com
