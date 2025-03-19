import { IsString, IsArray, IsNotEmpty, ValidateNested, ArrayMinSize, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SINGLE_CHOICE = 'single_choice',
  TEXT = 'text',
  SCALE = 'scale'
}

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];
}

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => QuestionDto)
  questions: QuestionDto[];
} 