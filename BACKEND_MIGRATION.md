# Backend Migration Plan: PostgreSQL + Express on Vercel

This document outlines the migration from a static JSON-based architecture to a dynamic backend using PostgreSQL and Express.js, deployed on Vercel's serverless platform.

## Table of Contents
1. [Overview](#overview)
2. [Architecture Changes](#architecture-changes)
3. [Technology Stack](#technology-stack)
4. [Database Design](#database-design)
5. [API Design](#api-design)
6. [Vercel Serverless Functions](#vercel-serverless-functions)
7. [Migration Steps](#migration-steps)
8. [Environment Configuration](#environment-configuration)
9. [Testing Strategy](#testing-strategy)
10. [Rollback Plan](#rollback-plan)

---

## Overview

### Why Migrate?

**Current Architecture (Static JSON):**
- ✅ Fast, simple, no backend costs
- ✅ Easy to deploy and maintain
- ❌ No user-contributed data
- ❌ No real-time updates
- ❌ Manual data updates via GitHub
- ❌ No analytics or usage tracking
- ❌ No admin interface for managing resources

**Future Architecture (PostgreSQL + Express):**
- ✅ Dynamic CRUD operations
- ✅ User contributions and reviews
- ✅ Real-time data updates
- ✅ Admin dashboard for content management
- ✅ Usage analytics and reporting
- ✅ API for third-party integrations
- ✅ Still free on Vercel (generous limits)

### Migration Goals

1. **Maintain Current Functionality**: All existing features continue to work
2. **Enable CRUD Operations**: Create, Read, Update, Delete food resources
3. **Zero Downtime**: Gradual migration with fallback to static data
4. **Admin Interface**: Dashboard for managing resources
5. **API-First**: RESTful API for future mobile apps and integrations

---

## Architecture Changes

### Before: Static JSON Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel CDN                            │
│  ┌────────────────────────────────────────────────┐    │
│  │         React SPA (Static Build)               │    │
│  │  ┌──────────────────────────────────────────┐  │    │
│  │  │   foodResources.json (125 resources)     │  │    │
│  │  │   Bundled at build time                  │  │    │
│  │  └──────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### After: PostgreSQL + Express Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vercel Platform                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────┐    ┌──────────────────────────┐   │
│  │   React SPA (Static)    │    │  Serverless Functions    │   │
│  │   • Home                │    │  • /api/resources        │   │
│  │   • FoodResources       │────▶  • /api/resources/:id   │   │
│  │   • MapView             │    │  • /api/admin/*          │   │
│  │   (Deployed to CDN)     │    │  • /api/analytics/*      │   │
│  └─────────────────────────┘    └──────────┬───────────────┘   │
│                                             │                    │
└─────────────────────────────────────────────┼────────────────────┘
                                              │
                                              ▼
                            ┌──────────────────────────────────┐
                            │   PostgreSQL Database            │
                            │   (Vercel Postgres / Supabase)   │
                            │                                  │
                            │  Tables:                         │
                            │  • food_resources                │
                            │  • counties                      │
                            │  • service_types                 │
                            │  • resource_services (join)      │
                            │  • reviews (future)              │
                            │  • analytics (future)            │
                            └──────────────────────────────────┘
```

---

## Technology Stack

### Frontend (No Changes)
- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool
- **React Router 7.9.5** - Client-side routing
- **Leaflet + React Leaflet** - Mapping
- **SCSS/Sass** - Styling

### Backend (New)
- **Express.js** - Web framework for API routes
- **PostgreSQL** - Relational database
- **Vercel Serverless Functions** - Backend hosting
- **Vercel Postgres** or **Supabase** - Managed PostgreSQL
- **node-postgres (pg)** - PostgreSQL client for Node.js
- **dotenv** - Environment variable management

### Additional Libraries
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing
- **compression** - Response compression
- **morgan** - HTTP request logging

---

## Database Design

### Schema Overview

```sql
-- Counties lookup table
CREATE TABLE counties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service types lookup table
CREATE TABLE service_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Main food resources table
CREATE TABLE food_resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL DEFAULT 'GA',
  zip_code VARCHAR(10) NOT NULL,
  county_id INTEGER REFERENCES counties(id),
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  phone VARCHAR(20) NOT NULL,
  website VARCHAR(500),
  description TEXT NOT NULL,
  hours TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for many-to-many relationship
CREATE TABLE resource_services (
  resource_id INTEGER REFERENCES food_resources(id) ON DELETE CASCADE,
  service_type_id INTEGER REFERENCES service_types(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, service_type_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_food_resources_county ON food_resources(county_id);
CREATE INDEX idx_food_resources_zip ON food_resources(zip_code);
CREATE INDEX idx_food_resources_active ON food_resources(is_active);
CREATE INDEX idx_food_resources_location ON food_resources(latitude, longitude);
CREATE INDEX idx_resource_services_resource ON resource_services(resource_id);
CREATE INDEX idx_resource_services_service ON resource_services(service_type_id);

-- Full-text search index
CREATE INDEX idx_food_resources_search ON food_resources
  USING gin(to_tsvector('english', name || ' ' || description || ' ' || address));
```

### Seed Data Migration

The existing 125 resources from `foodResources.json` will be migrated to PostgreSQL:

```sql
-- Example: Insert a food resource
INSERT INTO food_resources (
  name, address, city, state, zip_code, county_id,
  latitude, longitude, phone, website, description, hours
) VALUES (
  'Atlanta Community Food Bank',
  '732 Joseph E Lowery Blvd NW',
  'Atlanta',
  'GA',
  '30318',
  (SELECT id FROM counties WHERE name = 'Fulton'),
  33.7629,
  -84.4283,
  '(404) 892-9822',
  'https://www.acfb.org',
  'Provides food assistance through a network of partner agencies.',
  'Monday-Friday: 8:00 AM - 5:00 PM'
);

-- Insert associated services
INSERT INTO resource_services (resource_id, service_type_id)
SELECT
  currval('food_resources_id_seq'),
  id
FROM service_types
WHERE name IN ('Food Pantry', 'Mobile Pantry', 'Partner Network');
```

---

## API Design

### RESTful API Endpoints

#### **Public Endpoints** (No Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/resources` | Get all active food resources |
| `GET` | `/api/resources?county=Fulton` | Filter by county |
| `GET` | `/api/resources?zip=30318` | Filter by zip code |
| `GET` | `/api/resources?services=Food%20Pantry` | Filter by service type |
| `GET` | `/api/resources?search=atlanta` | Full-text search |
| `GET` | `/api/resources/:id` | Get specific resource by ID |
| `GET` | `/api/counties` | Get list of all counties |
| `GET` | `/api/service-types` | Get list of all service types |
| `GET` | `/api/service-types/categories` | Get services grouped by category |

#### **Admin Endpoints** (Authentication Required - Future)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/resources` | Create new food resource |
| `PUT` | `/api/admin/resources/:id` | Update existing resource |
| `DELETE` | `/api/admin/resources/:id` | Soft delete resource (set is_active=false) |
| `POST` | `/api/admin/resources/:id/activate` | Reactivate a deleted resource |

### Request/Response Examples

#### GET /api/resources

**Request:**
```bash
GET /api/resources?county=Fulton&services=Food%20Pantry&limit=10&offset=0
```

**Response:**
```json
{
  "success": true,
  "data": {
    "resources": [
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
        "hours": "Monday-Friday: 8:00 AM - 5:00 PM",
        "isActive": true,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 38,
    "limit": 10,
    "offset": 0
  }
}
```

#### POST /api/admin/resources (Future)

**Request:**
```json
{
  "name": "New Food Pantry",
  "address": "123 Main St",
  "city": "Atlanta",
  "state": "GA",
  "zipCode": "30303",
  "county": "Fulton",
  "latitude": 33.7490,
  "longitude": -84.3880,
  "phone": "(404) 555-1234",
  "website": "https://example.org",
  "description": "Community food pantry serving...",
  "services": ["Food Pantry", "Emergency Food"],
  "hours": "Monday-Friday: 9:00 AM - 5:00 PM"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 126,
    "message": "Resource created successfully"
  }
}
```

---

## Vercel Serverless Functions

### Directory Structure

```
food-search-2025/
├── api/                           # Vercel serverless functions
│   ├── resources/
│   │   ├── index.js              # GET /api/resources
│   │   └── [id].js               # GET /api/resources/:id
│   ├── counties.js               # GET /api/counties
│   ├── service-types.js          # GET /api/service-types
│   └── admin/                    # Future admin endpoints
│       └── resources/
│           ├── create.js         # POST /api/admin/resources
│           └── [id].js           # PUT/DELETE /api/admin/resources/:id
├── lib/                          # Shared backend code
│   ├── db.js                     # Database connection
│   ├── queries.js                # SQL queries
│   ├── validators.js             # Input validation
│   └── utils.js                  # Helper functions
├── migrations/                   # Database migrations
│   ├── 001_initial_schema.sql
│   ├── 002_seed_counties.sql
│   ├── 003_seed_service_types.sql
│   └── 004_migrate_resources.sql
└── src/                          # Frontend (existing)
    └── ...
```

### Example Serverless Function

**File: `api/resources/index.js`**

```javascript
import { query } from '../../lib/db';
import { validateResourceQuery } from '../../lib/validators';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate and parse query parameters
    const { county, zip, services, search, limit = 100, offset = 0 } = req.query;

    // Build SQL query dynamically
    let sql = `
      SELECT
        r.id,
        r.name,
        r.address,
        r.city,
        r.state,
        r.zip_code as "zipCode",
        c.name as county,
        r.latitude,
        r.longitude,
        r.phone,
        r.website,
        r.description,
        r.hours,
        r.is_active as "isActive",
        array_agg(st.name) as services
      FROM food_resources r
      JOIN counties c ON r.county_id = c.id
      LEFT JOIN resource_services rs ON r.id = rs.resource_id
      LEFT JOIN service_types st ON rs.service_type_id = st.id
      WHERE r.is_active = true
    `;

    const params = [];
    let paramIndex = 1;

    // Add filters
    if (county) {
      sql += ` AND c.name = $${paramIndex++}`;
      params.push(county);
    }

    if (zip) {
      sql += ` AND r.zip_code = $${paramIndex++}`;
      params.push(zip);
    }

    if (search) {
      sql += ` AND to_tsvector('english', r.name || ' ' || r.description) @@ plainto_tsquery('english', $${paramIndex++})`;
      params.push(search);
    }

    sql += `
      GROUP BY r.id, c.name
      ORDER BY r.name
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;

    params.push(parseInt(limit), parseInt(offset));

    // Execute query
    const result = await query(sql, params);

    // Get total count
    const countResult = await query(
      'SELECT COUNT(*) as total FROM food_resources WHERE is_active = true'
    );

    return res.status(200).json({
      success: true,
      data: {
        resources: result.rows,
        total: parseInt(countResult.rows[0].total),
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });

  } catch (error) {
    console.error('Error fetching resources:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
```

**File: `lib/db.js`**

```javascript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

export default pool;
```

---

## Migration Steps

### Phase 1: Setup Database (Week 1)

1. **Choose Database Provider**
   - Option A: **Vercel Postgres** (easiest, integrated with Vercel)
   - Option B: **Supabase** (more features, free tier, open-source)
   - Option C: **Neon** (serverless Postgres, generous free tier)

2. **Create Database Instance**
   ```bash
   # For Vercel Postgres
   vercel postgres create

   # Or use Supabase dashboard
   # https://app.supabase.com/
   ```

3. **Run Schema Migrations**
   ```bash
   # Connect to database
   psql $POSTGRES_URL

   # Run migrations
   \i migrations/001_initial_schema.sql
   \i migrations/002_seed_counties.sql
   \i migrations/003_seed_service_types.sql
   ```

4. **Migrate Existing Data**
   ```bash
   # Run data migration script
   node scripts/migrate-json-to-postgres.js
   ```

### Phase 2: Build API (Week 2)

1. **Install Dependencies**
   ```bash
   npm install pg express express-validator helmet cors compression morgan
   npm install --save-dev @types/pg
   ```

2. **Create API Routes**
   - Implement `/api/resources` endpoint
   - Implement `/api/resources/:id` endpoint
   - Implement `/api/counties` endpoint
   - Implement `/api/service-types` endpoint

3. **Test API Locally**
   ```bash
   vercel dev  # Test serverless functions locally
   ```

### Phase 3: Frontend Integration (Week 3)

1. **Create API Client**
   ```javascript
   // src/lib/api.js
   const API_BASE_URL = import.meta.env.PROD
     ? '/api'
     : 'http://localhost:3000/api';

   export async function fetchResources(filters = {}) {
     const params = new URLSearchParams(filters);
     const response = await fetch(`${API_BASE_URL}/resources?${params}`);
     if (!response.ok) throw new Error('Failed to fetch resources');
     return response.json();
   }
   ```

2. **Update FoodResources Component**
   ```javascript
   // Replace static import with API call
   const [resources, setResources] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     async function loadResources() {
       try {
         const data = await fetchResources({ county, zip, services });
         setResources(data.resources);
       } catch (error) {
         console.error('Failed to load resources:', error);
         // Fallback to static JSON
         setResources(foodResourcesData);
       } finally {
         setLoading(false);
       }
     }
     loadResources();
   }, [county, zip, services]);
   ```

3. **Add Loading States**
   - Loading spinner while fetching
   - Error handling with fallback
   - Optimistic UI updates

### Phase 4: Deployment & Testing (Week 4)

1. **Set Environment Variables in Vercel**
   ```bash
   vercel env add POSTGRES_URL
   vercel env add POSTGRES_PRISMA_URL
   vercel env add POSTGRES_URL_NON_POOLING
   ```

2. **Deploy to Vercel**
   ```bash
   git push origin main
   # Vercel auto-deploys
   ```

3. **Run Integration Tests**
   - Test all API endpoints
   - Test frontend integration
   - Test error handling and fallbacks
   - Load testing with k6 or Artillery

4. **Monitor Performance**
   - Vercel Analytics for function performance
   - Database query performance monitoring
   - Error tracking with Sentry (optional)

---

## Environment Configuration

### Required Environment Variables

```bash
# Database Connection (Vercel Postgres)
POSTGRES_URL="postgres://username:password@host:5432/database"
POSTGRES_PRISMA_URL="postgres://username:password@host:5432/database?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgres://username:password@host:5432/database"

# Or for Supabase
POSTGRES_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Optional: Admin API Authentication (Future)
ADMIN_API_KEY="your-secret-key"
JWT_SECRET="your-jwt-secret"
```

### Vercel Configuration Update

**File: `vercel.json`**

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "POSTGRES_URL": "@postgres_url",
    "POSTGRES_PRISMA_URL": "@postgres_prisma_url",
    "POSTGRES_URL_NON_POOLING": "@postgres_url_non_pooling"
  }
}
```

---

## Testing Strategy

### Unit Tests
```javascript
// tests/api/resources.test.js
import { GET } from '../../api/resources';

describe('GET /api/resources', () => {
  it('should return all active resources', async () => {
    const req = { method: 'GET', query: {} };
    const res = mockResponse();

    await GET(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: expect.objectContaining({
        resources: expect.any(Array)
      })
    });
  });
});
```

### Integration Tests
```bash
# Test API endpoints
curl https://food-search-2025.vercel.app/api/resources
curl https://food-search-2025.vercel.app/api/resources?county=Fulton
curl https://food-search-2025.vercel.app/api/resources/1
```

---

## Rollback Plan

### If Migration Fails

1. **Keep Static JSON as Fallback**
   ```javascript
   // Frontend can fallback to static JSON
   try {
     const data = await fetchFromAPI();
     setResources(data);
   } catch (error) {
     console.warn('API failed, using static data');
     setResources(staticFoodResourcesData);
   }
   ```

2. **Feature Flag**
   ```javascript
   const USE_API = import.meta.env.VITE_USE_API === 'true';

   const resources = USE_API
     ? await fetchFromAPI()
     : staticFoodResourcesData;
   ```

3. **Gradual Rollout**
   - Deploy API but keep frontend using static data
   - Test API thoroughly in production
   - Switch frontend to API when confident
   - Monitor error rates and performance

---

## Cost Estimation

### Vercel (Free Tier)
- **Bandwidth**: 100 GB/month (plenty for this app)
- **Function Invocations**: 100,000/month
- **Function Duration**: 100 hours/month
- **Estimated Cost**: **$0/month** (within free tier)

### Database Options

| Provider | Free Tier | Paid Plans Start At |
|----------|-----------|---------------------|
| **Vercel Postgres** | 256 MB, 60 hours compute | $20/month |
| **Supabase** | 500 MB, unlimited API requests | $25/month |
| **Neon** | 3 GB, 100 hours compute | $19/month |

**Recommendation**: Start with **Supabase** or **Neon** free tier, upgrade if needed.

---

## Timeline

| Week | Tasks | Status |
|------|-------|--------|
| **Week 1** | Database setup, schema design, data migration | 📋 Planned |
| **Week 2** | API development, serverless functions | 📋 Planned |
| **Week 3** | Frontend integration, loading states | 📋 Planned |
| **Week 4** | Testing, deployment, monitoring | 📋 Planned |

---

## Next Steps

1. **Choose Database Provider** (Supabase recommended)
2. **Review and Approve Schema Design**
3. **Set up Development Database**
4. **Begin API Development**

---

## Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node Postgres (pg)](https://node-postgres.com/)

---

**Questions or Need Help?**
Open an issue in the GitHub repository or contact: info@kolorkodestudios.com
