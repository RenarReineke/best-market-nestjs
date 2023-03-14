import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.headers);

    try {
      const authHeader = req.headers.authorization;

      const tokenType = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (tokenType !== 'Bearer' || !token) {
        throw new UnauthorizedException('Пользователь не вошел в систему');
      }

      const payload = this.jwtService.verify(token, {
        secret: process.env.SECRET,
      });
      console.log('Гвард: ', payload);
      req.user = payload;

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Произошла ошибка! Пользователь не вошел в систему',
      );
    }
  }
}
