'use client';

import { useActionState } from 'react';
import { createProject } from '@/app/projects/actions';

const initialState = {
  message: '',
};

export default function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState(
    createProject,
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
          required
          aria-describedby="technologies-error"
          placeholder="React, Next.js, TypeScript"
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
          placeholder="https://example.com"
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
        {isPending ? 'Creating...' : 'Create Project'}
      </button>

      <p aria-live="polite">{state.message}</p>
    </form>
  );
}


/*Nota importante:
aria-describedby relaciona el campo con el mensaje que lo describe.
aria-live="polite" permite que las tecnologías de asistencia, como 
los lectores de pantalla, anuncien los mensajes cuando aparecen, 
sin interrumpir inmediatamente lo que están leyendo.

*/