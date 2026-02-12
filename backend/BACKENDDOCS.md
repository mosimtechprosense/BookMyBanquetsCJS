# BookMyBanquets – Backend Documentation

## Project Overview

BookMyBanquets is a full‑stack platform designed to provide users with a seamless experience for discovering, evaluating, and booking banquet halls for various events. Users can browse venues, view amenities, explore locality‑based SEO content, and connect with the business team to finalize bookings, while admins manage leads, tasks, listings, and users through a secure dashboard.

---

## Overview

The **BookMyBanquets Backend** is a Node.js + Express REST API that powers the BookMyBanquets platform. It handles authentication, banquet listings, bookings, users, admin operations, and integrations required by the frontend application.

The backend is designed with a modular structure, environment‑based configuration, and scalable routing to support future growth.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* JWT Authentication
* SMTP (Email / OTP)

### Database

* MySQL (Primary DB) + prisma


### Deployment

* cPanel
* Personal VPS

### Tooling

* dotenv
* npm

---

## Project Structure

```
backend/
├── config/
│   ├── db.js              # MY SQL connection logic
│   └── config.js          # App configuration values
│
├── controllers/
│   ├── authController.js  # Login / register logic
│   ├── userController.js  # User-related operations
│   ├── banquetController.js # Banquet CRUD & listing logic
│   └── bookingController.js # Booking workflows
│
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── errorMiddleware.js # Centralized error handling
│
├── models/
│   ├── User.js            # User schema
│   ├── Banquet.js         # Banquet schema
│   └── Booking.js         # Booking schema
│
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── userRoutes.js      # User endpoints
│   ├── banquetRoutes.js   # Banquet endpoints
│   └── bookingRoutes.js   # Booking endpoints
│
├── utils/
│   └── helpers.js         # Utility/helper functions
│
├── app.js                 # Express app setup
├── server.js              # Server entry point
└── package.json
```

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

```
DATABASE_URL="mysql://root:password@localhost:3306/bookmybanquets"
BLOGDB_URL="mysql://root:password@localhost:3306/bookmybanquets_blogdb"
PORT=3000
BASE_URL=https://node.bookmybanquets.in
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Variable Explanation

* **DATABASE_URL** – Main MySQL database (bookings, users, banquets)
* **BLOGDB_URL** – Separate MySQL database for blog/content module
* **BASE_URL** – Frontend or public base URL
* **EMAIL_USER / EMAIL_PASS** – Used for sending emails (OTP, confirmations)
* **JWT_SECRET** – Secret key for signing JWT tokens

> ⚠️ Never commit `.env` files or real credentials to version control.

---

## Database Models

### User Table

* id (PK)
* name
* email (unique)
* password (hashed)
* role (user / admin)
* created_at

### Banquet Table

* id (PK)
* name
* location
* capacity
* price
* images
* amenities
* availability

### Booking Table

* id (PK)
* user_id (FK)
* banquet_id (FK)
* event_date
* status (pending / confirmed / cancelled)
* payment_status

### Blog Tables (Blog DB)

* posts
* categories
* comments

> Relations are managed via foreign keys in MySQL.

---

## API Routes

### Admin Authentication Routes

**Base Path:** `/api/admin/auth`

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| POST   | `/login-password`         | Admin login using password  |
| POST   | `/login`                  | Request OTP for admin login |
| POST   | `/verify-otp`             | Verify admin login OTP      |
| POST   | `/password-reset/request` | Request password reset OTP  |
| POST   | `/password-reset/verify`  | Verify OTP & reset password |

---

### Admin Dashboard Routes

**Base Path:** `/api/admin/dashboard`

| Method | Endpoint | Access             | Description              |
| ------ | -------- | ------------------ | ------------------------ |
| GET    | `/stats` | ADMIN, SUPER_ADMIN | Get dashboard statistics |

---

### Admin Lead Management Routes

**Base Path:** `/api/admin/leads`

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| GET    | `/`      | List all leads  |
| POST   | `/`      | Create new lead |
| GET    | `/:id`   | Get lead by ID  |
| PUT    | `/:id`   | Update lead     |
| DELETE | `/:id`   | Delete lead     |

#### RM Notes

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/:id/rm-notes`     | Get RM notes for a lead |
| POST   | `/:id/rm-notes`     | Add RM note             |
| PUT    | `/rm-notes/:noteId` | Update RM note          |
| DELETE | `/rm-notes/:noteId` | Delete RM note          |

