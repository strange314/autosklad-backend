# Autosklad Backend (NestJS + Prisma)

## Что внутри
- NestJS API
- Prisma Client
- PostgreSQL
- Временная авторизация: /auth/login по employee_id
- Пример мульти-тенантности: /parts всегда фильтрует по company_id из JWT

## Быстрый старт (после установки Node.js)
1) npm i
2) настроить .env (DATABASE_URL, JWT_ACCESS_SECRET)
3) npx prisma generate
4) npm run start:dev

## Тест
1) POST /auth/login { "employee_id": 1 } -> access_token
2) GET /parts (Bearer token)
3) POST /parts (Bearer token)
