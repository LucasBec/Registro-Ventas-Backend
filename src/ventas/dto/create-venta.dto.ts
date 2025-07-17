import {
  IsString,
  IsDecimal,
  IsDateString,
  IsBoolean,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCuotaDto } from '../../cuotas/dto/create-cuota.dto';

export class CreateVentaDto {
  @IsString()
  comprador: string;

  @IsString()
  modelo: string;

  @IsDecimal()
  precioVenta: number;

  @IsDecimal()
  precioCompra: number;

  @IsString()
  formaPago: string;

  @IsDateString()
  fecha: Date;

  @IsString()
  plataforma: string;

  @IsBoolean()
  confirmada?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCuotaDto)
  cuotas?: CreateCuotaDto[];
}
