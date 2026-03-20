# Shri Ram Hospital – HMS Backend

Express.js / Node.js REST API for the Hospital Management System.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v20+ |
| Framework | Express.js 4.x |
| Database | MongoDB 6+ via Mongoose |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Logging | Winston + Morgan |
| Security | Helmet, CORS |

## Prerequisites

- **Node.js** v18 or higher
- **MongoDB** running on `localhost:27017` (or provide a URI in `.env`)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env     # or create .env manually (see below)

# 3. Seed the default Super Admin user
npm run seed

# 4. Start the server
npm start          # production
npm run dev        # development (nodemon, auto-restart)
```

## Environment Variables (`.env`)

```env
PORT=3000
MONGO_CONNECTION_STRING=mongodb://localhost:27017/hms_db
JWT_SECRET=supersecretkey_hms_2024_shriramhospital
REDIS_URL=redis://localhost:6379
WHITELIST_ORIGIN=["http://localhost:5173","http://localhost:5174"]
NODE_ENV=development
```

## Default Credentials

After running `npm run seed`:

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `Admin@123` |
| Role | Super Admin |

> ⚠️ Change the password immediately after first login.

## API Endpoints

### Auth — `/api/v1/auth`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | ✗ | Register a new user |
| POST | `/login` | ✗ | Login and receive JWT |
| GET | `/me` | ✓ | Get current user profile |

### Patients — `/api/v1/patients`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | ✓ | List all patients |
| POST | `/` | ✓ | Register a new patient |
| GET | `/:id` | ✓ | Get patient by ID |
| PUT | `/:id` | ✓ | Update patient record |
| DELETE | `/:id` | ✓ | Soft-delete patient |

### Billing — `/api/v1/billing`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | ✓ | List all invoices |
| POST | `/` | ✓ | Create new invoice |

### Inventory — `/api/v1/inventory`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | ✓ | List all stock items |
| POST | `/` | ✓ | Add new stock item |

### Health Check

```
GET /health  →  { "status": "UP" }
```

## Project Structure

```
hospital-backend/
├── config/          # Environment config
├── controllers/     # Route handler logic
├── helpers/         # JWT helpers, utilities
├── middlewares/     # Auth (JWT verify) + RBAC
├── models/          # Mongoose schemas
│   ├── User.js       Admission.js   Billing.js
│   ├── Patient.js    Appointment.js Inventory.js
│   ├── Staff.js      Ward.js        Bed.js
│   └── Department.js AuditLog.js    db.js
├── routes/          # Express routers
├── seeds/           # Database seeders
│   └── seedAdmin.js
├── app.js           # Express app setup
├── server.js        # HTTP server + DB init
└── .env             # Environment variables (git-ignored)
```

## Roles

The system supports 10 roles with role-based access control (RBAC):

`Super Admin` · `Admin` · `Doctor` · `Nurse` · `Receptionist` · `Accountant` · `Pharmacy Staff` · `HR Staff` · `Patient` · `System`

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start in production mode |
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm run seed` | Seed default admin user |