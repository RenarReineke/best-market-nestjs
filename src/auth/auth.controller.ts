import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { RefreshResponse, UserResponse } from './response';
import { Request, Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/registration')
  async createUser(@Body() newUser: CreateUserDto) {
    const roles = await this.roleService.getRolesByTitles(['User']);
    return await this.userService.create(newUser, roles);
  }

  @Post('/login')
  async loginUser(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponse> {
    const { refreshToken, res } = await this.authService.signIn(
      user.name,
      user.password,
    );
    console.log('Респонс на фронт: ', res);
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // path: '/refresh',
    });
    console.log('Куки на фронт: ', response.cookie);
    return res;
  }

  @Post('/logout')
  async logoutUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const refreshToken = request.cookies.refreshToken;
    console.log('Рефреш при логауте: ', refreshToken);
    if (!refreshToken) return 'Ты и так аноним, куда прешься?';
    await this.tokenService.deleteRefreshTokenFromDB(refreshToken);
    response.clearCookie(refreshToken);

    return 'Юзер разлогинен, теперь ты аноним!';
  }

  @Post('/refresh')
  async refreshToken(@Req() request: Request): Promise<RefreshResponse> {
    try {
      // проверить, что рефреш токен есть в куки

      const oldRefreshToken = request.cookies.refreshToken;
      if (!oldRefreshToken) {
        throw new HttpException(
          'Нечего обновлять - рефреш токена нет, значит юзер шарлатан!',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // проверить валидность токена
      const payloadFromOldToken =
        this.tokenService.verifyToken(oldRefreshToken);

      console.log('Что возвращает метод verify: ', payloadFromOldToken);

      if (!payloadFromOldToken) {
        throw new HttpException(
          'Рефреш токен какой то левый, доступ запрещен!',
          HttpStatus.FORBIDDEN,
        );
      }

      // сформировать новый access токен
      const accessToken = this.tokenService.generateAccessToken({
        username: payloadFromOldToken.username,
        roles: payloadFromOldToken.roles,
        profileId: payloadFromOldToken.profileId,
      });

      return {
        user: '',
        token: accessToken,
        message: `Выдан новый токен доступа для пользователя ${payloadFromOldToken.username}`,
        success: true,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Что то пошло не так при рефреше...',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
