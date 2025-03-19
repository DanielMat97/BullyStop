import { PartialType } from '@nestjs/mapped-types';
import { CreatePanicAlertDto } from './create-panic-alert.dto';

export class UpdatePanicAlertDto extends PartialType(CreatePanicAlertDto) {} 