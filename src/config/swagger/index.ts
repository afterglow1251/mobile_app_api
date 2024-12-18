import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Online delivery shop API')
  .setDescription('All necessary endpoints')
  .setVersion('1.0')
  .build();
