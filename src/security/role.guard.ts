import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ROLE_KEY } from './role.decorator';
import { IS_PUBLIC_KEY } from './public.docorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    {
      try {
        // check public route
        const isPublic = this.reflector.getAllAndOverride<boolean>(
          IS_PUBLIC_KEY,
          [context.getClass(), context.getHandler()],
        );
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization.split(' ')[1];
        const { id, role } = this.jwtService.verify(accessToken);

        request.user = { id, role };
        const isAuthorized = role === 'admin' || role === 'sysadmin';
        if (!isAuthorized) throw new HttpException('You are not allowed!', 401);
      } catch (error) {
        if (error instanceof JsonWebTokenError) {
          throw new UnauthorizedException('Invalid jwt token!');
        } else if (error instanceof TokenExpiredError) {
          throw new UnauthorizedException('Token has expired');
        } else throw new UnauthorizedException(error);
      }
    }
    return true;
  }
}
