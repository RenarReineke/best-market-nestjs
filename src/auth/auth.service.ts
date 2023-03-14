import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';
import { LoginResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(name: string, password: string): Promise<LoginResponse> {
    const user = await this.userService.getUserByName(name);
    if (!user) {
      throw new HttpException(
        'Данные пользователия неверны',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Данные пользователя неверны');
    }
    console.log('Роли юзера при логине: ', user.roles);

    // const roles = user.roles.map((role) => role.title);
    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(
        {
          username: user.name,
          roles: user.roles,
          profileId: user.profile.id,
        },
        user,
      );

    console.log('Все норм, юзер опознан!');

    return {
      refreshToken,
      res: {
        user: user.name,
        token: accessToken,
        message: `Аутентификация завершена успешно! Пользователь ${user.name} вошел в систему`,
        success: true,
      },
    };
  }
}
