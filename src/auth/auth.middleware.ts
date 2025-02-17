import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly clsService: ClsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userId = (req.user as any)?.id; // Assuming `req.user` contains the user authentication object (e.g., injected by Passport).
    if (userId) {
      this.clsService.set('user_id', userId); // Store userId in the CLS context
    }
    next();
  }
}
