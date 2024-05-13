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

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    {
      try {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization.split(' ')[1];
        const requiredRoles = this.reflector.getAllAndOverride(ROLE_KEY, [
          context.getClass(),
          context.getHandler(),
        ]);
        const { id, role } = this.jwtService.verify(accessToken);
        request.user = { id, role };
        console.log('allow roles are ' + requiredRoles, 'u are:' + role);
        const isAuthorized = Array.from(requiredRoles).includes(role);
        // console.log('IsAuthorized ' + isAuthorized);
        if (!isAuthorized) throw new HttpException('You are not allowed!', 401);
      } catch (error) {
        if (error instanceof JsonWebTokenError) {
          throw new UnauthorizedException('Invalid jwt token!');
        } else if (error instanceof TokenExpiredError) {
          throw new UnauthorizedException('Token has expired');
        } else throw new UnauthorizedException('Access denied');
      }
    }
    return true;
  }
}
