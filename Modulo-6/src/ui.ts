import { puntuacion, actualizarPuntuacion } from "./model";
import {
  dameCarta,
  manejarClicPlantarme,
  deshabilitarBotonCarta,
  mostrarMensaje,
} from "./motor";

// Función para mostrar la puntuación actual en el div
export function muestraPuntuacion() {
  const puntuacionDiv = document.getElementById("puntuacion");
  if (puntuacionDiv) {
    puntuacionDiv.innerText = "Puntuación actual: " + puntuacion;
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

export const botonDameCarta = document.getElementById("dameCarta");
if (
  botonDameCarta !== null &&
  botonDameCarta !== undefined &&
  botonDameCarta instanceof HTMLButtonElement
) {
  botonDameCarta.addEventListener("click", dameCarta);
}

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
