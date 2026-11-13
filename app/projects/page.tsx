import { Suspense } from 'react';
import ProjectsList from '@/components/ProjectsList';

export default function ProjectsPage() {
  return (
    <main>
      <h1>Projects Overview</h1>
      <p>Welcome to my projects section!</p>

      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsList />
      </Suspense>
    </main>
  );
}

/*
Como ahora se usa suspense, el fallback mostrara contenido provisional 
cuando el usuario espere cargue la pagina. Además eliminanos endponit porque
ProjectsList ya carga esa funcion.
*/