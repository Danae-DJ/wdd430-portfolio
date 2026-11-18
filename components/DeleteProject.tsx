'use client';

import { deleteProject } from '@/app/projects/actions';

export default function DeleteProject({ id }: { id: number }) {
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <form
      action={deleteProjectWithId}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          'Are you sure you want to delete this project?'
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-red-600 bg-white px-2.5 py-0.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}


/* Recordatorio inportante:
Se usa bind(null, id) para asociar el botón con el proyecto correcto
igual a EditProjectForm.tsx
*/