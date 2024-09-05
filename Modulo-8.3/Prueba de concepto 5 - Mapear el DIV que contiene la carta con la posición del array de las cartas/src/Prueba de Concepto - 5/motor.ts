import { Carta, Tablero } from "./modelo";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const cartasBarajadas = [...cartas]; // Crear una copia del array para no modificar el original

  for (let i = cartasBarajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Escoge un índice al azar entre 0 e i
    [{ ...cartasBarajadas[i] }, { ...cartasBarajadas[j] }] = [
      cartasBarajadas[j],
      cartasBarajadas[i],
    ]; // Intercambia las cartas
  }
  return cartasBarajadas;
};

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  return (
    !tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta
  );
  //si son false, que devuelvan true
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};
/*
/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
};

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = false;
  tablero.cartas[indiceB].encontrada = false;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
};

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
//export const esPartidaCompleta(tablero: Tablero) : boolean => {
//...
//}

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  const cartaBarajada: Carta[] = barajarCartas(tablero.cartas);
  tablero.cartas = [...cartaBarajada];
  tablero.estadoPartida = "CeroCartasLevantadas";
};
