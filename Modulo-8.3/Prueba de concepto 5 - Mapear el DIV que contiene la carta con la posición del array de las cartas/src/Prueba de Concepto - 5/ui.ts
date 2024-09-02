//Crear un bucle for que vaya iterandose sobre cada data indice id de cada div con el add eventlistener.
//en cada vuelta del buclre creae un console.log con un saludo para comprobar su funcionamiento
import { tablero } from "./modelo";

const crearTablero = () => {
  console.log("HOLaa");
  for (let indice = 0; indice < tablero.cartas.length; indice++) {
    const dataIndiceId = `[data-indice-id="${indice}"]`;
    const elementoDiv = document.querySelector(`div${dataIndiceId}`);
    if (
      elementoDiv !== null &&
      elementoDiv !== undefined &&
      elementoDiv instanceof HTMLDivElement
    ) {
      elementoDiv.addEventListener("click", () => {
        console.log("Hola!!");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    crearTablero();
  });
};
