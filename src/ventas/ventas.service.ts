import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './venta.entity';
import { Repository } from 'typeorm';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,
  ) {}

  async createVenta(dto: CreateVentaDto): Promise<Venta> {
    const venta = this.ventaRepo.create(dto);
    return this.ventaRepo.save(venta);
  }

  async getVentas(): Promise<Venta[]> {
    return this.ventaRepo.find();
  }

  async update(id: number, datos: UpdateVentaDto): Promise<Venta> {
    const venta = await this.ventaRepo.findOneBy({ id });
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }
    Object.assign(venta, datos);
    return this.ventaRepo.save(venta);
  }

  async delete(id: number): Promise<void> {
    await this.ventaRepo.delete(id);
  }
}
