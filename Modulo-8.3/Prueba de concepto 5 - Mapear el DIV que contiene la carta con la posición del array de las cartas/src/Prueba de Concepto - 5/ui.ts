//Crear un bucle for que vaya iterandose sobre cada data indice id de cada div con el add eventlistener.
//en cada vuelta del buclre creae un console.log con un saludo para comprobar su funcionamiento
import { Carta, tablero, Tablero } from "./modelo";
import {
  sePuedeVoltearLaCarta,
  iniciaPartida,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
} from "./motor";

export const crearTablero = () => {
  for (let indice = 0; indice < tablero.cartas.length; indice++) {
    mapearDivsACartas(indice, tablero);
  }
};

const mapearDivsACartas = (indiceCarta: number, tablero: Tablero) => {
  const dataIndiceId = `[data-indice-id="${indiceCarta}"]`;
  const elementoDiv = document.querySelector(`div${dataIndiceId}`);
  if (
    elementoDiv !== null &&
    elementoDiv !== undefined &&
    elementoDiv instanceof HTMLDivElement
  ) {
    elementoDiv.addEventListener("click", () => {
      if (tablero.estadoPartida !== "PartidaNoIniciada") {
        manejadorDivCarta(indiceCarta, tablero);
      }
    });
  }
};

const manejadorDivCarta = (indiceCarta: number, tablero: Tablero) => {
  if (sePuedeVoltearLaCarta(tablero, indiceCarta)) {
    volteaCarta(indiceCarta, tablero);
  } else {
    //Crear un mensaje en pantalla que muestre el mensaje
    alert("No se le puede dar la vuelta a la carta");
  }
};

const volteaCarta = (indiceCarta: number, tablero: Tablero) => {
  voltearLaCarta(tablero, indiceCarta);
  mostrarImagenAnimal(indiceCarta);
  mirarSiEsLaSegundaCarta(tablero);
};

export const agregarEventoBotonIniciarPartida = () => {
  const botonEmpezarPartida = document.getElementById("botonIniciarPartida");
  if (
    botonEmpezarPartida !== null &&
    botonEmpezarPartida !== undefined &&
    botonEmpezarPartida instanceof HTMLButtonElement
  ) {
    botonEmpezarPartida.addEventListener("click", () => {
      clickBotonEmpezarPartida();
    });
  }
};

const clickBotonEmpezarPartida = () => {
  iniciaPartida(tablero);
};

const mostrarImagenAnimal = (indiceCarta: number) => {
  const dataIndiceId = `[data-indice-id="${indiceCarta}"]`;
  const elementoImagen = document.querySelector(`img${dataIndiceId}`);

  if (
    elementoImagen !== null &&
    elementoImagen !== undefined &&
    elementoImagen instanceof HTMLImageElement
  ) {
    elementoImagen.src = tablero.cartas[indiceCarta].imagen;
  }
};

const mirarSiEsLaSegundaCarta = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (indiceA !== undefined && indiceB !== undefined) {
    if (sonPareja(indiceA, indiceB, tablero)) {
      parejaEncontrada(tablero, indiceA, indiceB);
      //crear funcion para comprobar de que hemos encontrado toddas las parejas
    } else {
      parejaNoEncontrada(tablero, indiceA, indiceB);
      voltearLasCartasQueNoSonPareja(tablero.cartas);
    }
  }
};

const voltearLasCartasQueNoSonPareja = (cartas: Carta[]) => {
  setTimeout(() => {
    ponerImagenBocaAbajo(cartas);
  }, 1000);
};

const ponerImagenBocaAbajo = (cartas: Carta[]) => {
  for (let indice = 0; indice < cartas.length; indice++) {
    if (!cartas[indice].encontrada && !cartas[indice].estaVuelta) {
      darleLaVueltaALaCarta(indice);
    }
  }
};

const darleLaVueltaALaCarta = (indiceCarta: number) => {
  const dataIndiceId = `[data-indice-id="${indiceCarta}"]`;
  const elementoImagen = document.querySelector(`img${dataIndiceId}`);

  if (
    elementoImagen !== null &&
    elementoImagen !== undefined &&
    elementoImagen instanceof HTMLImageElement
  ) {
    elementoImagen.src = "";
  }
};
