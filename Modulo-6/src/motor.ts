import {
  puntuacion,
  dameMensajeFinal,
  damePuntuacionCarta,
  sumaPuntuacion,
  actualizarPuntuacion,
} from "./model";
import { obtenerUrlCarta, pintarUrlCarta, muestraPuntuacion } from "./ui";

//Devolver numero aleatorio
export const obtenerNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

//Función para saltarse los numeros 8 y 9
export const obteneNumeroCarta = (numeroAleatorio: number): number => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }
  return numeroAleatorio;
};

//Verificar si la puntuación supera 7.5
export const verificarPartida = (): void => {
  if (puntuacion > 7.5) {
    mostrarMensaje("Game Over 💀");
    deshabilitarBotonCarta(true);
  }

  if (puntuacion === 7.5) {
    mostrarMensaje("¡He ganado la partida! 🥳");
    deshabilitarBotonCarta(true);
  }
};

//Mostrar mensaje de "GAME OVER" por pantalla
export const mostrarMensaje = (mensaje: string): void => {
  const mensajeDiv = document.getElementById("mensaje");
  if (
    mensajeDiv !== null &&
    mensajeDiv !== undefined &&
    mensajeDiv instanceof HTMLDivElement
  ) {
    mensajeDiv.textContent = mensaje;
  }
};

//Desabilita el boton si superera 7.5
export const deshabilitarBotonCarta = (estaHabilitado: boolean): void => {
  const botonDameCarta = document.getElementById("dameCarta");
  if (
    botonDameCarta !== null &&
    botonDameCarta !== undefined &&
    botonDameCarta instanceof HTMLButtonElement
  ) {
    botonDameCarta.disabled = estaHabilitado;
  }
};

//Mostrar Mensaje sobre plantarme y desabilitar boton "Dame carta"
//Funcion secundaria
export const manejarClicPlantarme = (): void => {
  deshabilitarBotonCarta(true);
  mostrarMensajeFinal();
};

//Funcion Mensaje final
export const mostrarMensajeFinal = (): void => {
  let mensaje = dameMensajeFinal();
  mostrarMensaje(mensaje);
};

//funcion principal
export const dameCarta = () => {
  const numeroAleatorio = obtenerNumeroAleatorio();
  const carta = obteneNumeroCarta(numeroAleatorio);
  const urlCarta = obtenerUrlCarta(carta);
  pintarUrlCarta(urlCarta);
  const puntos = damePuntuacionCarta(carta);
  const puntosSumados = sumaPuntuacion(puntos);
  actualizarPuntuacion(puntosSumados);
  muestraPuntuacion();
  verificarPartida();
};
