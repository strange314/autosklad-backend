const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();

  // Создаём тестовую компанию
  const company = await prisma.company.create({ data: { name: 'test-company-for-recalc' } });

  // Создаём донора с purchase_price = 100000
  const donor = await prisma.autoDonor.create({
    data: { company_id: company.id, purchase_price: 100000 },
  });

  // Создаём 3 детали с current_price 50000, 30000, 20000
  const partsData = [50000, 30000, 20000].map((p) => ({
    company_id: company.id,
    auto_donor_id: donor.id,
    current_price: p,
  }));

  const parts = [];
  for (const pd of partsData) {
    const part = await prisma.part.create({ data: pd });
    parts.push(part);
  }

  // Выполняем пересчёт (аналогично DonorCostService)
  const purchasePrice = Number(donor.purchase_price ?? 0);
  if (purchasePrice <= 0) {
    await prisma.part.updateMany({ where: { auto_donor_id: donor.id, company_id: company.id }, data: { allocated_cost: 0 } });
    console.log('purchase_price is zero or missing');
    return;
  }

  const loadedParts = await prisma.part.findMany({ where: { auto_donor_id: donor.id, company_id: company.id }, select: { id: true, temp_price: true, current_price: true } });
  if (loadedParts.length === 0) {
    console.log('No parts found');
    return;
  }

  const bases = loadedParts.map((p) => {
    const base = Number(p.temp_price ?? p.current_price ?? 0);
    return base > 0 ? base : 1;
  });
  const sum = bases.reduce((a, b) => a + b, 0);

  for (let i = 0; i < loadedParts.length; i++) {
    const p = loadedParts[i];
    const share = bases[i] / sum;
    const allocated = purchasePrice * share;
    await prisma.part.update({ where: { id: p.id }, data: { allocated_cost: allocated } });
  }

  const updated = await prisma.part.findMany({ where: { auto_donor_id: donor.id, company_id: company.id }, select: { id: true, current_price: true, allocated_cost: true } });

  console.log('Updated parts:');
  for (const p of updated) {
    console.log(`- id=${p.id} current_price=${p.current_price} allocated_cost=${p.allocated_cost}`);
  }

  // Не удаляем данные автоматически — пользователь решит, что делать.
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
