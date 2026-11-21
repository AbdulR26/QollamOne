# QollamOne

Full-stack **Express.js + React (Vite)** TypeScript application using **Modular Monolith + Layered Architecture** and **MySQL/MariaDB (`mysql2`)**.

## Project Structure

```text
QollamOne/
├── client/                         # React + Vite + TypeScript frontend (Admin UI)
│   ├── src/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts              # Proxies /api -> http://localhost:3000
└── src/                            # Express.js TypeScript backend
    ├── index.ts                    # Server entry point
    ├── app.ts                      # Express app, API routes, & React static serving
    ├── config/
    │   ├── env.ts                  # Environment configuration
    │   └── database.ts             # MySQL connection pool (mysql2)
    ├── shared/                     # Cross-cutting concerns
    │   ├── errors/AppError.ts      # Operational error class
    │   ├── middlewares/            # auth, validate, notFoundHandler, errorHandler
    │   └── utils/asyncHandler.ts
    └── modules/                    # Isolated domain modules
        └── health/                 # Routes -> Validation -> Controller -> Service -> Repository -> Model
```

## Getting Started

1. Install backend & frontend dependencies:
   ```sh
   npm install
   npm --prefix client install
   ```

2. Configure environment variables:
   ```sh
   cp .env.example .env
   ```
   Update `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` (default: `sibikaa`) in `.env`.

3. Run in development (Express on `:3000` + React Vite on `:5173`):
   ```sh
   npm run dev
   ```

4. Build & run in production (e.g. Hostinger Node.js Web App):
   ```sh
   npm run build
   npm start
   ```
   Express automatically serves the built React app from `client/dist/` alongside `/api/*`.
