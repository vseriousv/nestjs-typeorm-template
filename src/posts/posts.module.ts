import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { PostEntity } from './entities/post.entity';
import { JwtStrategy } from '../users/auth/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostsController],
  providers: [PostsService, JwtStrategy, UsersService],
  exports: [PostsService],
})
export class PostsModule {}
