# Backend Migration Plan: Atlanta Food Resources App

**Document Version:** 1.0
**Date:** November 13, 2025
**Project:** Atlanta Food Resources Application
**Migration Goal:** Add Express.js backend, PostgreSQL database, and migrate to Vercel hosting

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Migration Goals](#migration-goals)
3. [Architecture Plan](#architecture-plan)
4. [Database Schema Design](#database-schema-design)
5. [API Design](#api-design)
6. [Technology Stack](#technology-stack)
7. [Implementation Phases](#implementation-phases)
8. [Vercel Configuration](#vercel-configuration)
9. [Security Considerations](#security-considerations)
10. [Migration Strategy](#migration-strategy)
11. [Testing Strategy](#testing-strategy)
12. [Cost Estimation](#cost-estimation)
13. [Performance Optimizations](#performance-optimizations)
14. [Next Steps](#next-steps)

---

## Current State Analysis

### Frontend Stack
- **React:** 19.1.1 with Vite
- **Router:** React Router 7.9.5 for navigation
- **Maps:** Leaflet for interactive maps
- **Styling:** SCSS/Sass 1.93.2
- **Data:** Static JSON file (38 food resources)
- **Storage:** localStorage for favorites
- **Features:** Client-side filtering and search

### Current Data Structure
```json
{
  "id": 1,
  "name": "Atlanta Community Food Bank",
  "address": "732 Joseph E Lowery Blvd NW",
  "city": "Atlanta",
  "state": "GA",
  "zipCode": "30318",
  "county": "Fulton",
  "latitude": 33.7629,
  "longitude": -84.4283,
  "phone": "(404) 892-9822",
  "website": "https://www.acfb.org",
  "description": "Provides food assistance...",
  "services": ["Food Pantry", "Mobile Pantry", "Partner Network"],
  "hours": "Monday-Friday: 8:00 AM - 5:00 PM"
}
```

**Total Resources:** 38 food resources across Atlanta metro area

---

## Migration Goals

1. **Dynamic Data Management**
   - Move from static JSON to PostgreSQL database
   - Enable real-time updates without deployments

2. **API Layer**
   - Create RESTful API with Express.js
   - Support CRUD operations for food resources

3. **Scalability**
   - Support growing number of resources
   - Handle increased user traffic

4. **User Features**
   - Persistent favorites (authenticated users)
   - User accounts and profiles

5. **Admin Panel**
   - Allow authorized users to add/update resources
   - Implement contribution review system

6. **Better Performance**
   - Server-side filtering and pagination
   - Optimized database queries

7. **Vercel Deployment**
   - Full-stack hosting solution
   - Serverless functions for backend

---

## Architecture Plan

### Option 1: Monorepo Structure (Recommended)

```
food-search-2025/
├── client/                    # React frontend (existing src/)
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/         # NEW: API client services
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Express backend (NEW)
│   ├── src/
│   │   ├── config/           # Database & environment config
│   │   │   ├── database.js
│   │   │   └── env.js
│   │   ├── controllers/      # Route handlers
│   │   │   ├── resourceController.js
│   │   │   ├── authController.js
│   │   │   └── favoriteController.js
│   │   ├── models/           # Database models/queries
│   │   │   ├── Resource.js
│   │   │   ├── User.js
│   │   │   └── Favorite.js
│   │   ├── routes/           # API routes
│   │   │   ├── resources.js
│   │   │   ├── auth.js
│   │   │   └── favorites.js
│   │   ├── middleware/       # Auth, validation, error handling
│   │   │   ├── auth.js
│   │   │   ├── validate.js
│   │   │   └── errorHandler.js
│   │   ├── utils/            # Helpers
│   │   │   ├── logger.js
│   │   │   └── geocoding.js
│   │   └── server.js         # Entry point
│   ├── migrations/           # Database migrations
│   │   ├── 001_initial_schema.sql
│   │   └── 002_seed_data.sql
│   ├── seeds/                # Initial data
│   │   └── foodResources.json
│   └── package.json
│
├── shared/                    # Shared types/constants (optional)
│   └── constants.js
│
├── .env.example
├── .gitignore
├── vercel.json               # Vercel configuration
└── package.json              # Root package.json for workspace
```

### Option 2: Separate Repositories

- **food-search-frontend** - React app repository
- **food-search-backend** - Express API repository

**Pros:** Clear separation, independent deployments
**Cons:** More complex coordination, duplicate configuration

---

## Database Schema Design

### 1. food_resources Table

```sql
CREATE TABLE food_resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL DEFAULT 'GA',
  zip_code VARCHAR(10) NOT NULL,
  county VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  phone VARCHAR(20),
  website VARCHAR(500),
  description TEXT,
  hours TEXT,
  verified BOOLEAN DEFAULT false,
  verified_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by INTEGER REFERENCES users(id),

  -- For full-text search (optional optimization)
  search_vector TSVECTOR
);

-- Indexes for performance
CREATE INDEX idx_county ON food_resources(county);
CREATE INDEX idx_zip_code ON food_resources(zip_code);
CREATE INDEX idx_location ON food_resources USING GIST(
  point(longitude, latitude)
);
CREATE INDEX idx_search ON food_resources USING GIN(search_vector);
```

### 2. services Table

```sql
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Predefined services (initial seed data)
INSERT INTO services (name) VALUES
  ('Food Pantry'),
  ('Free Meals'),
  ('Mobile Pantry'),
  ('Emergency Assistance'),
  ('Youth Programs'),
  ('Partner Network');
```

### 3. resource_services Table (Many-to-Many)

```sql
CREATE TABLE resource_services (
  resource_id INTEGER REFERENCES food_resources(id) ON DELETE CASCADE,
  service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, service_id)
);

CREATE INDEX idx_resource_services_resource ON resource_services(resource_id);
CREATE INDEX idx_resource_services_service ON resource_services(service_id);
```

### 4. users Table (Authentication)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user', -- user, contributor, admin
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 5. favorites Table

```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES food_resources(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_resource ON favorites(resource_id);
```

### 6. contributions Table (Community Contributions)

```sql
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY,
  resource_id INTEGER REFERENCES food_resources(id),
  user_id INTEGER REFERENCES users(id),
  contribution_type VARCHAR(50), -- add, update, verify, delete
  changes JSONB, -- Store what was changed
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP DEFAULT NOW(),
  reviewed_by INTEGER REFERENCES users(id),
  reviewed_at TIMESTAMP,
  review_notes TEXT
);

CREATE INDEX idx_contributions_status ON contributions(status);
CREATE INDEX idx_contributions_user ON contributions(user_id);
CREATE INDEX idx_contributions_resource ON contributions(resource_id);
```

### Entity Relationship Diagram

```
┌─────────────────┐       ┌──────────────────┐       ┌─────────────┐
│  food_resources │───┬───│ resource_services│───────│  services   │
└─────────────────┘   │   └──────────────────┘       └─────────────┘
         │            │
         │            │   ┌──────────────┐
         │            └───│  favorites   │
         │                └──────────────┘
         │                       │
         │                       │
         │                ┌──────────┐
         └────────────────│  users   │
                          └──────────┘
                                 │
                                 │
                          ┌──────────────────┐
                          │  contributions   │
                          └──────────────────┘
```

---

## API Design

### REST API Endpoints

#### Food Resources

```
GET    /api/resources
       Query params: ?county=Fulton&service=Food+Pantry&page=1&limit=20
       Response: { data: [...], total: 38, page: 1, totalPages: 2 }

GET    /api/resources/:id
       Response: { id, name, address, ... }

POST   /api/resources (auth required, role: contributor/admin)
       Body: { name, address, city, ... }
       Response: { id, name, ... }

PUT    /api/resources/:id (auth required, role: contributor/admin)
       Body: { name?, address?, ... }
       Response: { id, name, ... }

DELETE /api/resources/:id (admin only)
       Response: { message: "Resource deleted" }

GET    /api/resources/search?q=food+bank
       Response: { data: [...], total: 5 }

GET    /api/resources/nearby?lat=33.7490&lng=-84.3880&radius=5
       Query params: radius in miles
       Response: { data: [...], total: 12 }
```

#### Services

```
GET    /api/services
       Response: [{ id, name, description }, ...]

GET    /api/resources/by-service/:serviceId
       Response: { data: [...], total: 15 }
```

#### Counties

```
GET    /api/counties
       Response: ["Fulton", "DeKalb", "Cobb", ...]

GET    /api/resources/by-county/:county
       Response: { data: [...], total: 20 }
```

#### Favorites (Auth Required)

```
GET    /api/favorites
       Headers: Authorization: Bearer <token>
       Response: [{ id, resource: {...}, created_at }, ...]

POST   /api/favorites/:resourceId
       Headers: Authorization: Bearer <token>
       Response: { id, resource_id, created_at }

DELETE /api/favorites/:resourceId
       Headers: Authorization: Bearer <token>
       Response: { message: "Favorite removed" }
```

#### Authentication

```
POST   /api/auth/register
       Body: { email, password, name }
       Response: { user: {...}, token }

POST   /api/auth/login
       Body: { email, password }
       Response: { user: {...}, token }

POST   /api/auth/logout
       Headers: Authorization: Bearer <token>
       Response: { message: "Logged out" }

GET    /api/auth/me
       Headers: Authorization: Bearer <token>
       Response: { user: {...} }

POST   /api/auth/refresh
       Headers: Authorization: Bearer <token>
       Response: { token }
```

#### Contributions (Auth Required)

```
POST   /api/contributions
       Headers: Authorization: Bearer <token>
       Body: { resource_id?, contribution_type, changes: {...} }
       Response: { id, status: "pending", ... }

GET    /api/contributions (user's own)
       Headers: Authorization: Bearer <token>
       Response: [{ id, status, contribution_type, ... }, ...]

GET    /api/contributions/pending (admin only)
       Headers: Authorization: Bearer <token>
       Response: [{ id, user, changes, ... }, ...]

PUT    /api/contributions/:id/approve (admin only)
       Headers: Authorization: Bearer <token>
       Body: { review_notes? }
       Response: { id, status: "approved", ... }

PUT    /api/contributions/:id/reject (admin only)
       Headers: Authorization: Bearer <token>
       Body: { review_notes }
       Response: { id, status: "rejected", ... }
```

---

## Technology Stack Details

### Backend Dependencies

```json
{
  "name": "food-search-backend",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "express": "^4.21.2",
    "pg": "^8.13.1",
    "pg-pool": "^3.7.0",
    "dotenv": "^16.4.7",
    "cors": "^2.8.5",
    "helmet": "^8.0.0",
    "morgan": "^1.10.0",
    "express-validator": "^7.2.2",

    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-rate-limit": "^7.5.0",

    "compression": "^1.7.5",
    "express-async-errors": "^3.1.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.9",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "eslint": "^9.36.0"
  },
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "test": "jest",
    "migrate": "node migrations/run.js"
  }
}
```

### Database Options

**Vercel Postgres** (Recommended for Vercel deployment)
- Serverless PostgreSQL
- Built-in integration with Vercel
- Easy setup and configuration

**Neon** (Alternative serverless option)
- Serverless Postgres with generous free tier
- Branch creation for development
- Automatic scaling

**Railway/Render** (If Vercel Postgres doesn't fit)
- Traditional PostgreSQL hosting
- More control over configuration

---

## Implementation Phases

### Phase 1: Backend Foundation (Week 1-2)

**Tasks:**
- [ ] Set up Express server structure
- [ ] Configure PostgreSQL connection
- [ ] Create database schema and migrations
- [ ] Seed database with current JSON data
- [ ] Implement basic CRUD endpoints for resources
- [ ] Add error handling middleware
- [ ] Set up environment variables
- [ ] Write API tests

**Code Examples:**

#### server/src/server.js

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import 'express-async-errors';

import resourceRoutes from './routes/resources.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/resources', resourceRoutes);

// Error handling (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
```

#### server/src/config/database.js

```javascript
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on PostgreSQL client', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);

export default pool;
```

#### server/src/models/Resource.js

```javascript
import { query } from '../config/database.js';

export const Resource = {
  async findAll({ county, service, page = 1, limit = 20 }) {
    const offset = (page - 1) * limit;
    let queryText = `
      SELECT r.*,
             ARRAY_AGG(s.name) as services
      FROM food_resources r
      LEFT JOIN resource_services rs ON r.id = rs.resource_id
      LEFT JOIN services s ON rs.service_id = s.id
    `;

    const whereClauses = [];
    const params = [];
    let paramCount = 1;

    if (county) {
      whereClauses.push(`r.county = $${paramCount}`);
      params.push(county);
      paramCount++;
    }

    if (service) {
      whereClauses.push(`s.name = $${paramCount}`);
      params.push(service);
      paramCount++;
    }

    if (whereClauses.length > 0) {
      queryText += ' WHERE ' + whereClauses.join(' AND ');
    }

    queryText += `
      GROUP BY r.id
      ORDER BY r.name
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    params.push(limit, offset);

    const result = await query(queryText, params);

    // Get total count
    const countResult = await query(
      'SELECT COUNT(*) FROM food_resources' +
      (whereClauses.length > 0 ? ' WHERE ' + whereClauses.join(' AND ') : ''),
      params.slice(0, -2)
    );

    return {
      data: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  },

  async findById(id) {
    const result = await query(`
      SELECT r.*,
             ARRAY_AGG(s.name) as services
      FROM food_resources r
      LEFT JOIN resource_services rs ON r.id = rs.resource_id
      LEFT JOIN services s ON rs.service_id = s.id
      WHERE r.id = $1
      GROUP BY r.id
    `, [id]);

    return result.rows[0];
  },

  async create(data) {
    const {
      name, address, city, state, zip_code, county,
      latitude, longitude, phone, website, description, hours
    } = data;

    const result = await query(`
      INSERT INTO food_resources
        (name, address, city, state, zip_code, county, latitude, longitude,
         phone, website, description, hours)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [name, address, city, state, zip_code, county, latitude, longitude,
        phone, website, description, hours]);

    return result.rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);

    const result = await query(`
      UPDATE food_resources
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING *
    `, values);

    return result.rows[0];
  },

  async delete(id) {
    const result = await query(
      'DELETE FROM food_resources WHERE id = $1 RETURNING *',
      [id]
    );

    return result.rows[0];
  },

  async search(searchTerm) {
    const result = await query(`
      SELECT r.*,
             ARRAY_AGG(s.name) as services
      FROM food_resources r
      LEFT JOIN resource_services rs ON r.id = rs.resource_id
      LEFT JOIN services s ON rs.service_id = s.id
      WHERE r.name ILIKE $1 OR r.description ILIKE $1
      GROUP BY r.id
      ORDER BY r.name
    `, [`%${searchTerm}%`]);

    return result.rows;
  },

  async findNearby(lat, lng, radiusMiles = 5) {
    // Using PostgreSQL's earthdistance module or manual calculation
    const result = await query(`
      SELECT r.*,
             ARRAY_AGG(s.name) as services,
             (
               3959 * acos(
                 cos(radians($1)) * cos(radians(latitude)) *
                 cos(radians(longitude) - radians($2)) +
                 sin(radians($1)) * sin(radians(latitude))
               )
             ) AS distance
      FROM food_resources r
      LEFT JOIN resource_services rs ON r.id = rs.resource_id
      LEFT JOIN services s ON rs.service_id = s.id
      GROUP BY r.id
      HAVING (
        3959 * acos(
          cos(radians($1)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )
      ) <= $3
      ORDER BY distance
    `, [lat, lng, radiusMiles]);

    return result.rows;
  }
};
```

#### server/src/controllers/resourceController.js

```javascript
import { Resource } from '../models/Resource.js';

export const getAllResources = async (req, res) => {
  const { county, service, page, limit } = req.query;

  const result = await Resource.findAll({ county, service, page, limit });

  res.json(result);
};

export const getResourceById = async (req, res) => {
  const { id } = req.params;

  const resource = await Resource.findById(id);

  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  res.json(resource);
};

export const createResource = async (req, res) => {
  const resource = await Resource.create(req.body);

  res.status(201).json(resource);
};

export const updateResource = async (req, res) => {
  const { id } = req.params;

  const resource = await Resource.update(id, req.body);

  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  res.json(resource);
};

export const deleteResource = async (req, res) => {
  const { id } = req.params;

  const resource = await Resource.delete(id);

  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  res.json({ message: 'Resource deleted successfully' });
};

export const searchResources = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query required' });
  }

  const resources = await Resource.search(q);

  res.json({ data: resources, total: resources.length });
};

export const getNearbyResources = async (req, res) => {
  const { lat, lng, radius = 5 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude required' });
  }

  const resources = await Resource.findNearby(
    parseFloat(lat),
    parseFloat(lng),
    parseFloat(radius)
  );

  res.json({ data: resources, total: resources.length });
};
```

#### server/src/routes/resources.js

```javascript
import express from 'express';
import { body } from 'express-validator';
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  searchResources,
  getNearbyResources
} from '../controllers/resourceController.js';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const resourceValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('county').trim().notEmpty().withMessage('County is required'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude required'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude required'),
];

// Public routes
router.get('/', getAllResources);
router.get('/search', searchResources);
router.get('/nearby', getNearbyResources);
router.get('/:id', getResourceById);

// Protected routes
router.post(
  '/',
  authenticate,
  authorize(['contributor', 'admin']),
  resourceValidation,
  validate,
  createResource
);

router.put(
  '/:id',
  authenticate,
  authorize(['contributor', 'admin']),
  validate,
  updateResource
);

router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  deleteResource
);

export default router;
```

#### server/src/middleware/errorHandler.js

```javascript
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Database errors
  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Duplicate entry',
      message: 'A resource with this information already exists'
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Invalid reference',
      message: 'Referenced resource does not exist'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.details
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      message: 'Authentication token is invalid'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
      message: 'Authentication token has expired'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
```

**Deliverables:**
- ✅ Working API running locally
- ✅ Database with all 38 resources migrated
- ✅ Postman/Thunder Client collection for testing
- ✅ Basic error handling and validation

---

### Phase 2: Frontend Integration (Week 2-3)

**Tasks:**
- [ ] Create API client service in frontend
- [ ] Replace JSON imports with API calls
- [ ] Update components to use async data fetching
- [ ] Add loading states and error handling
- [ ] Implement pagination for resource list
- [ ] Update filtering to work with API
- [ ] Add search functionality via API
- [ ] Update tests for new data fetching

**Code Examples:**

#### client/src/services/api.js

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.error || 'Request failed',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error', 0, { message: error.message });
  }
}

export const resourcesAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.county) params.append('county', filters.county);
    if (filters.service) params.append('service', filters.service);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const query = params.toString();
    return fetchAPI(`/resources${query ? `?${query}` : ''}`);
  },

  getById: async (id) => {
    return fetchAPI(`/resources/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/resources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/resources/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return fetchAPI(`/resources/${id}`, {
      method: 'DELETE',
    });
  },

  search: async (query) => {
    return fetchAPI(`/resources/search?q=${encodeURIComponent(query)}`);
  },

  nearby: async (lat, lng, radius = 5) => {
    return fetchAPI(`/resources/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  },
};

export const authAPI = {
  register: async (email, password, name) => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  login: async (email, password) => {
    const data = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }

    return data;
  },

  logout: async () => {
    await fetchAPI('/auth/logout', { method: 'POST' });
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: async () => {
    return fetchAPI('/auth/me');
  },
};

export const favoritesAPI = {
  getAll: async () => {
    return fetchAPI('/favorites');
  },

  add: async (resourceId) => {
    return fetchAPI(`/favorites/${resourceId}`, {
      method: 'POST',
    });
  },

  remove: async (resourceId) => {
    return fetchAPI(`/favorites/${resourceId}`, {
      method: 'DELETE',
    });
  },
};
```

#### client/src/hooks/useResources.js

```javascript
import { useState, useEffect } from 'react';
import { resourcesAPI } from '../services/api';

export function useResources(filters = {}) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await resourcesAPI.getAll(filters);
        setResources(data.data);
        setPagination({
          page: data.page,
          totalPages: data.totalPages,
          total: data.total,
        });
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch resources:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  return { resources, loading, error, pagination };
}
```

#### client/src/components/FoodResources.jsx (Updated)

```javascript
import { useState } from 'react';
import { useResources } from '../hooks/useResources';
import '../styles/FoodResources.scss';

export default function FoodResources() {
  const [filters, setFilters] = useState({
    county: '',
    service: '',
    page: 1,
    limit: 20,
  });

  const { resources, loading, error, pagination } = useResources(filters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (loading) {
    return (
      <div className="food-resources">
        <div className="food-resources__loading">
          <p>Loading food resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="food-resources">
        <div className="food-resources__error">
          <p>Error loading resources: {error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="food-resources">
      {/* Filters */}
      <div className="food-resources__filters">
        <select
          value={filters.county}
          onChange={(e) => handleFilterChange('county', e.target.value)}
        >
          <option value="">All Counties</option>
          <option value="Fulton">Fulton</option>
          <option value="DeKalb">DeKalb</option>
          {/* ... more counties */}
        </select>

        <select
          value={filters.service}
          onChange={(e) => handleFilterChange('service', e.target.value)}
        >
          <option value="">All Services</option>
          <option value="Food Pantry">Food Pantry</option>
          <option value="Free Meals">Free Meals</option>
          {/* ... more services */}
        </select>
      </div>

      {/* Resources List */}
      <div className="food-resources__list">
        <p className="food-resources__count">
          Showing {resources.length} of {pagination.total} resources
        </p>

        {resources.map(resource => (
          <div key={resource.id} className="food-resources__card">
            <h3>{resource.name}</h3>
            <p>{resource.address}, {resource.city}</p>
            <p>{resource.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="food-resources__pagination">
          <button
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Previous
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
```

---

### Phase 3: User Authentication (Week 3-4)

**Tasks:**
- [ ] Implement JWT authentication
- [ ] Create user registration/login endpoints
- [ ] Add auth middleware
- [ ] Update frontend with auth context
- [ ] Create login/signup UI components
- [ ] Migrate localStorage favorites to database
- [ ] Add protected routes
- [ ] Implement role-based access control

**Code Examples:**

#### server/src/middleware/auth.js

```javascript
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, JWT_SECRET);

    // Get fresh user data from database
    const result = await query(
      'SELECT id, email, name, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    next(error);
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to perform this action'
      });
    }

    next();
  };
};
```

#### server/src/controllers/authController.js

```javascript
import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';
import { generateToken } from '../middleware/auth.js';

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const existingUser = await query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  );

  if (existingUser.rows.length > 0) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const result = await query(`
    INSERT INTO users (email, password_hash, name, role)
    VALUES ($1, $2, $3, 'user')
    RETURNING id, email, name, role, created_at
  `, [email, passwordHash, name]);

  const user = result.rows[0];
  const token = generateToken(user);

  res.status(201).json({ user, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Get user
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = result.rows[0];

  // Verify password
  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Update last login
  await query(
    'UPDATE users SET last_login = NOW() WHERE id = $1',
    [user.id]
  );

  const token = generateToken(user);

  // Don't send password hash to client
  delete user.password_hash;

  res.json({ user, token });
};

export const getCurrentUser = async (req, res) => {
  res.json({ user: req.user });
};

export const logout = async (req, res) => {
  // In a JWT system, logout is typically handled client-side
  // by removing the token. However, you could implement a
  // token blacklist here if needed.
  res.json({ message: 'Logged out successfully' });
};
```

#### client/src/context/AuthContext.jsx

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const data = await authAPI.getCurrentUser();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (email, password, name) => {
    const data = await authAPI.register(email, password, name);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

### Phase 4: Enhanced Features (Week 4-5)

**Tasks:**
- [ ] Build contribution submission system
- [ ] Create admin dashboard for approving contributions
- [ ] Add email notifications (optional)
- [ ] Implement resource verification workflow
- [ ] Add data validation and sanitization
- [ ] Optimize queries with indexes
- [ ] Add caching layer (Redis optional)
- [ ] Implement rate limiting

---

### Phase 5: Vercel Deployment (Week 5-6)

**Tasks:**
- [ ] Configure Vercel project
- [ ] Set up Vercel Postgres database
- [ ] Configure environment variables
- [ ] Set up API routes in Vercel
- [ ] Configure CORS for production
- [ ] Run database migrations in production
- [ ] Update frontend to use production API
- [ ] Set up CI/CD with GitHub Actions
- [ ] Configure custom domain
- [ ] Set up monitoring and logging

---

## Vercel Configuration

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server/src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/src/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Environment Variables (.env.example)

```bash
# Database
POSTGRES_URL="postgresql://user:password@host:5432/database"
POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/database?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host:5432/database"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# Client
VITE_API_URL="http://localhost:3000/api"

# CORS
CLIENT_URL="http://localhost:5173"
```

### Vercel Setup Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Create Postgres database
vercel postgres create food-resources-db

# Get database connection string
vercel env pull .env

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Security Considerations

### 1. Environment Variables
- ✅ Never commit `.env` files to git
- ✅ Use `.env.example` as template
- ✅ Store secrets in Vercel environment variables

### 2. SQL Injection Prevention
- ✅ Use parameterized queries (pg library handles this)
- ✅ Never concatenate user input into SQL strings

```javascript
// ✅ GOOD - Parameterized
query('SELECT * FROM users WHERE email = $1', [email]);

// ❌ BAD - String concatenation
query(`SELECT * FROM users WHERE email = '${email}'`);
```

### 3. Authentication Security
- ✅ Hash passwords with bcrypt (salt rounds ≥ 10)
- ✅ Use JWT with secure secret
- ✅ Implement token expiration
- ✅ Use httpOnly cookies for tokens (alternative to localStorage)

### 4. CORS Configuration
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 5. Rate Limiting
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

app.use('/api/', limiter);
```

### 6. Input Validation
```javascript
import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }

  next();
};
```

### 7. Helmet for HTTP Headers
```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

---

## Migration Strategy

### Option A: Gradual Migration (Recommended)

**Week 1-2:**
- Build backend in parallel with current frontend
- Deploy backend to Vercel staging

**Week 3:**
- Create feature flag in frontend
- Implement API integration alongside JSON
- Test with both data sources

**Week 4:**
- Deploy to production with feature flag off
- Monitor for issues
- Enable feature flag for 10% of users

**Week 5:**
- Gradually increase to 50%, then 100%
- Monitor performance and errors
- Keep JSON as backup

**Week 6:**
- Remove JSON data and feature flag
- Clean up old code

### Option B: Big Bang Migration

**Week 1-4:**
- Build entire backend
- Fully integrate frontend
- Thorough testing

**Week 5:**
- Deploy everything at once
- Immediate cutover
- Higher risk of issues

**Recommendation:** Use Option A for safer migration

---

## Testing Strategy

### Backend Tests (Jest + Supertest)

```javascript
// server/src/__tests__/resources.test.js
import request from 'supertest';
import app from '../server.js';
import pool from '../config/database.js';

describe('Resources API', () => {
  beforeAll(async () => {
    // Setup test database
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('GET /api/resources', () => {
    it('should return all resources', async () => {
      const response = await request(app)
        .get('/api/resources')
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.total).toBeGreaterThan(0);
    });

    it('should filter by county', async () => {
      const response = await request(app)
        .get('/api/resources?county=Fulton')
        .expect(200);

      expect(response.body.data.every(r => r.county === 'Fulton')).toBe(true);
    });
  });

  describe('POST /api/resources', () => {
    it('should create a resource with auth', async () => {
      const token = 'valid-jwt-token'; // Generate in beforeAll

      const newResource = {
        name: 'Test Food Bank',
        address: '123 Test St',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30303',
        county: 'Fulton',
        latitude: 33.7490,
        longitude: -84.3880
      };

      const response = await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${token}`)
        .send(newResource)
        .expect(201);

      expect(response.body.name).toBe('Test Food Bank');
    });

    it('should reject without auth', async () => {
      const response = await request(app)
        .post('/api/resources')
        .send({ name: 'Test' })
        .expect(401);
    });
  });
});
```

### Frontend Tests (Vitest + React Testing Library)

```javascript
// client/src/__tests__/FoodResources.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import FoodResources from '../components/FoodResources';
import * as api from '../services/api';

