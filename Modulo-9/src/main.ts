export interface FichaAlumno {
  alumno: string;
  notas: number[];
}

export interface Notas {
  alumno: string;
  notaMedia: number;
}

export const calcularNotaMediaAlumnos = (
  fichaAlumnos: FichaAlumno[]
): Notas[] => {
  return fichaAlumnos.map(ficha => ({
    alumno: ficha.alumno,
    notaMedia: calcularNotaMedia(ficha.notas),
  }));
};

export const calcularNotaMedia = (notas: number[]): number => {
  const sumaNotas = notas.reduce((acc, nota) => acc + nota, 0);
  const notaMedia = sumaNotas / notas.length;
  const notaMediaRedondeada = Number(notaMedia.toFixed(2));

  return notaMediaRedondeada;
};

interface FichaFinalAlumno {
  alumno: string;
  notasPracticas: number[];
  notasExamenes: number[];
}

interface CalificacionesAlumno {
  alumno: string;
  notaFinal: number;
}

export const calcularCalificacionAlumno = (
  fichaAlumno: FichaFinalAlumno[]
): CalificacionesAlumno[] => {
  //TODO: implementar la función
};

export const calcularNotaFinal = (
  notasMediaPracticas: number,
  notasMediaExamenes: number
): number => {
  const notaFinal = notasMediaPracticas * 0.6 + notasMediaExamenes * 0.4;
  const notaFinalRedondeada = Number(notaFinal.toFixed(2));

  return notaFinalRedondeada;
};
