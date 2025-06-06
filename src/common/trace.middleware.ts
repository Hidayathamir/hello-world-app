import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

export const asyncLocalStorage = new AsyncLocalStorage<{ traceId: string }>();

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const traceIdFromHeader = req.headers['x-trace-id'];
    const traceId =
      typeof traceIdFromHeader === 'string' && traceIdFromHeader.trim() !== ''
        ? traceIdFromHeader
        : randomUUID();

    asyncLocalStorage.run({ traceId }, () => {
      const originalJson = res.json;
      res.json = function (body: any) {
        if (body && typeof body === 'object') {
          body.traceId = traceId;
        }
        return originalJson.call(this, body);
      };

      next();
    });
  }
}
