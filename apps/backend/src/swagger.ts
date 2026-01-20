import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Lead Intake Funnel API')
    .setDescription('Lead Intake Funnel API documentation')
    .setVersion('1')
    .addServer('http://localhost:3000/')
    .addBearerAuth()
    .addSecurityRequirements('bearer');

  const document = SwaggerModule.createDocument(app, config.build());

  const filePath = 'apps/backend/src/documentation/openapi.json';
  writeFileSync(filePath, JSON.stringify(document, null, 2));
  SwaggerModule.setup('api/docs', app, document);
}
