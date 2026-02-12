import { NestFactory } from '@nestjs/core';
// Prevent Prisma from connecting during documentation generation
process.env.SKIP_DB_CONNECT = 'true';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('Autosklad API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outPath = path.resolve(process.cwd(), 'swagger.json');
  fs.writeFileSync(outPath, JSON.stringify(document, null, 2));
  await app.close();
  // eslint-disable-next-line no-console
  console.log('Generated swagger.json at', outPath);
}

generateSwagger().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
