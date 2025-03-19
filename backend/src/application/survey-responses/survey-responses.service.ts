import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyResponse } from 'src/infraestructure/database/entities/survey-response';
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
    const surveyResponse = this.surveyResponseRepository.create({
      survey: { id: createSurveyResponseDto.surveyId },
      user: { id: createSurveyResponseDto.userId },
      answers: createSurveyResponseDto.answers,
    });
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
