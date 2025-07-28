import {
  calcularNotaMedia,
  FichaAlumno,
  calcularNotaMediaAlumnos,
  Notas,
  calcularNotaFinal,
} from "./main";

describe("calcularNotaMedia", () => {
  it("debería la nota media de un alumno", () => {
    // Arrange
    const notas: number[] = [7, 8, 9];

    // Act
    const result = calcularNotaMedia(notas);

    // Assert
    const notaMedia = 8;

    expect(result).toBe(notaMedia);
  });

  it("debería la nota media de un alumno", () => {
    // Arrange
    const notas: number[] = [6, 7, 8];

    // Act
    const result = calcularNotaMedia(notas);

    // Assert
    const notaMedia = 7;

    expect(result).toBe(notaMedia);
  });

  it("debería la nota media de un alumno", () => {
    // Arrange
    const notas: number[] = [3, 2, 6];

    // Act
    const result = calcularNotaMedia(notas);

    // Assert
    const notaMedia = 3.67;

    expect(result).toBe(notaMedia);
  });
});

describe("calcularNotaMediaAlumnos", () => {
  it("debería la nota media de varios alumnos", () => {
    // Arrange
    const fichaAlumnos = [
      { alumno: "Juan Perez", notas: [7, 8, 9] },
      { alumno: "Maria Lopez", notas: [6, 7, 8] },
    ];

    // Act
    const result = calcularNotaMediaAlumnos(fichaAlumnos);

    // Assert
    const notasMedias = [
      { alumno: "Juan Perez", notaMedia: 8 },
      { alumno: "Maria Lopez", notaMedia: 7 },
    ];

    expect(result).toEqual(notasMedias);
  });
});

describe("calcularNotafinal", () => {
  it("debería calcular la nota final de un alumno", () => {
    //arrange
    const notasMediaPracticas = 8;
    const notasMediaExamenes = 7;

    //act
    const result = calcularNotaFinal(notasMediaPracticas, notasMediaExamenes);

    //assert
    const notaFinal = 7.6;

    expect(result).toEqual(notaFinal);
  });

  it("debería calcular la nota final de un alumno", () => {
    //arrange
    const notasMediaPracticas = 6;
    const notasMediaExamenes = 7;

    //act
    const result = calcularNotaFinal(notasMediaPracticas, notasMediaExamenes);

    //assert
    const notaFinal = 6.4;

    expect(result).toEqual(notaFinal);
  });

  it("debería calcular la nota final de un alumno", () => {
    //arrange
    const notasMediaPracticas = 3;
    const notasMediaExamenes = 2;

    //act
    const result = calcularNotaFinal(notasMediaPracticas, notasMediaExamenes);

    //assert
    const notaFinal = 2.6;

    expect(result).toEqual(notaFinal);
  });
});
