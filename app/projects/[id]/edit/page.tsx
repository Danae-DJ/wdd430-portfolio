import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import EditProjectForm from '@/components/EditProjectForm';
import { getProjectById } from '@/lib/projects-db';

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading project...</p>}>
      <EditProjectContent params={params} />
    </Suspense>
  );
}

async function EditProjectContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Project
      </h1>

      <EditProjectForm project={project} />
    </main>
  );
}



/*
Notas:
params: recibe el ID que aparece en la dirección URL.
Number(id): convierte ese ID de texto a número.
getProjectById(projectId): busca el proyecto en PostgreSQL.
notFound(): muestra la página 404 si el ID no es válido o el proyecto no existe.
*/