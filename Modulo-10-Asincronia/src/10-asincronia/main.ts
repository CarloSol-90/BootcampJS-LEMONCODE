import { AppState, createEmptyState } from "./modelo";
import { obtenerPersonajes, buscarPersonajes } from "./motor";
import { mostrarLoading, renderPersonajes, obtenerValorFiltro, limpiarFiltro } from "./ui";

let appState: AppState = createEmptyState();

const cargarPersonajes = async (): Promise<void> => {
  try {
    mostrarLoading(true);
    appState.loading = true;
    
    const personajes = await obtenerPersonajes();
    appState.personajes = personajes;
    appState.loading = false;
    
    renderPersonajes(personajes);
  } catch (error) {
    console.error("Error al cargar personajes:", error);
    appState.loading = false;
  } finally {
    mostrarLoading(false);
  }
};

const filtrarPersonajes = async (): Promise<void> => {
  const filtro = obtenerValorFiltro();
  
  try {
    mostrarLoading(true);
    appState.loading = true;
    appState.filtro = filtro;
    
    const personajes = await buscarPersonajes(filtro);
    appState.personajes = personajes;
    appState.loading = false;
    
    renderPersonajes(personajes);
  } catch (error) {
    console.error("Error al filtrar personajes:", error);
    appState.loading = false;
  } finally {
    mostrarLoading(false);
  }
};

const mostrarTodosLosPersonajes = async (): Promise<void> => {
  limpiarFiltro();
  appState.filtro = "";
  await cargarPersonajes();
};

const configurarEventos = (): void => {
  const filtrarBtn = document.getElementById("filtrar-btn");
  const limpiarBtn = document.getElementById("limpiar-btn");
  const filtroInput = document.getElementById("filtro-input");

  filtrarBtn?.addEventListener("click", filtrarPersonajes);
  limpiarBtn?.addEventListener("click", mostrarTodosLosPersonajes);
  
  // Permitir filtrar con Enter
  filtroInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      filtrarPersonajes();
    }
  });
};

const iniciarApp = async (): Promise<void> => {
  console.log("🚀 Iniciando aplicación de Mortadelo y Filemón");
  
  configurarEventos();
  await cargarPersonajes();
  
  console.log("✅ Aplicación iniciada correctamente");
};

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", iniciarApp);