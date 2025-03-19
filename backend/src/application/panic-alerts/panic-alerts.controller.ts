import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PanicAlertsService } from './panic-alerts.service';
import { CreatePanicAlertDto } from './dto/create-panic-alert.dto';
import { UpdatePanicAlertDto } from './dto/update-panic-alert.dto';
import { PanicAlert } from '../../infraestructure/database/entities/panic-alerts';

@Controller('panic-alerts')
export class PanicAlertsController {
  constructor(private readonly panicAlertsService: PanicAlertsService) {}

  @Post()
  create(@Body() createPanicAlertDto: CreatePanicAlertDto): Promise<PanicAlert> {
    return this.panicAlertsService.create(createPanicAlertDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string): Promise<PanicAlert[]> {
    if (userId) {
      return this.panicAlertsService.findByUser(+userId);
    }
    return this.panicAlertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PanicAlert> {
    return this.panicAlertsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePanicAlertDto: UpdatePanicAlertDto,
  ): Promise<PanicAlert> {
    return this.panicAlertsService.update(+id, updatePanicAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.panicAlertsService.remove(+id);
  }
}
