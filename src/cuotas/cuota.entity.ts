import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from '../ventas/venta.entity';

@Entity()
export class Cuota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numeroCuota: number;

  @Column({ type: 'date', nullable: true })
  fechaPago: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ default: false })
  pagada: boolean;

  @ManyToOne(() => Venta, venta => venta.cuotas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ventaId' })
  venta: Venta;

  @Column()
  ventaId: number;
}