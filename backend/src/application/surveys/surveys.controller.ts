import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from '../../infraestructure/database/entities/surveys';
import { JwtAuthGuard } from '../../infraestructure/auth/guards/jwt-auth.guard';
import { UserId } from '../../infraestructure/auth/decorators/user-id.decorator';
import { SurveyResponsesService } from '../survey-responses/survey-responses.service';
import { SurveyResponseStatus } from '../../infraestructure/database/entities/survey-response';

@Controller('surveys')
export class SurveysController {
  constructor(
    private readonly surveysService: SurveysService,
    private readonly surveyResponsesService: SurveyResponsesService,
  ) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveysService.create(createSurveyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@UserId() userId: number): Promise<any[]> {
    const surveys = await this.surveysService.findAll();
    
    // Para cada encuesta, verificar si el usuario ya la respondió
    const surveyWithResponseStatus = await Promise.all(
      surveys.map(async (survey) => {
        // Buscar todas las respuestas del usuario para esta encuesta
        const userResponses = await this.surveyResponsesService.findBySurvey(survey.id);
        
        // Verificar si hay alguna respuesta del usuario actual y su estado
        const userResponse = userResponses.find(
          response => response.user && response.user.id === userId
        );
        
        return {
          ...survey,
          userResponseStatus: userResponse ? userResponse.status : null,
          isCompleted: userResponse ? userResponse.status === SurveyResponseStatus.COMPLETED : false,
          isPending: userResponse ? userResponse.status === SurveyResponseStatus.PENDING : false,
          responseId: userResponse ? userResponse.id : null
        };
      })
    );
    
    return surveyWithResponseStatus;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @UserId() userId: number): Promise<any> {
    const survey = await this.surveysService.findOne(+id);
    
    // Buscar la respuesta del usuario para esta encuesta
    const userResponses = await this.surveyResponsesService.findBySurvey(+id);
    const userResponse = userResponses.find(
      response => response.user && response.user.id === userId
    );
    
    return {
      ...survey,
      userResponseStatus: userResponse ? userResponse.status : null,
      isCompleted: userResponse ? userResponse.status === SurveyResponseStatus.COMPLETED : false,
      isPending: userResponse ? userResponse.status === SurveyResponseStatus.PENDING : false,
      responseId: userResponse ? userResponse.id : null
    };
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
