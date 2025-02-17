import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClsService } from 'nestjs-cls';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.metadata';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  logger = new Logger(JwtAuthGuard.name);

  constructor(
    private reflector: Reflector,
    private readonly clsService: ClsService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    this.logger.log(`handleRequest: ${JSON.stringify({ err, user, info })}`);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    this.clsService.set('user_id', user.userId);

    return user;
  }
}
