import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

import * as path from 'path';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { AttributeModule } from './attribute/attribute.module';
import { AttributeValueModule } from './attribute-value/attribute-value.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // MulterModule.register({ dest: './static' }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, './static'),
      // serveRoot: path.resolve(__dirname),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    TagModule,
    CommentModule,
    UserModule,
    ProfileModule,
    RoleModule,
    FileModule,
    CartModule,
    OrderModule,
    ItemModule,
    AuthModule,
    AttributeModule,
    AttributeValueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
