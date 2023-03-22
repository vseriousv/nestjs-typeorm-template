import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WorkerOneService implements OnModuleInit {

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit() {
    this.logger.log('Module initialized!');
    this.startJobs();
  }

  startJobs() {
    this.logger.log('start job');
  }
}
