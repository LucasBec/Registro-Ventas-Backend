import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}