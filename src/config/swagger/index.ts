import { DocumentBuilder } from '@nestjs/swagger';
import { accessToken } from 'src/constants/swagger.constants';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Online delivery shop API')
  .setDescription('All necessary endpoints')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    accessToken,
  )
  .build();
