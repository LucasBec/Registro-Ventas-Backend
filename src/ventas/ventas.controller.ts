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
import { NotFoundException } from '@nestjs/common';
import { Cuota } from '../cuotas/cuota.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('ventas')
export class VentasController {
  constructor(
    private readonly ventasService: VentasService,
    @InjectRepository(Venta)
    private readonly ventasRepository: Repository<Venta>,
    @InjectRepository(Cuota)
    private readonly cuotasRepository: Repository<Cuota>,
  ) {}

  @Post()
  crear(@Body() dto: CreateVentaDto): Promise<Venta> {
    if (dto.cuotas && dto.cuotas.length > 12) {
      throw new Error('No se pueden registrar más de 12 cuotas');
    }
    return this.ventasService.createVenta(dto);
  }

  @Get()
  obtenerTodas(): Promise<Venta[]> {
    return this.ventasService.getVentas();
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVentaDto) {
    if (body.cuotas && body.cuotas.length > 12) {
      throw new Error('No se pueden registrar más de 12 cuotas');
    }
    return this.ventasService.update(id, body);
  }

  @Put(':id/cuotas')
  async actualizarCuotas(@Param('id') id: number, @Body() cuotas: Cuota[]) {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: ['cuotas'],
    });
    if (!venta) throw new NotFoundException('Venta no encontrada');
    const cuotasExistentes = venta.cuotas;
    const idsEnviados = cuotas.filter((c) => c.id).map((c) => c.id);
    const cuotasAEliminar = cuotasExistentes.filter(
      (c) => !idsEnviados.includes(c.id),
    );
    if (cuotasAEliminar.length > 0) {
      await this.cuotasRepository.remove(cuotasAEliminar);
    }
    const cuotasActualizadas = cuotas.map((c) => ({
      ...c,
      venta: venta,
    }));

    await this.cuotasRepository.save(cuotasActualizadas);

    return { message: 'Cuotas actualizadas correctamente' };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.delete(id);
  }

  @Get('deudores')
  async obtenerDeudores() {
    const ventas = await this.ventasRepository.find({
      relations: ['cuotas'],
    });

    return ventas
      .filter((venta) => venta.cuotas?.some((cuota) => !cuota.pagada))
      .map((venta) => {
        const deuda = venta.cuotas
          .filter((c) => !c.pagada)
          .reduce((acc, c) => acc + c.monto, 0);

        return {
          comprador: venta.comprador,
          modelo: venta.modelo,
          totalDeuda: deuda,
          cuotasImpagas: venta.cuotas.filter((c) => !c.pagada),
        };
      });
  }
}
