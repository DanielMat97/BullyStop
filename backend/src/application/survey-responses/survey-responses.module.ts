import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponsesService } from './survey-responses.service';
import { SurveyResponsesController } from './survey-responses.controller';
import { SurveyResponse } from 'src/infraestructure/database/entities/survey-response';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyResponse])],
  controllers: [SurveyResponsesController],
  providers: [SurveyResponsesService],
  exports: [SurveyResponsesService],
})
export class SurveyResponsesModule {}
