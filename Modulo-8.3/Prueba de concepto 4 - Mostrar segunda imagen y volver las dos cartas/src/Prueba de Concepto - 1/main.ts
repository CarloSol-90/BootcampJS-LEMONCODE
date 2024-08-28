/*"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png"*/

const carta1 = document.querySelector(`div[data-indice-id="${0}"]`);
const carta2 = document.querySelector(`div[data-indice-id="${1}"]`);

if (carta1) {
  carta1.addEventListener("click", () => {
    const imagen1 = document.querySelector(`img[data-indice-id="${0}"]`);
    if (imagen1 && imagen1 instanceof HTMLImageElement) {
      imagen1.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png";
    }
  });
}

if (carta2) {
  carta2.addEventListener("click", () => {
    const imagen1 = document.querySelector(`img[data-indice-id="${1}"]`);
    if (imagen1 && imagen1 instanceof HTMLImageElement) {
      imagen1.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png";
    }
  });
}
