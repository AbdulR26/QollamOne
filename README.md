# QollamOne

Express.js backend application using **Modular Monolith + Layered Architecture**.

## Architecture

```text
src/
├── index.js                        # Server entry point
├── app.js                          # Express app & module registration
├── config/
│   └── env.js                      # Environment configuration
├── shared/                         # Cross-cutting concerns
│   ├── errors/AppError.js          # Operational error class
│   ├── middlewares/
│   │   ├── auth.js                 # Authentication & authorization
│   │   ├── validate.js             # Input validation middleware
│   │   ├── notFoundHandler.js      # 404 handler
│   │   └── errorHandler.js         # Global error handler
│   └── utils/asyncHandler.js       # Async wrapper for controllers
└── modules/                        # Isolated domain modules
    └── health/                     # Example module
        ├── health.routes.js        # Routes: Mendefinisikan endpoint
        ├── health.validation.js    # Validation: Validasi input
        ├── health.controller.js    # Controller: Menerima request & response
        ├── health.service.js       # Service: Business logic
        ├── health.repository.js    # Repository: Query database
        └── health.model.js         # Model: Struktur data
```

### Layer Responsibilities
| Layer | Role |
| --- | --- |
| **Routes** (`*.routes.js`) | Mendefinisikan endpoint, memasang middleware & validation |
| **Controller** (`*.controller.js`) | Menerima request dan mengirim response |
| **Service** (`*.service.js`) | Menangani business logic |
| **Repository** (`*.repository.js`) | Menangani query database / akses data |
| **Model** (`*.model.js`) | Mendefinisikan struktur data |
| **Validation** (`*.validation.js`) | Validasi input request |
| **Middleware** (`shared/middlewares/`) | Authentication, authorization, validasi, error handling |

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```

2. Copy environment variables:
   ```sh
   cp .env.example .env
   ```

3. Run in development:
   ```sh
   npm run dev
   ```

4. Run in production:
   ```sh
   npm start
   ```

## Endpoints

- `GET /` — Application status
- `GET /api/health` — Health check (`?detail=true` optional)
