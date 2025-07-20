import { validarClave } from "./motor";
import { commonPasswords } from "./modelo";

const inputUsuario = document.getElementById("usuario") as HTMLInputElement;
const inputClave = document.getElementById("clave") as HTMLInputElement;
const botonValidar = document.getElementById("validar") as HTMLButtonElement;
const resultado = document.getElementById("resultado") as HTMLElement;

botonValidar.addEventListener("click", () => {
  const nombreUsuario = inputUsuario.value;
  const clave = inputClave.value;

  const validacion = validarClave(nombreUsuario, clave, commonPasswords);

  if (validacion.esValida) {
    resultado.textContent = "Clave válida 🎉";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `Error: ${validacion.error}`;
    resultado.style.color = "red";
  }
});