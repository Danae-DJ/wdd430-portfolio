import { sql } from '@vercel/postgres';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export const ITEMS_PER_PAGE = 6; //6 projects by page

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }

  const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}
//limit of projects by page
export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE title ILIKE ${searchTerm}
       OR description ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1
         FROM unnest(technologies) AS technology
         WHERE technology ILIKE ${searchTerm}
       )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows;
}
//calculate the number of pages
export async function fetchProjectsPages(query: string): Promise<number> {
  const searchTerm = `%${query}%`;

  const { rows } = await sql<{ count: number }>`
    SELECT COUNT(*)::int AS count
    FROM projects
    WHERE title ILIKE ${searchTerm}
       OR description ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1
         FROM unnest(technologies) AS technology
         WHERE technology ILIKE ${searchTerm}
       )
  `;

  const totalPages = Math.ceil(rows[0].count / ITEMS_PER_PAGE);

  return totalPages;
}


/*
Ahora se importa sql: permite enviar consultas SQL a PostgreSQL.
Se elimina projects: ya no necesitamos guardar los proyectos directamente en el código.
Agrego async y await: las consultas a la base de datos tardan un tiempo, 
así que las funciones ahora esperan su resultado.

Glosario de los terminos:
searchTerm: prepara el texto que queremos buscar. Por ejemplo, typescript se convierte en %typescript%.
ILIKE: busca coincidencias sin distinguir entre mayúsculas y minúsculas.
EXISTS y unnest: permiten buscar también dentro del arreglo technologies.
LIMIT: limita los resultados a seis.
OFFSET: determina desde qué proyecto comenzar según la página.
COUNT(*) - cuenta los proyectos que coinciden con la búsqueda.
Math.ceil() - redondea hacia arriba para obtener el número de páginas.
  Por ejemplo, si tenemos 8 proyectos, necesitaremos 2 páginas.
*/