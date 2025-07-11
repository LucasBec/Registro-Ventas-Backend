export class CreateVentaDto {
    comprador: string;
    modelo: string;
    precioVenta: number;
    precioCompra: number;
    formaPago: string;
    fecha: string;
    plataforma: string;
    confirmada?: boolean;
}