vi.mock('../services/api');

describe('FoodResources Component', () => {
  it('shows loading state initially', () => {
    api.resourcesAPI.getAll.mockReturnValue(new Promise(() => {}));

    render(<FoodResources />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays resources after loading', async () => {
    const mockData = {
      data: [
        { id: 1, name: 'Test Food Bank', address: '123 St' }
      ],
      total: 1,
      page: 1,
      totalPages: 1
    };

    api.resourcesAPI.getAll.mockResolvedValue(mockData);

    render(<FoodResources />);

    await waitFor(() => {
      expect(screen.getByText('Test Food Bank')).toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    api.resourcesAPI.getAll.mockRejectedValue(new Error('Network error'));

    render(<FoodResources />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

---

## Cost Estimation

### Vercel Hobby Plan (Free)
**Good for:** Development and low-traffic production

**Limits:**
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless function execution
- ✅ Vercel Postgres: 256 MB storage, 60 hours compute/month

**Expected costs:** $0/month for initial launch

### Vercel Pro Plan ($20/month)
**Good for:** Production with moderate traffic

**Benefits:**
- ✅ 1 TB bandwidth/month
- ✅ 1000 GB-hours function execution
- ✅ Larger Postgres limits
- ✅ Custom domains
- ✅ Analytics

**Expected costs:** $20/month

### Neon Postgres (Alternative)
**Free Tier:**
- ✅ 10 GB storage
- ✅ 100 hours compute/month
- ✅ Branching for development

**Expected costs:** $0/month initially, ~$19/month for scale

---

## Performance Optimizations

### 1. Database Indexes
```sql
CREATE INDEX idx_county ON food_resources(county);
CREATE INDEX idx_zip_code ON food_resources(zip_code);
CREATE INDEX idx_location ON food_resources USING GIST(point(longitude, latitude));
```

### 2. Query Optimization
- ✅ SELECT only needed fields
- ✅ Use EXPLAIN ANALYZE to find slow queries
- ✅ Implement pagination (LIMIT/OFFSET)

### 3. Caching (Optional - Redis)
```javascript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache resources for 5 minutes
export const getCachedResources = async (filters) => {
  const cacheKey = `resources:${JSON.stringify(filters)}`;

  // Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch from database
  const data = await Resource.findAll(filters);

  // Store in cache
  await redis.setex(cacheKey, 300, JSON.stringify(data));

  return data;
};
```

### 4. Connection Pooling
```javascript
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### 5. Compression
```javascript
import compression from 'compression';

app.use(compression());
```

### 6. CDN for Static Assets
- ✅ Vercel provides global CDN automatically
- ✅ Cache static assets with long TTL

---

## Next Steps / Decision Points

### Questions for Planning:

1. **Repository Structure**
   - [ ] Monorepo (one repository for frontend + backend)
   - [ ] Separate repos (two independent repositories)

2. **Authentication Timeline**
   - [ ] Phase 1 (implement early)
   - [ ] Phase 3 (implement after basic API)

3. **Admin Features Priority**
   - [ ] High priority (implement early)
   - [ ] Low priority (implement later)

4. **Database Provider**
   - [ ] Vercel Postgres (easy integration)
   - [ ] Neon (generous free tier)
   - [ ] Railway/Render (more control)

5. **Migration Timeline**
   - [ ] 6 weeks (as planned)
   - [ ] Faster (4 weeks)
   - [ ] Slower (8-10 weeks)

6. **JSON Backup**
   - [ ] Keep JSON as backup/export
   - [ ] Remove entirely after migration

7. **Testing Coverage**
   - [ ] High (unit + integration + e2e)
   - [ ] Medium (unit + integration)
   - [ ] Basic (unit only)

---

## Resources & Documentation

### Official Documentation
- **Express.js:** https://expressjs.com/
- **PostgreSQL:** https://www.postgresql.org/docs/
- **node-postgres:** https://node-postgres.com/
- **Vercel:** https://vercel.com/docs
- **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres
- **JWT:** https://jwt.io/
- **bcrypt:** https://github.com/kelektiv/node.bcrypt.js

### Best Practices
- **REST API Design:** https://restfulapi.net/
- **Database Design:** https://www.postgresqltutorial.com/
- **Security:** https://cheatsheetseries.owasp.org/

### Tools
- **Postman:** https://www.postman.com/ (API testing)
- **TablePlus:** https://tableplus.com/ (Database GUI)
- **Vercel CLI:** https://vercel.com/docs/cli

---

## Summary

This migration plan provides a comprehensive roadmap to transform the Atlanta Food Resources app from a static frontend application to a full-stack solution with:

- ✅ Express.js backend API
- ✅ PostgreSQL database
- ✅ User authentication & authorization
- ✅ Admin dashboard
- ✅ Community contributions
- ✅ Vercel hosting (serverless)

The phased approach ensures a smooth migration with minimal downtime and risk.

**Estimated Timeline:** 5-6 weeks
**Estimated Cost:** $0-20/month initially

---

**Next Action:** Review this plan and decide on the key decision points above to begin Phase 1 implementation.
