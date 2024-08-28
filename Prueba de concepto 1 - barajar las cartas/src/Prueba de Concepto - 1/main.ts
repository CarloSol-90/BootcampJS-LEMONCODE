const animales = [
  "🦊",
  "🦝",
  "🐹",
  "🐷",
  "🐮",
  "🐸",
  "🦊",
  "🦝",
  "🐹",
  "🐷",
  "🐮",
  "🐸",
];

// Función para barajar (mezclar) los elementos de un array.
function barajarAnimales(array: string[]) {
  // Inicializamos `indiceActual` con la longitud del array (número de elementos).
  let indiceActual = array.length,
    indiceAleatorio;

  // Mientras haya elementos que no hayan sido mezclados...
  while (indiceActual !== 0) {
    // Generamos un índice aleatorio entre 0 y `indiceActual - 1`.
    indiceAleatorio = Math.floor(Math.random() * indiceActual);
    // Disminuimos `indiceActual` en 1, porque ahora vamos a mezclar un elemento.
    indiceActual--;

    // Intercambiamos el elemento en `indiceActual` con el elemento en `indiceAleatorio`.
    // Esto se hace mediante desestructuración, lo que permite un intercambio limpio en una sola línea.
    [array[indiceActual], array[indiceAleatorio]] = [
      array[indiceAleatorio],
      array[indiceActual],
    ];
  }
  // Devolvemos el array ya mezclado.
  return array;
}

// Barajamos el array original y lo almacenamos en una nueva variable.
const animalesBarajados = barajarAnimales(animales);
console.log(barajarAnimales([...animales]));
console.log(barajarAnimales([...animales]));
console.log(barajarAnimales([...animales]));
console.log(barajarAnimales([...animales]));
