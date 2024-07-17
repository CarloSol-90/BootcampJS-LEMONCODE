//Crear una variable para almacenar la función
let puntuacion: number = 0;

// Función para mostrar la puntuación actual en el div
function muestraPuntuacion() {
  const puntuacionDiv = document.getElementById("puntuacion");
  if (puntuacionDiv) {
    puntuacionDiv.innerText = "Puntuación actual: " + puntuacion;
  }
}

// Invocar la función cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();
});

//Devolver numero aleatorio
const obtenerNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

//Función para saltarse los numeros 8 y 9
const obteneNumeroCarta = (numeroAleatorio: number): number => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }
  return numeroAleatorio;
};

//Obtener URL carta
const obtenerUrlCarta = (carta: number): string => {
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
const pintarUrlCarta = (urlCarta: string) => {
  const elementoImagen = document.getElementById("cartaImg");
  if (
    elementoImagen !== null &&
    elementoImagen !== undefined &&
    elementoImagen instanceof HTMLImageElement
  ) {
    elementoImagen.src = urlCarta;
  }
};

const damePuntuacionCarta = (carta: number) => {
  return carta > 7 ? 0.5 : carta;
};

const sumaPuntuacion = (puntos: number) => {
  return puntos + puntuacion;
};

const actualizarPuntuacion = (nuevosPuntos: number) => {
  puntuacion = nuevosPuntos;
};

//funcion principal
const dameCarta = () => {
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

const botonDameCarta = document.getElementById("dameCarta");
if (
  botonDameCarta !== null &&
  botonDameCarta !== undefined &&
  botonDameCarta instanceof HTMLButtonElement
) {
  botonDameCarta.addEventListener("click", dameCarta);
}

//Función para saltarse los numeros 8 y 9
const sumarPuntuacion = (numeroAleatorio: number): number => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }
  return numeroAleatorio;
};

//Verificar si la puntuación supera 7.5
const verificarPartida = (): void => {
  if (puntuacion > 7.5) {
    mostrarMensaje("Game Over 💀");
    deshabilitarBotonCarta(true);
  }

  if (puntuacion === 7.5) {
    mostrarMensaje("¡He ganado la partida! 🥳");
    deshabilitarBotonCarta(true);
  }
};

//Desabilita el boton si superera 7.5
const deshabilitarBotonCarta = (estaHabilitado: boolean): void => {
  const botonDameCarta = document.getElementById("dameCarta");
  if (
    botonDameCarta !== null &&
    botonDameCarta !== undefined &&
    botonDameCarta instanceof HTMLButtonElement
  ) {
    botonDameCarta.disabled = estaHabilitado;
  }
};

//Mostrar mensaje de "GAME OVER" por pantalla
const mostrarMensaje = (mensaje: string): void => {
  const mensajeDiv = document.getElementById("mensaje");
  if (
    mensajeDiv !== null &&
    mensajeDiv !== undefined &&
    mensajeDiv instanceof HTMLDivElement
  ) {
    mensajeDiv.textContent = mensaje;
  }
};

//Mostrar Mensaje sobre plantarme y desabilitar boton "Dame carta"
//Funcion secundaria
const manejarClicPlantarme = (): void => {
  deshabilitarBotonCarta(true);
  mostrarMensajeFinal();
};

const dameMensajeFinal = () => {
  if (puntuacion <= 4) {
    return "Has sido muy conservador 🙄";
  } else if (puntuacion <= 5) {
    return "Te ha entrado el canguelo eh? 😆";
  } else if (puntuacion > 5 && puntuacion < 7.5) {
    return "Casi casi... 😏";
  } else if (puntuacion === 7.5) {
    return "¡Lo has clavado! ¡Enhorabuena! 🥳";
  }

  return "";
};

//Funcion Mensaje final
const mostrarMensajeFinal = (): void => {
  let mensaje = dameMensajeFinal();
  mostrarMensaje(mensaje);
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

const nuevaPartida = () => {
  actualizarPuntuacion(0);
  muestraPuntuacion();
  pintarUrlCarta("src/img/cartaBack.jpg");
  deshabilitarBotonCarta(false);
  mostrarMensaje("");
};

const botonNuevaPartida = document.getElementById("nuevaPartida");

if (
  botonNuevaPartida !== null &&
  botonNuevaPartida !== undefined &&
  botonNuevaPartida instanceof HTMLButtonElement
) {
  botonNuevaPartida.addEventListener("click", nuevaPartida);
}
