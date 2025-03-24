import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { Survey } from '../../infraestructure/database/entities/surveys';
import { SurveyResponse } from '../../infraestructure/database/entities/survey-response';
import { UsersModule } from '../users/users.module';
import { SurveyResponsesModule } from '../survey-responses/survey-responses.module';
import { AuthModule } from '../../infraestructure/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, SurveyResponse]),
    UsersModule,
    SurveyResponsesModule,
    AuthModule,
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
  exports: [SurveysService],
})
export class SurveysModule {}
