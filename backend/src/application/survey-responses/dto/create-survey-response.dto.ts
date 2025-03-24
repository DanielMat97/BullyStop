import { IsNumber, IsNotEmpty, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsNumber()
  @IsNotEmpty()
  question: number;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class CreateSurveyResponseDto {
  @IsNumber()
  @IsNotEmpty()
  surveyId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
} 