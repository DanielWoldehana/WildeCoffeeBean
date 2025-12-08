# Wild Bean Coffee - MERN Stack Website

A modern, mobile-friendly website for Wild Bean Coffee cafe built with the MERN stack (MongoDB, Express.js, React.js, Node.js) using Next.js.

## Quickstart

### Client (Frontend)
```bash
cd client
npm install
cp env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

### Server (Backend)
```bash
cd server
npm install
cp env.example .env
# Edit .env with your MongoDB Atlas URI and other config
npm run dev
```

### Seed Database
```bash
cd server
npm run seed
```

## Environment Variables

### Client (`client/.env.local`)
- `NEXT_PUBLIC_API_URL=http://localhost:4000`

### Server (`server/.env`)
- `PORT=4000`
- `MONGODB_URI=mongodb+srv://...` (MongoDB Atlas connection string)
- `MONGO_MAX_RETRIES=5`
- `MONGO_RETRY_DELAY_MS=1000`
- `CORS_ORIGIN=http://localhost:3000,*` (comma-separated)
- `CLOVER_API_KEY=` (for future payment integration)
- `CLOVER_MERCHANT_ID=`
- `CLOVER_WEBHOOK_SECRET=`

## Tooling

- **Frontend**: Next.js 15+ (App Router, React Compiler, Tailwind CSS)
- **Backend**: Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Animations**: Framer Motion
- **Maps**: Pigeon Maps

## MongoDB Usage

The project uses MongoDB Atlas. See `server/env.example` for connection string format.

## API Endpoints

See `docs/api-endpoints.md` for complete API documentation.

---

## Kanban Backlog

### ✅ Completed

#### Foundation
- ✅ **[Foundation] Initialize Repo Structure** - Set up client/server separation, Next.js app with App Router
- ✅ **[Foundation] Env & Secrets Setup** - Environment variable templates and configuration
- ✅ **[Foundation] Dev Tooling & Scripts** - Nodemon, scripts, and development setup

#### Backend
- ✅ **[BACKEND] Express Scaffold** - Express server with middleware (CORS, Helmet, Morgan)
- ✅ **[BACKEND] MongoDB Connection** - Mongoose connection with retry/backoff logic
- ✅ **[BACKEND] Data Models** - Product, MenuItem, Order, Location schemas
- ✅ **[BACKEND] Catalog Endpoints** - GET `/api/products` with filtering
- ✅ **[BACKEND] Menu Endpoints** - GET `/api/menu` with filtering
- ✅ **[BACKEND] Order Endpoints** - POST `/api/orders`, GET `/api/orders/:id`, PATCH `/api/orders/:id/status`
- ✅ **[BACKEND] Seed Script** - Database seeding with sample products, menu items, location
- ✅ **[BACKEND] Validation Layer** - Input validation utilities

#### Maps
- ✅ **[MAPS] Location Endpoint** - GET `/api/location` for store info
- ✅ **[MAPS] User Geolocation Flow** - POST `/api/location/distance` for distance calculation
- ✅ **[MAPS] Map Component** - Interactive map with store location and user location

#### Frontend
- ✅ **[FRONTEND] Theme & Layout** - Brand colors, Nav, Footer components
- ✅ **[FRONTEND] Animated Home Page** - Hero section with Framer Motion animations
- ✅ **[FRONTEND] Shop Page** - Product listing with filters, search, cart functionality, product modals
- ✅ **[FRONTEND] Menu Page** - Menu items grouped by section, allergen info, cart functionality, item modals
- ✅ **[FRONTEND] Order Page** - Checkout flow with customer info, pickup time picker, order submission

---

### 📋 Pending

#### Frontend
- ✅ **[FRONTEND] Reusable Components** - Extract shared components (buttons, cards, modals, quantity controls)
- ✅ **[FRONTEND] API Client Hooks/Services** - Centralize API calls with custom hooks/services

#### Authentication
- ⏳ **[AUTH] Auth Decision & Scope** - Decide if user authentication is needed (accounts, order history, etc.)
- ⏳ **[AUTH] User Auth (If chosen)** - Implement authentication system if needed

#### Monitoring & Admin
- ⏳ **[Monitoring] Admin Inventory/Menu Management** - Admin interface to manage products and menu items
- ⏳ **[Monitoring] Order Ops Dashboard** - Dashboard for viewing and managing orders
- ⏳ **[Monitoring] Logging & Error Reporting** - Error tracking and logging system
- ⏳ **[Monitoring] Rate Limiting** - API rate limiting for security

#### Testing
- ⏳ **[TESTING] Backend Tests** - Unit and integration tests for API endpoints
- ⏳ **[TESTING] Frontend Tests** - Component and integration tests
- ⏳ **[TESTING] Integration Smoke** - End-to-end smoke tests

#### Deployment
- ⏳ **[DEPLOY] Hosting & Infra** - Deploy client and server to hosting platform
- ⏳ **[DEPLOY] CI/CD Pipeline** - Automated testing and deployment pipeline
- ⏳ **[DEPLOY] Domain & SSL** - Set up custom domain and HTTPS

#### Payments (Deferred)
- ⏳ **[PAYMENTS] Clover Integration** - Payment processing integration (deferred to future)

---

## Notes

- Payment processing is deferred - orders are created with `paymentStatus: "pending"` and payment is handled at pickup
- All images should be placed in `client/public/images/` with appropriate folder structure
- See `docs/api-endpoints.md` for API documentation
