'use client';

import { useActionState } from 'react';
import { updateProject } from '@/app/projects/actions';
import type { Project } from '@/lib/projects-db';

export default function EditProjectForm({
  project,
}: {
  project: Project;
}) {
  const updateProjectWithId = updateProject.bind(null, project.id);

  const initialState = {
    message: '',
  };

  const [state, formAction, isPending] = useActionState(
    updateProjectWithId,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          Project Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={project.title}
          required
          aria-describedby="title-error"
          className="w-full border rounded p-2"
        />
        <div id="title-error" aria-live="polite">
          {state.errors?.title?.map((error) => (
            <p key={error} className="text-red-600 text-sm">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="yearCompleted" className="block font-medium mb-1">
          Year Completed
        </label>
        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          defaultValue={project.year_completed ?? ''}
          required
          aria-describedby="yearCompleted-error"
          className="w-full border rounded p-2"
        />
        <div id="yearCompleted-error" aria-live="polite">
          {state.errors?.yearCompleted?.map((error) => (
            <p key={error} className="text-red-600 text-sm">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={project.description}
          required
          aria-describedby="description-error"
          rows={4}
          className="w-full border rounded p-2"
        />
        <div id="description-error" aria-live="polite">
          {state.errors?.description?.map((error) => (
            <p key={error} className="text-red-600 text-sm">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="type" className="block font-medium mb-1">
          Project Type
        </label>
        <select
          id="type"
          name="type"
          defaultValue={project.type}
          required
          aria-describedby="type-error"
          className="w-full border rounded p-2"
        >
          <option value="school">School</option>
          <option value="opensource">Open Source</option>
        </select>
        <div id="type-error" aria-live="polite">
          {state.errors?.type?.map((error) => (
            <p key={error} className="text-red-600 text-sm">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="technologies" className="block font-medium mb-1">
          Technologies (separate with commas)
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          defaultValue={project.technologies.join(', ')}
          required
          aria-describedby="technologies-error"
          className="w-full border rounded p-2"
        />
        <div id="technologies-error" aria-live="polite">
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="text-red-600 text-sm">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="link" className="block font-medium mb-1">
          Project URL (optional)
        </label>
        <input
          id="link"
          name="link"
          type="url"
          aria-describedby="link-error"
          defaultValue={project.link ?? ''}
          className="w-full border rounded p-2"
        />
        <div id="link-error" aria-live="polite">
          {state.errors?.link?.map((error) => (
            <p key={error} className="text-red-600 text-sm">{error}</p>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Updating...' : 'Update Project'}
      </button>

      <p aria-live="polite">{state.message}</p>
    </form>
  );
}
