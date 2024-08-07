import { vi } from "vitest";

import { EstadoPartida, partida } from "./model";
import {
  damePuntuacionCarta,
  obtenerEstadoPartida,
  sumarPuntuacion,
} from "./motor";

describe("damePuntuacionCarta", () => {
  it("Deberia devolver 5 si el valor de la carta es 5", () => {
    //Arrange
    const carta: number = 5;
    const resultadoEsperado: number = 5;
    //Act
    const resultado: number = damePuntuacionCarta(carta);
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Deberia devolver 0.5 si el valor de la carta es 9", () => {
    //Arrange
    const carta: number = 9;
    const resultadoEsperado: number = 0.5;
    //Act
    const resultado: number = damePuntuacionCarta(carta);
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });
});

describe("sumarPuntuacion", () => {
  it("Debería devolver 10 si el numero aleatorio es un 8", () => {
    //Arrage
    const numeroAleatorio: number = 8;
    const resultadoEsperado: number = 10;
    //Act
    const resultado: number = sumarPuntuacion(numeroAleatorio);
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Debería devolver el valor de la carta si el numero aleatorio es 5", () => {
    //Arrange
    const numeroAleatorio: number = 5;
    const resultadoEsperado: number = 5;
    //Act
    const resultado: number = sumarPuntuacion(numeroAleatorio);
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });
});

describe("obtenerEstadoPartida", () => {
  it("Debería devolver por DEBAJO_MAXIMO cuando puntuación es menor a 7.5", () => {
    //Arrange
    const estadoEsperado: EstadoPartida = "POR_DEBAJO_MAXIMO";
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(4);
    //Act
    const resultado = obtenerEstadoPartida();
    //Assert
    expect(resultado).toBe(estadoEsperado);
  });

  it("Debería devolver por JUSTO_MAXIMA cuando puntuación es igual a 7.5", () => {
    //Arrange
    const estadoEsperado: EstadoPartida = "JUSTO_MAXIMA";
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(7.5);
    //Act
    const resultado = obtenerEstadoPartida();
    //Assert
    expect(resultado).toBe(estadoEsperado);
  });

  it("Debería devolver por TE_HAS_PASADO cuando puntuación es superior a 7.5", () => {
    //Arrange
    const estadoEsperado: EstadoPartida = "TE_HAS_PASADO";
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(8);
    //Act
    const resultado = obtenerEstadoPartida();
    //Assert
    expect(resultado).toBe(estadoEsperado);
  });
});
