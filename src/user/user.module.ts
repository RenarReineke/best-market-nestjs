import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { AuthModule } from 'src/auth/auth.module';
import { TokenService } from 'src/auth/token.service';
import { Token } from 'src/auth/token.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { Profile } from 'src/profile/profile.entity';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/comment.entity';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token, Role, Profile]),
    forwardRef(() => ProfileModule),
  ],
  controllers: [UserController],
  providers: [UserService, RoleService, TokenService, JwtService],
  exports: [UserService],
})
export class UserModule {}
