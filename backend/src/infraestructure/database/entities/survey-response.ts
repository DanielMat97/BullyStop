import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users';
import { Survey } from './surveys';

export enum SurveyResponseStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

@Entity('survey_responses')
export class SurveyResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: true })
  answers: { question: number; answer: string | string[] | number }[];

  @CreateDateColumn()
  submittedAt: Date;

  @Column({
    type: 'enum',
    enum: SurveyResponseStatus,
    default: SurveyResponseStatus.PENDING,
  })
  status: SurveyResponseStatus;

  @ManyToOne(() => User, (user) => user.surveyResponses, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Survey, (survey) => survey.responses, {
    onDelete: 'CASCADE',
  })
  survey: Survey;

  @CreateDateColumn()
  createdAt: Date;
}
