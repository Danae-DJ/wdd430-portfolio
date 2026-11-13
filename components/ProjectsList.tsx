import { connection } from 'next/server';
import { getProjects } from '@/lib/projects-db';

export default async function ProjectsList() {
  // Esperar a que llegue una solicitud del usuario.
  await connection();

  // Obtener los proyectos directamente desde PostgreSQL.
  const projects = await getProjects();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {projects.map((project) => (
        <li
          key={project.id}
          className="bg-white text-gray-800 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
        >
          <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-semibold mb-4">
            {project.type}
          </span>

          <h2 className="text-xl font-bold mb-3">
            {project.title}
          </h2>

          <p className="text-gray-600 mb-5 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="bg-gray-100 text-gray-700 rounded-md px-3 py-1 text-sm"
              >
                {technology}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-indigo-600 font-semibold hover:text-indigo-800"
            >
              View project →
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

/*
Clase Tailwind --	Función
grid --	Organiza las tarjetas en una cuadrícula.
grid-cols-1 --	Una columna en pantallas pequeñas.
md:grid-cols-2 --	Dos columnas en pantallas medianas o grandes.
rounded-xl --	Redondea las esquinas.
shadow-sm --	Añade una sombra ligera.
hover:shadow-lg --	Aumenta la sombra al pasar el cursor.
transition --	Suaviza los cambios visuales.
flex-wrap --	Permite que las etiquetas pasen a otra línea si es necesario.
*/