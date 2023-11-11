import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/constants/role.enum';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    var rawToken = token?.replace('Bearer', '').trim();

    try {
      const user = await this.jwtService.verifyAsync(rawToken, {
        secret: 'SECRET',
      });
  
      return requiredRoles.some((role) => user.role?.includes(role));
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(error);
      }
      //if no token (No Auth)
      throw new UnauthorizedException(error);
    }

   
  }
}
