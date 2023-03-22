import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { configurator } from '../../../configurator';
import { WorkerOneService } from './worker-one.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../../../db/data-source';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configurator],
      envFilePath: ['.env'],
    }),
  ],
  providers: [WorkerOneService, Logger],
  exports: [],
})
export class WorkerOneModule {}
