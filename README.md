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
│   ├── middlewares/                # Global 404 & error handlers
│   └── utils/asyncHandler.js       # Async wrapper for controllers
└── modules/                        # Isolated domain modules
    └── health/                     # Example module (Routes -> Controller -> Service -> Repository)
        ├── health.routes.js
        ├── health.controller.js
        ├── health.service.js
        └── health.repository.js
```

### Layer Responsibilities (per module)
1. **Routes** (`*.routes.js`): Defines endpoints, wires dependencies, attaches validation/auth middlewares.
2. **Controller** (`*.controller.js`): Handles HTTP request/response formatting only.
3. **Service** (`*.service.js`): Contains business logic and orchestrates repositories.
4. **Repository** (`*.repository.js`): Encapsulates data access (DB/external sources).

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
- `GET /api/health` — Health check
