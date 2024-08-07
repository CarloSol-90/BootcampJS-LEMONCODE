import { partida } from "./model";
import {
  damePuntuacionCarta,
  sumaPuntuacion,
  actualizarPuntuacion,
} from "./motor";

// Función para mostrar la puntuación actual en el div
export function muestraPuntuacion() {
  const puntuacionDiv = document.getElementById("puntuacion");
  if (puntuacionDiv) {
    puntuacionDiv.innerText = "Puntuación actual: " + partida.puntuacion;
  }
}

//Obtener URL carta
export const obtenerUrlCarta = (carta: number): string => {
  let imgSrc = "";
  switch (carta) {
    case 1:
      imgSrc = "src/img/carta1.jpg";
      break;
    case 2:
      imgSrc = "src/img/carta2.jpg";
      break;
    case 3:
      imgSrc = "src/img/carta3.jpg";
      break;
    case 4:
      imgSrc = "src/img/carta4.jpg";
      break;
    case 5:
      imgSrc = "src/img/carta5.jpg";
      break;
    case 6:
      imgSrc = "src/img/carta6.jpg";
      break;
    case 7:
      imgSrc = "src/img/carta7.jpg";
      break;
    case 10:
      imgSrc = "src/img/carta10.jpg";
      break;
    case 11:
      imgSrc = "src/img/carta11.jpg";
      break;
    case 12:
      imgSrc = "src/img/carta12.jpg";
      break;
    default:
      imgSrc = "src/img/cartaBack.jpg";
  }
  return imgSrc;
};

//Funcion para pintar la carta
export const pintarUrlCarta = (urlCarta: string) => {
  const elementoImagen = document.getElementById("cartaImg");
  if (
    elementoImagen !== null &&
    elementoImagen !== undefined &&
    elementoImagen instanceof HTMLImageElement
  ) {
    elementoImagen.src = urlCarta;
  }
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

export const botonDameCarta = document.getElementById("dameCarta");
if (
  botonDameCarta !== null &&
  botonDameCarta !== undefined &&
  botonDameCarta instanceof HTMLButtonElement
) {
  botonDameCarta.addEventListener("click", dameCarta);
}

//Mostrar Mensaje sobre plantarme y desabilitar boton "Dame carta"
//Funcion secundaria
export const manejarClicPlantarme = (): void => {
  deshabilitarBotonCarta(true);
  mostrarMensajeFinal();
};

// Funcionalidad boton Plantarme
const botonPlantarme = document.getElementById("botonPlantarme");
if (
  botonPlantarme !== null &&
  botonPlantarme !== undefined &&
  botonPlantarme instanceof HTMLButtonElement
) {
  botonPlantarme.addEventListener("click", manejarClicPlantarme);
}

export const nuevaPartida = () => {
  actualizarPuntuacion(0);
  muestraPuntuacion();
  pintarUrlCarta("src/img/cartaBack.jpg");
  deshabilitarBotonCarta(false);
  mostrarMensaje("");
};

export const botonNuevaPartida = document.getElementById("nuevaPartida");

if (
  botonNuevaPartida !== null &&
  botonNuevaPartida !== undefined &&
  botonNuevaPartida instanceof HTMLButtonElement
) {
  botonNuevaPartida.addEventListener("click", nuevaPartida);
}

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
  if (partida.puntuacion > 7.5) {
    mostrarMensaje("Game Over 💀");
    deshabilitarBotonCarta(true);
  }

  if (partida.puntuacion === 7.5) {
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

//Funcion Mensaje final
export const mostrarMensajeFinal = (): void => {
  let mensaje = dameMensajeFinal();
  mostrarMensaje(mensaje);
};

export const dameMensajeFinal = () => {
  if (partida.puntuacion <= 4) {
    return "Has sido muy conservador 🙄";
  } else if (partida.puntuacion <= 5) {
    return "Te ha entrado el canguelo eh? 😆";
  } else if (partida.puntuacion > 5 && partida.puntuacion < 7.5) {
    return "Casi casi... 😏";
  } else if (partida.puntuacion === 7.5) {
    return "¡Lo has clavado! ¡Enhorabuena! 🥳";
  }

  return "";
};
