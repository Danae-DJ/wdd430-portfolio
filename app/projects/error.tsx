'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('An uncaught error occurred:', error);
  }, [error]);

  return (
    <div className="mx-auto mt-16 max-w-xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">
        Something went wrong!
      </h1>

      <p className="mt-3 text-slate-600">
        An unexpected error occurred. Please try again later.
      </p>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>

        <Link
          href="/projects"
          className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Go Back to Projects
        </Link>
      </div>
    </div>
  );
}


/*Recordatorios:
error.tsx aparece cuando ocurre un error inesperado.
'use client': indica que este componente se ejecuta en el cliente.
error: contiene información del error ocurrido.
reset: permite intentar renderizar nuevamente la sección que falló.
useEffect: registra el error en la consola del navegador.
Link: permite regresar a la lista de proyectos.
usó digest?: string porque Next.js puede proporcionar ese identificador, pero no es necesario para la interfaz.

*/