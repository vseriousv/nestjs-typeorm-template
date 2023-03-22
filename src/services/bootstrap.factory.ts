import { IServiceConfig } from '../shared/types/service-config.interface';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

export class BootstrapFactory {
  public static context(module: any, config: IServiceConfig, logger?: Logger) {
    const serviceLogger = logger || new Logger();

    this.contextBootstrap(module, config, serviceLogger).catch(
      serviceLogger.error,
    );
  }

  private static async contextBootstrap(
    module: any,
    config: IServiceConfig,
    logger?: Logger,
  ) {
    const factory = await NestFactory.createApplicationContext(module, {
      logger,
    });

    logger.debug(`${config.serviceName.toUpperCase()} is start`);

    return factory;
  }
}
