import { Suspense } from 'react';
import ProjectsList from '@/components/ProjectsList';
import ProjectSearch from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from '@/lib/projects-db';

type SearchParams = Promise<{
  query?: string;
  page?: string;
}>;

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main>
      <h1>Projects Overview</h1>
      <p>Welcome to my projects section!</p>

      <Suspense fallback={<p>Loading search...</p>}>
        <ProjectSearch />
      </Suspense>

      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function ProjectsContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  // Se lee y valida la consulta de búsqueda.
  const rawQuery = typeof params.query === 'string' ? params.query : '';
  const query = rawQuery.trim().slice(0, 100);

  // Se lee y valida la página solicitada.
  const rawPage = Number(params.page);
  const requestedPage =
    Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  // Calculate the total number of pages.
  const totalPages = await fetchProjectsPages(query);

  // Keep the current page within the available range.
  const currentPage = Math.min(requestedPage, totalPages || 1);

  // Get the projects for the current page.
  const projects = await fetchFilteredProjects(query, currentPage);

  return (
    <>
      <ProjectsList projects={projects} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
}


/*
Como ahora se usa suspense, el fallback mostrara contenido provisional 
cuando el usuario espere cargue la pagina. Además eliminanos endponit de ProjectsList porque
ProjectsList ya carga esa funcion.
Por ahora es importante recordar:
searchParams: lee los valores de la URL, como query=typescript y page=2.
Validación: limita el texto de búsqueda a 100 caracteres y comprueba que el número de página sea válido.
fetchProjectsPages(): calcula cuántas páginas existen para esa búsqueda.
fetchFilteredProjects(): obtiene únicamente los seis proyectos correspondientes a la página actual.
*/