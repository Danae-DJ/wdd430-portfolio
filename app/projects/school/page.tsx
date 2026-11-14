import { Suspense } from 'react';
import ProjectsList from '@/components/ProjectsList';

export default function SchoolProjectsPage() {
  return (
    <main>
      <h1>School Projects</h1>
      <p>Here are my school projects.</p>

      <Suspense fallback={
        <p className="animate-pulse text-gray-500 mt-8">
          Loading school projects...
        </p>
      }>
        <ProjectsList type="school" />
      </Suspense>
    </main>
  );
}


/*
Recuerda que eliminamos endpoint="/api/projects?type=school" 
porque ProjectsList ya se le ha integrado esa parte.
En este caso se modifico más la seccion de school que opensourse
porque esta cargara por partes su contenido a diferencia de toda la pagina.
Importamos Suspense desde React.
Creamos un fallback que muestra un mensaje animado.
Pasamos type="school" para obtener únicamente los proyectos escolares.
School utiliza <Suspense> para mostrar un indicador de carga únicamente en la lista de proyectos.
*/