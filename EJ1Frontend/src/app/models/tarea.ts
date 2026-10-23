export interface Tarea {
  id?: number;
  titulo: string;
  descripcion?: string | null;
  fechaInicio: string;
  fechaFin?: string | null;
  categoriaId: number;
  estado?: string;
}

export interface Categoria {
  id: number;
  codigo: string;
  nombre: string;
}