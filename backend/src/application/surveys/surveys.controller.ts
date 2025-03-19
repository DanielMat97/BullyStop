import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from '../../infraestructure/database/entities/surveys';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveysService.create(createSurveyDto);
  }

  @Get()
  findAll(): Promise<Survey[]> {
    return this.surveysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Survey> {
    return this.surveysService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ): Promise<Survey> {
    return this.surveysService.update(+id, updateSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.surveysService.remove(+id);
  }
}
