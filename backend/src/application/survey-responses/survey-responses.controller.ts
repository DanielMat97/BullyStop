import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SurveyResponsesService } from './survey-responses.service';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';
import { SurveyResponse } from 'src/infraestructure/database/entities/survey-response';

@Controller('survey-responses')
export class SurveyResponsesController {
  constructor(private readonly surveyResponsesService: SurveyResponsesService) {}

  @Post()
  create(@Body() createSurveyResponseDto: CreateSurveyResponseDto): Promise<SurveyResponse> {
    return this.surveyResponsesService.create(createSurveyResponseDto);
  }

  @Get()
  findAll(
    @Query('surveyId') surveyId?: string,
    @Query('userId') userId?: string,
  ): Promise<SurveyResponse[]> {
    if (surveyId) {
      return this.surveyResponsesService.findBySurvey(+surveyId);
    }
    if (userId) {
      return this.surveyResponsesService.findByUser(+userId);
    }
    return this.surveyResponsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SurveyResponse> {
    return this.surveyResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSurveyResponseDto: UpdateSurveyResponseDto,
  ): Promise<SurveyResponse> {
    return this.surveyResponsesService.update(+id, updateSurveyResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.surveyResponsesService.remove(+id);
  }
} 