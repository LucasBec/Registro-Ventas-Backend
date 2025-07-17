import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';

@Controller('cuotas')
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Post()
  create(@Body() createCuotaDto: CreateCuotaDto) {
    return this.cuotasService.createCuota(createCuotaDto);
  }

  @Get()
  findAll() {
    return this.cuotasService.findAll();
  }

  @Get('venta/:ventaId')
  findByVenta(@Param('ventaId') ventaId: number) {
    return this.cuotasService.findByVentaId(ventaId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCuotaDto: UpdateCuotaDto) {
    return this.cuotasService.updateCuota(id, updateCuotaDto);
  }

  @Patch(':id/confirm-pay')
  async confirmarPago(@Param('id') id: number) {
  return this.cuotasService.confirmPay(id);
}

  @Patch(':id/unconfirm-pay')
  async desconfirmarPago(@Param('id') id: number) {
    return this.cuotasService.unconfirmPay(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cuotasService.deleteCuota(id);
  }
}
