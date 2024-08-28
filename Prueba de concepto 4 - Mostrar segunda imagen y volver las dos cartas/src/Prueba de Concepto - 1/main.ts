const carta1 = document.getElementById("carta1");

if (carta1) {
  carta1.addEventListener("click", () => {
    const imagen1 = document.getElementById("imagen1");
    if (imagen1 && imagen1 instanceof HTMLImageElement) {
      console.log("Holaa");
      imagen1.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png";
    }
  });
}
