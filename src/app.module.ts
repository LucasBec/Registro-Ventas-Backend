import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasModule } from './ventas/ventas.module';
import { ConfigModule } from '@nestjs/config';
import { CuotasService } from './cuotas/cuotas.service';
import { CuotasController } from './cuotas/cuotas.controller';
import { Cuota } from './cuotas/cuota.entity';
import { Venta } from './ventas/venta.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    VentasModule,
    TypeOrmModule.forFeature([Cuota, Venta]),
  ],
  providers: [CuotasService],
  controllers: [CuotasController],
})
export class AppModule {}
