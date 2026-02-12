const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
  const prisma = new PrismaClient();
  try {
    // Создаём тестовую компанию
    const company = await prisma.company.create({ data: { name: 'test-company-pin' } });

    // Хэш PIN и создаём сотрудника
    const pin = '1234';
    const hash = await bcrypt.hash(pin, 10);

    const employee = await prisma.employee.create({
      data: {
        company_id: company.id,
        full_name: 'Test User',
        phone: '+79990000000',
        is_active: true,
        pin_code_hash: hash,
      },
    });

    console.log('Created employee:', { id: employee.id, phone: employee.phone });

    // Выполняем POST к локальному серверу
    const url = 'http://localhost:3000/auth/pin/login';
    const body = { phone: employee.phone, pin };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log('HTTP', res.status, res.statusText);
    console.log('Response body:', text);
  } catch (e) {
    console.error('Error during test:', e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
