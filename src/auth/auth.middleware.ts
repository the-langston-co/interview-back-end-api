import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  logger = new Logger(AuthMiddleware.name);
  constructor(private readonly clsService: ClsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id; // Assuming `req.user` contains the user authentication object (e.g., injected by Passport).
    if (userId) {
      this.logger.log(`User ${userId} is authenticated`);
      this.clsService.set('user_id', userId); // Store userId in the CLS context
    }
    next();
  }
}
