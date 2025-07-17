import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuota } from './cuota.entity';
import { CuotasService } from './cuotas.service';
import { CuotasController } from './cuotas.controller';
import { VentasModule } from '../ventas/ventas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cuota]),
    VentasModule,
  ],
  controllers: [CuotasController],
  providers: [CuotasService],
  exports: [CuotasService], 
})
export class CuotasModule {}