import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);

    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authoriztion;

      const tokenType = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (tokenType !== 'Bearer' || !token) {
        throw new UnauthorizedException('Пользователь не вошел в систему');
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      if (roles.some((role) => user.roles.includes(role))) {
        return true;
      } else {
        throw new ForbiddenException(
          'У пользователя нет прав для просмотра этого ресурса',
        );
      }
    } catch (error) {
      throw new UnauthorizedException('Пользователь не вошел в систему');
    }
  }
}
