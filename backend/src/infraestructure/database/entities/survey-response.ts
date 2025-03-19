import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users';
import { Survey } from './surveys';

@Entity('survey_responses')
export class SurveyResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  answers: { question: string; answer: string | number }[];

  @CreateDateColumn()
  submittedAt: Date;

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
