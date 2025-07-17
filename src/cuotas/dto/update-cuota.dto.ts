import { PartialType } from '@nestjs/mapped-types';
import { CreateCuotaDto } from './create-cuota.dto';
import { IsNumber } from 'class-validator';

export class UpdateCuotaDto extends PartialType(CreateCuotaDto) {
  @IsNumber()
  id: number;
}
