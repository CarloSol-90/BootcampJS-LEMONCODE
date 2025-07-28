import { Personaje } from "./modelo";

const API_BASE_URL = "http://localhost:3000";

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/personajes`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener personajes:", error);
    throw error;
  }
};

export const buscarPersonajes = async (nombre: string): Promise<Personaje[]> => {
  try {
    const url = nombre 
      ? `${API_BASE_URL}/personajes?nombre_like=${nombre}`
      : `${API_BASE_URL}/personajes`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al buscar personajes:", error);
    throw error;
  }
};

export const getImagenUrl = (nombreImagen: string): string => {
  return `${API_BASE_URL}/${nombreImagen}`;
};