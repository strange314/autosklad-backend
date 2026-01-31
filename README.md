# Autosklad Backend (NestJS + Prisma)

## Что внутри
- NestJS API
- Prisma Client
- PostgreSQL
- Временная авторизация: /auth/login по employee_id
- Пример мульти-тенантности: /parts всегда фильтрует по company_id из JWT

## Быстрый старт (после установки Node.js)
1) Установите зависимости

```powershell
npm install
```

2) Подготовьте переменные окружения

 - Скопируйте ` .env.example` в `.env` и при необходимости поправьте значения (особенно `DATABASE_URL` и `JWT_ACCESS_SECRET`).

```powershell
copy .env.example .env
```

3) Поднимите Postgres (Docker Compose)

```powershell
docker compose up -d
```

По умолчанию `docker-compose.yml` пробрасывает порт `5433` на хост (`localhost:5433`). Если вы хотите использовать стандартный порт `5432`, отредактируйте `docker-compose.yml`.

4) Сгенерируйте Prisma Client и примените схему в базу

 - Быстрый способ (создаст таблицы по вашей Prisma-схеме, без миграций):

```powershell
npx prisma db push
```

 - Или использовать миграции (рекомендуется для версионирования):

```powershell
npx prisma migrate dev --name init
```

5) Сгенерируйте клиент (если нужно) и запустите приложение в режиме разработки

```powershell
npx prisma generate
npm run start:dev
```

## Тест
1) POST /auth/login { "employee_id": 1 } -> access_token
2) GET /parts (Bearer token)
3) POST /parts (Bearer token)
