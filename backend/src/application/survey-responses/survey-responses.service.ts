import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyResponse, SurveyResponseStatus } from 'src/infraestructure/database/entities/survey-response';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';

@Injectable()
export class SurveyResponsesService {
  constructor(
    @InjectRepository(SurveyResponse)
    private readonly surveyResponseRepository: Repository<SurveyResponse>,
  ) {}

  async create(
    createSurveyResponseDto: CreateSurveyResponseDto,
  ): Promise<SurveyResponse> {
    // Buscar si existe una respuesta pendiente para este usuario y encuesta
    const existingResponse = await this.surveyResponseRepository.findOne({
      where: {
        survey: { id: createSurveyResponseDto.surveyId },
        user: { id: createSurveyResponseDto.userId },
        status: SurveyResponseStatus.PENDING
      },
      relations: ['survey', 'user']
    });

    // Transformar el formato de respuestas del DTO al formato de la entidad
    const formattedAnswers = createSurveyResponseDto.answers.map(a => ({
      question: a.question, // O idealmente obtener el texto real de la pregunta
      answer: a.answer
    }));

    if (existingResponse) {
      // Actualizar la respuesta pendiente existente
      existingResponse.answers = formattedAnswers;
      existingResponse.status = SurveyResponseStatus.COMPLETED;
      // submittedAt se actualizará automáticamente
      return this.surveyResponseRepository.save(existingResponse);
    }

    // Si no existe una respuesta pendiente, crear una nueva con estado COMPLETED directamente
    console.log('No se encontró una respuesta pendiente, creando una nueva con estado COMPLETED');
    const surveyResponse = this.surveyResponseRepository.create();
    surveyResponse.survey = { id: createSurveyResponseDto.surveyId } as any;
    surveyResponse.user = { id: createSurveyResponseDto.userId } as any;
    surveyResponse.answers = formattedAnswers;
    surveyResponse.status = SurveyResponseStatus.COMPLETED;
    
    return this.surveyResponseRepository.save(surveyResponse);
  }

  async findAll(): Promise<SurveyResponse[]> {
    return this.surveyResponseRepository.find({
      relations: ['survey', 'user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<SurveyResponse> {
    const surveyResponse = await this.surveyResponseRepository.findOne({
      where: { id },
      relations: ['survey', 'user'],
    });
    if (!surveyResponse) {
      throw new NotFoundException(`Survey response with ID ${id} not found`);
    }
    return surveyResponse;
  }

  async findBySurvey(surveyId: number): Promise<SurveyResponse[]> {
    return this.surveyResponseRepository.find({
      where: { survey: { id: surveyId } },
      relations: ['survey', 'user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUser(userId: number): Promise<SurveyResponse[]> {
    return this.surveyResponseRepository.find({
      where: { user: { id: userId } },
      relations: ['survey', 'user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findBySurveyAndUser(surveyId: number, userId: number): Promise<SurveyResponse[]> {
    return this.surveyResponseRepository.find({
      where: { 
        survey: { id: surveyId },
        user: { id: userId }
      },
      relations: ['survey', 'user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(
    id: number,
    updateSurveyResponseDto: UpdateSurveyResponseDto,
  ): Promise<SurveyResponse> {
    const surveyResponse = await this.findOne(id);
    Object.assign(surveyResponse, updateSurveyResponseDto);
    return this.surveyResponseRepository.save(surveyResponse);
  }

  async remove(id: number): Promise<void> {
    const result = await this.surveyResponseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Survey response with ID ${id} not found`);
    }
  }
}
