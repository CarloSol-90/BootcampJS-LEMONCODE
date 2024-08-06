import { partida } from "./model";

export const damePuntuacionCarta = (carta: number) => {
  return carta > 7 ? 0.5 : carta;
};

export const actualizarPuntuacion = (nuevosPuntos: number) => {
  partida.puntuacion = nuevosPuntos;
};

export const sumaPuntuacion = (puntos: number) => {
  return puntos + partida.puntuacion;
};

//Función para saltarse los numeros 8 y 9
export const sumarPuntuacion = (numeroAleatorio: number): number => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }
  return numeroAleatorio;
};
