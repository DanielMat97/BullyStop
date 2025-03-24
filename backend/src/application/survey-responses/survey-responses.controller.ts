import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SurveyResponsesService } from './survey-responses.service';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';
import { SurveyResponse } from 'src/infraestructure/database/entities/survey-response';
import { JwtAuthGuard } from '../../infraestructure/auth/guards/jwt-auth.guard';
import { UserId } from '../../infraestructure/auth/decorators/user-id.decorator';

@Controller('survey-responses')
export class SurveyResponsesController {
  constructor(private readonly surveyResponsesService: SurveyResponsesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createSurveyResponseDto: CreateSurveyResponseDto,
    @UserId() userId: number
  ): Promise<SurveyResponse> {
    createSurveyResponseDto.userId = userId;
    return this.surveyResponsesService.create(createSurveyResponseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @UserId() userId: number,
    @Query('surveyId') surveyId?: string,
  ): Promise<SurveyResponse[]> {
    if (surveyId) {
      return this.surveyResponsesService.findBySurvey(+surveyId);
    }
    return this.surveyResponsesService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('survey/:surveyId/user')
  findBySurveyAndUser(
    @Param('surveyId') surveyId: string,
    @UserId() userId: number,
  ): Promise<SurveyResponse[]> {
    return this.surveyResponsesService.findBySurveyAndUser(+surveyId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<SurveyResponse> {
    return this.surveyResponsesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSurveyResponseDto: UpdateSurveyResponseDto,
  ): Promise<SurveyResponse> {
    return this.surveyResponsesService.update(+id, updateSurveyResponseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.surveyResponsesService.remove(+id);
  }
} 