import { Personaje } from "./modelo";
import { getImagenUrl } from "./motor";

export const mostrarLoading = (show: boolean): void => {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.classList.toggle("hidden", !show);
  }
};

export const renderPersonajes = (personajes: Personaje[]): void => {
  const container = document.getElementById("personajes-container");
  if (!container) return;

  if (personajes.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>No se encontraron personajes</p>
      </div>
    `;
    return;
  }

  container.innerHTML = personajes
    .map(personaje => `
      <div class="personaje-card">
        <img 
          src="${getImagenUrl(personaje.imagen)}" 
          alt="${personaje.nombre}"
          class="personaje-imagen"
        />
        <div class="personaje-info">
          <h3>${personaje.nombre}</h3>
          <p><strong>Apodo:</strong> ${personaje.apodo}</p>
          <p><strong>Especialidad:</strong> ${personaje.especialidad}</p>
          <p><strong>Habilidades:</strong> ${personaje.habilidades.join(", ")}</p>
          ${personaje.amigo ? `<p><strong>Amigo:</strong> ${personaje.amigo}</p>` : ""}
        </div>
      </div>
    `)
    .join("");
};

export const obtenerValorFiltro = (): string => {
  const input = document.getElementById("filtro-input") as HTMLInputElement;
  return input?.value.trim() || "";
};

export const limpiarFiltro = (): void => {
  const input = document.getElementById("filtro-input") as HTMLInputElement;
  if (input) {
    input.value = "";
  }
};