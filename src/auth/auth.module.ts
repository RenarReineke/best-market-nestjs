import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token } from './token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token, Role]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: 7200000 },
    }),
    ProfileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, RoleService, UserService],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
