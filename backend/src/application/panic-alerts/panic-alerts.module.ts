import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanicAlertsService } from './panic-alerts.service';
import { PanicAlertsController } from './panic-alerts.controller';
import { PanicAlert } from '../../infraestructure/database/entities/panic-alerts';

@Module({
  imports: [TypeOrmModule.forFeature([PanicAlert])],
  controllers: [PanicAlertsController],
  providers: [PanicAlertsService],
  exports: [PanicAlertsService],
})
export class PanicAlertsModule {}
