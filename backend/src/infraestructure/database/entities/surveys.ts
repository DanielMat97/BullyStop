import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { SurveyResponse } from './survey-response';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'json' })
  questions: { question: string; type: string; options?: string[] }[];

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => SurveyResponse, (response) => response.survey)
  responses: SurveyResponse[];
}