#### Lead Events

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/:id/events`      | Get lead events   |
| POST   | `/:id/events`      | Add lead event    |
| PUT    | `/events/:eventId` | Update lead event |
| DELETE | `/events/:eventId` | Delete lead event |

---

### Admin Task Routes

**Base Path:** `/api/admin/tasks`

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| POST   | `/`           | Assign task             |
| GET    | `/`           | List tasks (role-based) |
| GET    | `/:id`        | Get task details        |
| POST   | `/:id/report` | Submit task report      |

---

### Admin User Management Routes

**Base Path:** `/api/admin/users`

| Method | Endpoint              | Access             | Description         |
| ------ | --------------------- | ------------------ | ------------------- |
| GET    | `/`                   | ADMIN, SUPER_ADMIN | List users          |
| POST   | `/`                   | ADMIN, SUPER_ADMIN | Create user         |
| GET    | `/:id`                | ADMIN, SUPER_ADMIN | Get user by ID      |
| PUT    | `/:id`                | ADMIN, SUPER_ADMIN | Update user         |
| PUT    | `/:id/reset-password` | ADMIN, SUPER_ADMIN | Reset user password |
| DELETE | `/:id`                | ADMIN, SUPER_ADMIN | Delete user         |

---

### Public Contact Routes

**Base Path:** `/api/contact`

| Method | Endpoint | Description            |
| ------ | -------- | ---------------------- |
| POST   | `/`      | Create contact message |
| GET    | `/`      | Get all messages       |
| GET    | `/:id`   | Get message by ID      |
| PUT    | `/:id`   | Update message         |
| DELETE | `/:id`   | Delete message         |

---

### Public Listing Routes

**Base Path:** `/api/listings`

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| GET    | `/recommended` | Get recommended listings        |
| GET    | `/high-demand` | Get high-demand listings        |
| POST   | `/`            | Create listing                  |
| GET    | `/`            | Get all listings (with filters) |
| GET    | `/:id/similar` | Get similar listings            |
| GET    | `/:id`         | Get listing by ID               |
| PUT    | `/:id`         | Update listing                  |
| DELETE | `/:id`         | Delete listing                  |

---

### Public Locality Content Routes

**Base Path:** `/api/locality`

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/locality-content`     | Create locality content    |
| GET    | `/locality-content`     | Get all locality content   |
| GET    | `/locality-content/:id` | Get locality content by ID |
| PUT    | `/locality-content/:id` | Update locality content    |
| DELETE | `/locality-content/:id` | Delete locality content    |
| GET    | `/seo/locality/:slug`   | Get locality SEO by slug   |

---

### Public Location Routes

**Base Path:** `/api/locations`

| Method | Endpoint | Description                         |
| ------ | -------- | ----------------------------------- |
| GET    | `/`      | Get all locations (optional ?city=) |
| POST   | `/`      | Create new location                 |
| PUT    | `/:id`   | Update location                     |
| DELETE | `/:id`   | Delete location                     |

------|--------|------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### User Routes

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/users/profile` | Get logged-in user profile |
| PUT    | `/api/users/profile` | Update profile             |

### Banquet Routes

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/banquets`     | Get all banquets       |
| GET    | `/api/banquets/:id` | Get banquet by ID      |
| POST   | `/api/banquets`     | Create banquet (admin) |
| PUT    | `/api/banquets/:id` | Update banquet         |
| DELETE | `/api/banquets/:id` | Delete banquet         |

### Booking Routes

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/bookings`      | Create booking       |
| GET    | `/api/bookings/user` | User bookings        |
| GET    | `/api/bookings`      | All bookings (admin) |

---

## Authentication Flow

1. User logs in or registers
2. Server returns a **JWT token**
3. Token is sent in headers:

```
Authorization: Bearer <token>
```

4. `authMiddleware` validates token for protected routes

---

## Error Handling

* Centralized error middleware
* Consistent JSON error responses

```
{
  "success": false,
  "message": "Error description"
}
```

---

## Features

* User authentication and authorization (Password + OTP)
* Venue search, filtering, and recommendations
* Lead and event management
* Booking workflow via assisted call process
* Admin dashboard with role‑based access control
* Locality‑based SEO content management

---

## Running the Backend Locally

```bash
cd backend
npm install
npm run dev
```

Server runs at:

```
https://node.bookmybanquets.in/
```

---

## Deployment Notes

* Set `NODE_ENV=production`
* Use process manager (PM2 recommended)
* Ensure MY SQL network access is allowed
* Configure environment variables on server

---

## Future Improvements

* Role-based permissions
* Payment gateway integration
* API rate limiting
* Swagger/OpenAPI documentation

---

**Author:** Mosim Raza
**Project:** BookMyBanquets Backend
