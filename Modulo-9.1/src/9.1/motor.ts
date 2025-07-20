import {
  LineaTicket,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TicketFinal,
  TotalPorTipoIva,
  TipoIva,
} from "./modelo";

const porcentajeIVA: Record<TipoIva, number> = {
  general: 21,
  reducido: 10,
  superreducidoA: 5,
  superreducidoB: 4,
  superreducidoC: 0,
  sinIva: 0,
};

const redondear = (valor: number): number => parseFloat(valor.toFixed(2));

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const lineas: ResultadoLineaTicket[] = [];
  const desglose: Record<TipoIva, number> = {
    general: 0,
    reducido: 0,
    superreducidoA: 0,
    superreducidoB: 0,
    superreducidoC: 0,
    sinIva: 0,
  };

  let totalSinIva = 0;
  let totalConIva = 0;

  for (const linea of lineasTicket) {
    const { producto, cantidad } = linea;
    const precioSinIva = producto.precio * cantidad;
    const ivaPorcentaje = porcentajeIVA[producto.tipoIva];
    const iva = (precioSinIva * ivaPorcentaje) / 100;
    const precioConIva = precioSinIva + iva;

    totalSinIva += precioSinIva;
    totalConIva += precioConIva;
    desglose[producto.tipoIva] += iva;

    lineas.push({
      nombre: producto.nombre,
      cantidad,
      precionSinIva: redondear(precioSinIva),
      tipoIva: producto.tipoIva,
      precioConIva: redondear(precioConIva),
    });
  }

  const total: ResultadoTotalTicket = {
    totalSinIva: redondear(totalSinIva),
    totalConIva: redondear(totalConIva),
    totalIva: redondear(totalConIva - totalSinIva),
  };

  const desgloseIva: TotalPorTipoIva[] = Object.entries(desglose).map(
    ([tipoIva, cuantia]) => ({
      tipoIva: tipoIva as TipoIva,
      cuantia: redondear(cuantia),
    })
  );

  return {
    lineas,
    total,
    desgloseIva,
  };
};