import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateCuotaDto } from '../../cuotas/dto/update-cuota.dto';

export class UpdateVentaDto {

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCuotaDto)
  cuotas?: UpdateCuotaDto[];
}