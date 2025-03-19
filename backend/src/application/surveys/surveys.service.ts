import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../../infraestructure/database/entities/surveys';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const survey = this.surveyRepository.create(createSurveyDto);
    return this.surveyRepository.save(survey);
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
