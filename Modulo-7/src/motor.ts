import { partida, EstadoPartida } from "./model";

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

export const obtenerEstadoPartida = (): EstadoPartida => {
  if (partida.puntuacion === 7.5) {
    partida.estadoPartida = "JUSTO_MAXIMA";
  }
  if (partida.puntuacion > 7.5) {
    partida.estadoPartida = "TE_HAS_PASADO";
  }
  return partida.estadoPartida;
};
