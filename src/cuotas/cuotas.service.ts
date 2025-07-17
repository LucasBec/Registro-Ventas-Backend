import { Injectable } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuota } from './cuota.entity';
import { Repository } from 'typeorm';
import { Venta } from '../ventas/venta.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CuotasService {
  constructor(
    @InjectRepository(Cuota)
    private readonly cuotaRepo: Repository<Cuota>,
  ) {}

  async createCuota(dto: CreateCuotaDto) {
    const cuota = this.cuotaRepo.create({
      numeroCuota: dto.numeroCuota,
      monto: dto.monto,
      fechaPago: dto.fechaPago,
      pagada: dto.pagada ?? false,
      venta: { id: dto.ventaId } as Venta,
    });

    return this.cuotaRepo.save(cuota);
  }

  async confirmPay(id: number): Promise<Cuota> {
    const cuota = await this.cuotaRepo.findOne({ where: { id } });
    if (!cuota) throw new NotFoundException('Cuota no encontrada');
    cuota.pagada = true;
    return this.cuotaRepo.save(cuota);
  }

  async unconfirmPay(id: number): Promise<Cuota> {
    const cuota = await this.cuotaRepo.findOne({ where: { id } });
    if (!cuota) throw new NotFoundException('Cuota no encontrada');
    cuota.pagada = false;
    return this.cuotaRepo.save(cuota);
  }

  findAll() {
    return this.cuotaRepo.find();
  }

  findOne(id: number) {
    return this.cuotaRepo.findOne({ where: { id } });
  }

  async findByVentaId(ventaId: number): Promise<any[]> {
    const cuotas = await this.cuotaRepo.find({
      where: { venta: { id: ventaId } },
      relations: ['venta'],
    });

    return cuotas.map((c) => ({
      id: c.id,
      numeroCuota: c.numeroCuota,
      monto: c.monto,
      fechaPago: c.fechaPago,
      pagada: c.pagada,
      ventaId: c.venta?.id,
    }));
  }

  async updateCuota(id: number, dto: UpdateCuotaDto) {
    const result = await this.cuotaRepo.update(id, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`No se encontró la cuota con id ${id}`);
    }
    return result;
  }

  async deleteCuota(id: number) {
    const result = await this.cuotaRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No se encontró la cuota con id ${id}`);
    }
    return result;
  }
}
