import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cuota } from '../cuotas/cuota.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comprador: string;

  @Column()
  modelo: string;

  @Column('decimal')
  precioVenta: number;

  @Column('decimal')
  precioCompra: number;

  @Column()
  formaPago: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  plataforma: string;

  @Column({ default: false })
  confirmada: boolean;

  @OneToMany(() => Cuota, (cuota) => cuota.venta, { cascade: true, eager: true })
  cuotas: Cuota[];
}
