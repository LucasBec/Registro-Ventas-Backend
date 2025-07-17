import { IsBoolean, IsDateString, IsNumber, IsOptional, Max, Min, IsNotEmpty } from "class-validator";

export class CreateCuotaDto {
    @Min(1)
    @Max(12)
    @IsNumber()
    numeroCuota: number;
    
    @IsNumber()
    monto: number;
  
    @IsDateString()
    fechaPago: Date;
  
    @IsOptional()
    @IsBoolean()
    pagada?: boolean;
  
    @IsNumber()
    @IsNotEmpty()
    ventaId: number;
}