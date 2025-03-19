import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infraestructure/database/database.module';
import { databaseConfig } from './infraestructure/config';
import { UsersModule } from './application/users/users.module';
import { SurveysModule } from './application/surveys/surveys.module';
import { PanicAlertsModule } from './application/panic-alerts/panic-alerts.module';
import { SurveyResponsesModule } from './application/survey-responses/survey-responses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    SurveysModule,
    PanicAlertsModule,
    SurveyResponsesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
