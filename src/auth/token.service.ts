import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

type newTokensType = {
  accessToken: string;
  refreshToken: string;
};

type payloadType = {
  username: string;
  roles: Role[];
  profileId: number;
};

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(
    payload: payloadType,
    user: User,
  ): Promise<newTokensType> {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload, user);
    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: payloadType): string {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: '300m',
    });

    return accessToken;
  }

  async generateRefreshToken(
    payload: payloadType,
    user: User,
  ): Promise<string> {
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: '30d',
    });
    const token = await this.saveRefreshTokenInDB(refreshToken, user);
    if (!token) {
      throw new HttpException(
        'Сервер не смог провести аутентификацию',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return refreshToken;
  }

  async saveRefreshTokenInDB(refreshToken: string, user: User): Promise<Token> {
    const token = new Token();
    token.refresh = refreshToken;
    token.user = user;
    return await this.tokenRepository.save(token);
  }

  async deleteRefreshTokenFromDB(refreshToken: string): Promise<void> {
    await this.tokenRepository.delete({ refresh: refreshToken });
  }

  verifyToken(token: string) {
    console.log('Секретный секрет в токен сервисе', process.env.SECRET);
    return this.jwtService.verify(token, { secret: process.env.SECRET });
  }
}
