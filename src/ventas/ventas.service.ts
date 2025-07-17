import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './venta.entity';
import { Repository } from 'typeorm';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Cuota } from '../cuotas/cuota.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,

    @InjectRepository(Cuota)
    private cuotaRepo: Repository<Cuota>
  ) {}

  async createVenta(dto: CreateVentaDto): Promise<Venta> {
    const { cuotas, ...resto } = dto;
  
    const venta = this.ventaRepo.create(resto);
  
    if (dto.formaPago === 'Cuotas' && Array.isArray(cuotas) && cuotas.length > 0) {
      venta.cuotas = cuotas.map((c) => {
        const cuota = new Cuota();
        cuota.numeroCuota = c.numeroCuota;
        cuota.monto = c.monto;
        cuota.fechaPago = new Date(c.fechaPago);
        cuota.pagada = c.pagada ?? false;
        return cuota;
      });
    }
    
    return await this.ventaRepo.save(venta);
  }

  async getVentas(): Promise<Venta[]> {
    return this.ventaRepo.find({
      relations: ['cuotas'],
    });
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    const venta = await this.ventaRepo.findOne({
      where: { id },
      relations: ['cuotas'],
    });
  
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }
    Object.assign(venta, updateVentaDto);
    await this.ventaRepo.save(venta);
  
    if (updateVentaDto.cuotas) {
      const cuotasEnviadas = updateVentaDto.cuotas;
      const cuotasActuales = venta.cuotas || [];
  
      const idsEnviados = cuotasEnviadas.filter(c => c.id).map(c => c.id);
  
      // Eliminar cuotas no pagadas que ya no están
      const cuotasAEliminar = cuotasActuales.filter(cuota =>
        !cuota.pagada && !idsEnviados.includes(cuota.id),
      );
  
      for (const cuota of cuotasAEliminar) {
        await this.cuotaRepo.delete(cuota.id);
      }

      for (const cuotaDto of cuotasEnviadas) {
        if (cuotaDto.id) {
          await this.cuotaRepo.update(cuotaDto.id, {
            ...cuotaDto,
          });
        } else {
          const nuevaCuota = this.cuotaRepo.create({
            ...cuotaDto,
            venta: { id: venta.id },
          });
          await this.cuotaRepo.save(nuevaCuota);
        }
      }
    }
    return this.ventaRepo.findOne({
      where: { id },
      relations: ['cuotas'],
    });
  }
  
  async delete(id: number): Promise<void> {
    await this.ventaRepo.delete(id);
  }

}
