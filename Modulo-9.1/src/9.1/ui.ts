import { calculaTicket } from "./motor";
import { LineaTicket } from "./modelo";

const productos: LineaTicket[] = [
  {
    producto: { nombre: "Legumbres", precio: 2, tipoIva: "general" },
    cantidad: 2,
  },
  {
    producto: { nombre: "Perfume", precio: 20, tipoIva: "general" },
    cantidad: 3,
  },
  {
    producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" },
    cantidad: 6,
  },
  {
    producto: { nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" },
    cantidad: 1,
  },
];

export const render = () => {
  const ticket = calculaTicket(productos);
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <h1>Ticket de Compra</h1>
    <table>
      <thead>
        <tr><th>Producto</th><th>Cantidad</th><th>Precio sin IVA</th><th>Tipo IVA</th><th>Precio con IVA</th></tr>
      </thead>
      <tbody>
        ${ticket.lineas
          .map(
            (linea) => `
          <tr>
            <td>${linea.nombre}</td>
            <td>${linea.cantidad}</td>
            <td>${linea.precionSinIva.toFixed(2)}€</td>
            <td>${linea.tipoIva}</td>
            <td>${linea.precioConIva.toFixed(2)}€</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    <h2>Totales</h2>
    <p>Total sin IVA: ${ticket.total.totalSinIva.toFixed(2)}€</p>
    <p>Total IVA: ${ticket.total.totalIva.toFixed(2)}€</p>
    <p>Total con IVA: ${ticket.total.totalConIva.toFixed(2)}€</p>
    <h3>Desglose por tipo de IVA</h3>
    <ul>
      ${ticket.desgloseIva
        .map(
          (d) =>
            `<li>${d.tipoIva}: ${d.cuantia.toFixed(2)}€</li>`
        )
        .join("")}
    </ul>
  `;
};