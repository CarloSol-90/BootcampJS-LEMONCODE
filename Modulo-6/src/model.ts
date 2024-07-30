//Crear una variable para almacenar la función
export let puntuacion: number = 0;

export const damePuntuacionCarta = (carta: number) => {
  return carta > 7 ? 0.5 : carta;
};

export const actualizarPuntuacion = (nuevosPuntos: number) => {
  puntuacion = nuevosPuntos;
};

export const sumaPuntuacion = (puntos: number) => {
  return puntos + puntuacion;
};

//Función para saltarse los numeros 8 y 9
export const sumarPuntuacion = (numeroAleatorio: number): number => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }
  return numeroAleatorio;
};

export const dameMensajeFinal = () => {
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
