# API Endpoints Log

Keep this file updated as endpoints are added. Group by category and list method/path plus brief notes.

## Health
- `GET /health` — Service status and DB connection info.

## Catalog (Products)
- `GET /api/products` — List products. Filters: `search`, `category` (comma-separated), `inStock`, `active` (defaults to true).
- `GET /api/products/:id` — Fetch single product by id.

## Menu
- _TBD_ — Add menu endpoints when implemented.

## Orders
- _TBD_ — Add order create/status/webhook endpoints when implemented.

## Payments
- _TBD_ — Add Clover payment/webhook endpoints when implemented.

## Locations/Maps
- _TBD_ — Add location/geolocation endpoints when implemented.

