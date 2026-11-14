'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative mt-6">
      <input
        type="search"
        placeholder="Search projects..."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
}

/* Glosario del codigo:
se instaló "npm install use-debounce", luego se creó este archivo
useSearchParams(): lee los parámetros actuales de la URL.
usePathname(): obtiene la ruta actual, por ejemplo /projects.
useRouter(): permite actualizar la dirección del navegador.
useDebouncedCallback(): espera 300 milisegundos después de que dejes de escribir.
params.set('page', '1'): cuando haces una búsqueda nueva, regresa a la primera página.
*/
