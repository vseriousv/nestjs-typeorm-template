import { BootstrapFactory } from '../../bootstrap.factory';
import { ServiceConfig } from './worker-one.config';
import { WorkerOneModule } from './worker-one.module';

BootstrapFactory.context(WorkerOneModule, ServiceConfig);
