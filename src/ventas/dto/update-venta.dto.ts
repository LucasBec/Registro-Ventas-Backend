import {
  IsString,
  IsOptional,
  IsDecimal,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class UpdateVentaDto {
  @IsOptional()
  @IsString()
  comprador?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsDecimal()
  precioVenta?: number;

  @IsOptional()
  @IsDecimal()
  precioCompra?: number;

  @IsOptional()
  @IsString()
  formaPago?: string;

  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @IsOptional()
  @IsString()
  plataforma?: string;

  @IsOptional()
  @IsBoolean()
  confirmada?: boolean;
}