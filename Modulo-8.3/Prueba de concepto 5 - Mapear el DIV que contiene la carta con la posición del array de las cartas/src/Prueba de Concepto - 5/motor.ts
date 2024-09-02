import { Carta } from "./modelo";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const cartasBarajadas = [...cartas]; // Crear una copia del array para no modificar el original

  for (let i = cartasBarajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Escoge un índice al azar entre 0 e i
    [cartasBarajadas[i], cartasBarajadas[j]] = [
      cartasBarajadas[j],
      cartasBarajadas[i],
    ]; // Intercambia las cartas
  }
  return cartasBarajadas;
};
