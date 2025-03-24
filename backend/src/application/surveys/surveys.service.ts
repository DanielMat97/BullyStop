import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../../infraestructure/database/entities/surveys';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { UsersService } from '../users/users.service';
import { SurveyResponse, SurveyResponseStatus } from '../../infraestructure/database/entities/survey-response';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(SurveyResponse)
    private readonly surveyResponseRepository: Repository<SurveyResponse>,
    private readonly usersService: UsersService,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    // Crear la encuesta
    const survey = this.surveyRepository.create(createSurveyDto);
    const savedSurvey = await this.surveyRepository.save(survey);
    
    // Obtener todos los usuarios
    const users = await this.usersService.findAll();
    
    // Crear una respuesta pendiente para cada usuario
    for (const user of users) {
      const pendingResponse = this.surveyResponseRepository.create();
      pendingResponse.survey = savedSurvey;
      pendingResponse.user = user;
      pendingResponse.status = SurveyResponseStatus.PENDING;
      // Guardar la respuesta pendiente
      await this.surveyResponseRepository.save(pendingResponse);
    }
    
    return savedSurvey;
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyRepository.find({
      relations: ['responses'],
    });
  }

  async findOne(id: number): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({
      where: { id },
      relations: ['responses'],
    });
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return survey;
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    const survey = await this.findOne(id);
    Object.assign(survey, updateSurveyDto);
    return this.surveyRepository.save(survey);
  }

  async remove(id: number): Promise<void> {
    const result = await this.surveyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
  }
}
