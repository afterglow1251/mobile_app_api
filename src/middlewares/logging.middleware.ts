import { Injectable, NestMiddleware } from '@nestjs/common';
import { pinoHttp } from 'pino-http';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = pinoHttp({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: { colorize: true },
          }
        : undefined,
  });

  use(req: any, res: any, next: () => void) {
    this.logger(req, res);
    res.on('finish', () => {
      this.logger.logger.info({
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: res.getHeader('X-Response-Time'),
        body: req.body,
      });
    });
    next();
  }
}
