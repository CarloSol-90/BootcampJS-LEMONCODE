export interface Personaje {
  id: string;
  nombre: string;
  apodo: string;
  especialidad: string;
  habilidades: string[];
  amigo: string;
  imagen: string;
}

export interface AppState {
  personajes: Personaje[];
  filtro: string;
  loading: boolean;
}

export const createEmptyState = (): AppState => ({
  personajes: [],
  filtro: "",
  loading: false
});