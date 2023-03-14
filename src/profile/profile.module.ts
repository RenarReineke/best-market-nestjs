import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/auth/token.entity';
import { TokenService } from 'src/auth/token.service';
import { Comment } from 'src/comment/comment.entity';
import { CommentModule } from 'src/comment/comment.module';
import { CommentService } from 'src/comment/comment.service';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User, Comment]),
    forwardRef(() => UserModule),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, CommentService, JwtService],
  exports: [ProfileService],
})
export class ProfileModule {}
