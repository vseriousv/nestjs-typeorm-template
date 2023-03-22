import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { ConfigModule } from '@nestjs/config';
import { configurator } from './configurator';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configurator],
      envFilePath: ['.env'],
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
