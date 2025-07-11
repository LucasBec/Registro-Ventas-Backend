import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './venta.entity';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  crear(@Body() dto: CreateVentaDto): Promise<Venta> {
    return this.ventasService.createVenta(dto);
  }

  @Get()
  obtenerTodas(): Promise<Venta[]> {
    return this.ventasService.getVentas();
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVentaDto) {
    return this.ventasService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.delete(id);
  }
}
