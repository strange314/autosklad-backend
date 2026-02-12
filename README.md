# Autosklad Backend

## Очень простая инструкция запуска
1) Установи Node.js (рекомендуется 18+ или 20+).
2) Установи PostgreSQL и создай базу.
3) В корне проекта создай файл `.env` и добавь:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/имя_базы?schema=public"
JWT_ACCESS_SECRET="любая_длинная_строка_секрета"
```

4) В папке проекта запусти:

```bash
npm install --legacy-peer-deps
npm run build
npm run start:dev
```

Сервер будет доступен на `http://localhost:3000`.

## Проверка (минимум)
1) Регистрация компании: `POST /companies/register`

Пример тела:
```json
{
  "company_name": "Тестовая компания",
  "phone": "+79990000000",
  "specialization": "mixed",
  "owner_full_name": "Иван Иванов",
  "pin": "1234",
  "tariff_code": "econom"
}
```

2) Вход по PIN: `POST /auth/pin/login`

По телефону:
```json
{ "phone": "+79990000000", "pin": "1234" }
```

Или по `employee_id`:
```json
{ "employee_id": 1, "pin": "1234" }
```

Ответ: JSON с `access_token`.

3) Проверка подписки: `GET /billing/status` (нужен Bearer token)

4) Проверка запчастей: `GET /parts` (нужен Bearer token и активная подписка)

## Если не запускается
- Проверь `DATABASE_URL`.
- Убедись, что PostgreSQL запущен и база существует.
- Проверь, что `JWT_ACCESS_SECRET` заполнен.
- Перезапусти сервер.

## Продакшен-старт
```bash
npm run build
npm run start
```

---

## Тест: пересчёт себестоимости донора (donor cost recalculation)

Команды и пример быстрого теста, который создаёт тестовую компанию, донора с
`purchase_price = 100000` и 3 детали с `current_price` 50000/30000/20000, затем
пересчитывает `allocated_cost`.

Команды для воспроизведения:

```powershell
npx prisma generate
npm run build
node scripts/test-recalc.js
```

Ожидаемый вывод в консоли после `node scripts/test-recalc.js`:

```
Updated parts:
- id=1 current_price=50000 allocated_cost=50000
- id=2 current_price=30000 allocated_cost=30000
- id=3 current_price=20000 allocated_cost=20000
```

Примечания:
- Скрипт `scripts/test-recalc.js` использует текущую базу из `.env` и создаёт
  тестовые записи (company, autoDonor, parts). Данные не удаляются автоматически.
- Для изолированных проверок используйте тестовую базу или добавьте очистку в скрипт.

---

## Тест: вход по PIN (pin login test)

Этот тест создаёт тестовую компанию и сотрудника с PIN `1234`, затем делает
POST запрос к `POST /auth/pin/login` и выводит ответ (JWT).

Команды для воспроизведения:

```powershell
# сгенерировать Prisma client (если нужно)
npx prisma generate

# собрать проект (опционально)
npm run build

# запустить dev-сервер (если ещё не запущен)
npm run start:dev

# запустить тестовый скрипт
node scripts/test-pin-login.js
```

Ожидаемый вывод (пример):

```
Created employee: { id: 1, phone: '+79990000000' }
HTTP 201 Created
Response body: {"access_token":"<JWT_TOKEN>"}
```

Примечания:
- Скрипт `scripts/test-pin-login.js` создаёт реальные записи в базе, не удаляет их автоматически.
- Для изолированных проверок используйте тестовую базу или добавьте очистку в скрипт.
