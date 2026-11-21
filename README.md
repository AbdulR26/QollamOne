# QollamOne

Express.js + TypeScript backend application using **Modular Monolith + Layered Architecture** with **MySQL/MariaDB (`mysql2`)**.

## Architecture

```text
src/
├── index.ts                        # Server entry point
├── app.ts                          # Express app & module registration
├── config/
│   ├── env.ts                      # Environment configuration
│   └── database.ts                 # MySQL connection pool (mysql2)
├── shared/                         # Cross-cutting concerns
│   ├── errors/AppError.ts          # Operational error class
│   ├── middlewares/
│   │   ├── auth.ts                 # Authentication & authorization
│   │   ├── validate.ts             # Input validation middleware
│   │   ├── notFoundHandler.ts      # 404 handler
│   │   └── errorHandler.ts         # Global error handler
│   └── utils/asyncHandler.ts       # Async wrapper for controllers
└── modules/                        # Isolated domain modules
    └── health/                     # Example module
        ├── health.routes.ts        # Routes: Mendefinisikan endpoint
        ├── health.validation.ts    # Validation: Validasi input
        ├── health.controller.ts    # Controller: Menerima request & response
        ├── health.service.ts       # Service: Business logic
        ├── health.repository.ts    # Repository: Query database
        └── health.model.ts         # Model: Struktur data
```

### Layer Responsibilities
| Layer | Role |
| --- | --- |
| **Routes** (`*.routes.ts`) | Mendefinisikan endpoint, memasang middleware & validation |
| **Controller** (`*.controller.ts`) | Menerima request dan mengirim response |
| **Service** (`*.service.ts`) | Menangani business logic |
| **Repository** (`*.repository.ts`) | Menangani query database / akses data |
| **Model** (`*.model.ts`) | Mendefinisikan struktur data |
| **Validation** (`*.validation.ts`) | Validasi input request |
| **Middleware** (`shared/middlewares/`) | Authentication, authorization, validasi, error handling |

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```

2. Configure environment variables:
   ```sh
   cp .env.example .env
   ```
   Update `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` (default: `sibikaa`) in `.env`.

3. Run in development:
   ```sh
   npm run dev
   ```

4. Build & run in production (e.g. Hostinger Node.js Web App):
   ```sh
   npm run build
   npm start
   ```

## Endpoints

- `GET /` — Application status
- `GET /api/health` — Health & database connection check (`?detail=true` optional)
