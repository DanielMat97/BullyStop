import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PanicAlert } from './panic-alerts';
import { SurveyResponse } from './survey-response';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @Column({ type: 'varchar', length: 50 })
  grade: string;

  @Column({ type: 'varchar', nullable: true })
  emergencyContact: string;

  @OneToMany(() => PanicAlert, (alert) => alert.user)
  alerts: PanicAlert[];

  @OneToMany(() => SurveyResponse, (response) => response.user)
  surveyResponses: SurveyResponse[];
}
