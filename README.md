# Wild Coffee Bean Project Tasks

## Structure & Quickstart
- Client (Next.js): `cd client && npm install && npm run dev` (default http://localhost:3000)
- Server (Express placeholder): `cd server && npm install && npm run dev` (default http://localhost:4000)
- Folders: `client/` for the Next.js app, `server/` for the Express API scaffold.
- Tasks below track backlog progress; tick `[ ]` to `[x]` as you complete items.
- Env samples: copy `client/env.example` → `client/.env.local` (or `.env`) and `server/env.example` → `server/.env` and adjust values.
- Tooling: server dev uses `nodemon`; client lint via `npm run lint`; format via `npm run format`.
- MongoDB: use an Atlas SRV string for `MONGODB_URI` (no local fallback).
- API Endpoint Log: see `docs/api-endpoints.md` for a categorized list of routes.

Kanban-ready backlog with titles, descriptions, and acceptance criteria. Check items as you complete them.

## Foundation
- [x] [Foundation] Initialize Repo Structure  
  Description: Organize `client/` (Next.js) and `server/` (Express) with shared scripts.  
  AC: Repo has client/server folders; npm scripts runnable; README notes structure.
- [x] [Foundation] Env & Secrets Setup  
  Description: Add `.env` handling for client/server and sample env files.  
  AC: `.env.example` exists; apps load env vars via dotenv/next config; secrets ignored by git.
- [x] [Foundation] Dev Tooling & Scripts  
  Description: Add nodemon for API, lint/format scripts, Next proxy/rewrites for API.  
  AC: `npm run dev` works for both apps; API auto-reloads; lint/format scripts succeed.

## Backend (Express + MongoDB/Mongoose)
- [x] [BACKEND] Express Scaffold  
  Description: Create Express server with CORS, helmet, logging, error handler, health check.  
  AC: Server starts; `/health` returns ok; CORS configured; errors return JSON.
- [x] [BACKEND] MongoDB Connection  
  Description: Connect via Mongoose with retry/backoff and status reporting.  
  AC: Connection uses env URI; failed DB shows logged error; status endpoint reflects DB state.
- [x] [BACKEND] Data Models  
  Description: Define Mongoose models: Product, MenuItem, Order, Location (User optional).  
  AC: Schemas created with validation; models exportable; sample create/read works.
- [x] [BACKEND] Catalog Endpoints  
  Description: CRUD/read endpoints for products (list, single, categories/filters).  
  AC: GET products supports category/filter; GET by id works; errors validated.
- [ ] [BACKEND] Menu Endpoints  
  Description: Endpoints to list menu sections/items with availability.  
  AC: GET menu returns sections/items with availability flags; validation on input.
- [ ] [BACKEND] Order Endpoints  
  Description: Create order, calculate totals/taxes, update status (placed→ready→picked up), webhook receiver stub.  
  AC: POST order validates payload and returns totals/id; status updates via endpoint; webhook route exists and logs payload.
- [ ] [BACKEND] Validation Layer  
  Description: Central input validation (zod/joi/manual) and consistent error responses.  
  AC: All public endpoints validate inputs; errors return HTTP codes + messages.
- [ ] [BACKEND] Seed Script  
  Description: Seed DB with sample products/menu/location.  
  AC: `npm run seed` (or similar) populates collections without duplicates on re-run.

## Payments & Clover
- [ ] [PAYMENTS] Clover Research & Plan  
  Description: Document Clover payment/order flow, auth, webhooks, required creds.  
  AC: Markdown doc with endpoints, auth steps, sandbox setup, and needed env vars.
- [ ] [PAYMENTS] Payment Intent Flow  
  Description: Implement Clover sandbox payment initiation and link to orders.  
  AC: Endpoint creates payment/intent with Clover and stores linkage; errors handled.
- [ ] [PAYMENTS] Clover Webhooks  
  Description: Receive Clover webhooks to update order/payment status with signature check.  
  AC: Webhook route verifies signature, updates status, and responds 2xx.
- [ ] [PAYMENTS] Refund/Cancel Endpoint (Optional)  
  Description: Provide API to request refund/cancel via Clover if supported.  
  AC: Endpoint calls Clover, updates local records, and returns result.

## Geolocation & Maps
- [ ] [MAPS] Location Endpoint  
  Description: Serve store address, hours, contact, and map coordinates.  
  AC: GET location returns address, hours, phone, coords.
- [ ] [MAPS] User Geolocation Flow  
  Description: Handle opt-in geolocation, send coords for optional distance calc.  
  AC: Client requests permission, handles deny/fail; server accepts coords and returns distance (or noop if skipped).
- [ ] [MAPS] Map Component  
  Description: Choose map provider and render store + optional user pin.  
  AC: Map shows store pin; if permission granted, user pin appears; fallback UI when blocked.

## Frontend (Next.js + Tailwind)
- [ ] [FRONTEND] Theme & Layout  
  Description: Set modern design system (colors/typography), global layout, nav/footer.  
  AC: Shared layout applied sitewide; nav/footer responsive; design tokens defined.
- [ ] [FRONTEND] Animated Home Page  
  Description: Build animated hero/sections (e.g., Framer Motion) with CTA to shop/order.  
  AC: Hero animates on load/scroll; CTA routes to shop/order; mobile-friendly.
- [ ] [FRONTEND] Shop Page  
  Description: List products with filters/sorting, detail drawer/modal, add-to-cart for pickup.  
  AC: Products render; filters/sort work; detail view opens; cart updates.
- [ ] [FRONTEND] Menu Page  
  Description: Display menu sections/items with pricing and availability indicators.  
  AC: Menu grouped by section; prices visible; unavailable items flagged.
- [ ] [FRONTEND] Location Page  
  Description: Show address, hours, contact, embedded map, “use my location” flow.  
  AC: Page shows store info; map renders; permission prompt flow works with fallback.
- [ ] [FRONTEND] Ordering Flow  
  Description: Cart + checkout for menu items, payment, pickup selection, confirmation/status.  
  AC: Users add/remove items; checkout captures details; payment call made; confirmation/status shown.
- [ ] [FRONTEND] Reusable Components  
  Description: Build UI kit (buttons, cards, modals/drawers, forms, cart/mini-cart, toasts).  
  AC: Components documented/usable across pages; responsive behavior verified.
- [ ] [FRONTEND] API Client Hooks/Services  
  Description: Client-side fetchers for catalog, menu, location, orders, payments with loading/error states.  
  AC: Hooks return data/loading/error; cache or SWR strategy in place; errors surfaced in UI.

## Auth (Optional)
- [ ] [AUTH] Auth Decision & Scope  
  Description: Decide guest checkout vs accounts; document approach.  
  AC: Decision doc exists; backlog updated accordingly.
- [ ] [AUTH] User Auth (If chosen)  
  Description: Implement signup/login/session or JWT; protect admin routes.  
  AC: Auth endpoints work; protected routes reject unauth; tokens stored securely.

## Operations & Monitoring
- [ ] [Monitoring] Admin Inventory/Menu Management  
  Description: Endpoints/UI for updating products/menu/inventory.  
  AC: Auth-protected; updates persist; validation applied.
- [ ] [Monitoring] Order Ops Dashboard  
  Description: View and update order statuses.  
  AC: Dashboard lists orders with filters; status updates reflect immediately.
- [ ] [Monitoring] Logging & Error Reporting  
  Description: Add request logging and error reporting hook (e.g., Sentry).  
  AC: Logs include request ids; unhandled errors captured; env-protected.
- [ ] [Monitoring] Rate Limiting  
  Description: Apply rate limiting/throttling to sensitive endpoints.  
  AC: Limits configured on orders/payments; returns 429 when exceeded.

## Testing
- [ ] [TESTING] Backend Tests  
  Description: Jest/supertest for models and API endpoints.  
  AC: Tests cover happy/invalid paths; CI green.
- [ ] [TESTING] Frontend Tests  
  Description: Component/flow tests for cart/checkout critical paths.  
  AC: Key flows tested; CI green.
- [ ] [TESTING] Integration Smoke  
  Description: End-to-end happy-path order placement against sandbox payment.  
  AC: Script/test creates order, processes payment, updates status successfully.

## Deployment
- [ ] [DEPLOY] Hosting & Infra  
  Description: Choose hosting (Vercel client; Render/Fly/Heroku API; MongoDB Atlas).  
  AC: Targets selected; env vars mapped; costs noted.
- [ ] [DEPLOY] CI/CD Pipeline  
  Description: Configure build/deploy pipelines per app.  
  AC: Commits trigger lint/build; main deploys to staging/prod.
- [ ] [DEPLOY] Domain & SSL  
  Description: Set domain, SSL, and map provider keys for production.  
  AC: Custom domain resolves over HTTPS; map keys loaded via env.

