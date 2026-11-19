'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';

type ProjectFormState = {
  errors?: {
    title?: string[];
    yearCompleted?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    link?: string[];
  };
  message?: string;
};

// Define las reglas para validar un proyecto.
const ProjectSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  yearCompleted: z.string().trim().min(1, 'Year completed is required').regex(/^\d{4}$/, 'Enter a valid four-digit year').transform(Number)
  .refine(
    (year) => year >= 1900 && year <= new Date().getFullYear(),
    'Enter a year between 1900 and the current year'
  ),
  description: z.string().trim().min(1, 'Description is required'),
  type: z.enum(['opensource', 'school']),
  technologies: z.string().trim().min(1, 'Technologies are required')
    .transform((value) =>
      value.split(',').map((item) => item.trim()).filter(Boolean)
    ),
  link: z.union([z.string().url('Enter a valid URL'), z.literal('')]),
});

// Creates a new project.
export async function createProject(
  prevState: ProjectFormState,
  formData: FormData
    ): Promise<ProjectFormState> {
      const validatedFields = ProjectSchema.safeParse({
          title: formData.get('title'),
          yearCompleted: formData.get('yearCompleted'),
          description: formData.get('description'),
          type: formData.get('type'),
          technologies: formData.get('technologies'),
          link: formData.get('link'),
      });

    // Stop if the data is invalid.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const {
      title,
      yearCompleted,
      description,
      type,
      technologies,
      link,
    } = validatedFields.data;

    // Insert the new project into the database.
    await sql`
        INSERT INTO projects (title, year_completed, description, type, technologies, link)
        VALUES (
            ${title},
            ${yearCompleted},
            ${description},
            ${type},
            ${`{${technologies.join(',')}}`}::text[],
            ${link || null}
        )
        `;

  // Refresh the projects page.
  revalidatePath('/projects');

  // Redirect to the projects page.
  redirect('/projects');
}


// Updates an existing project.
export async function updateProject(
  id: number,
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const validatedFields = ProjectSchema.safeParse({
    title: formData.get('title'),
    yearCompleted: formData.get('yearCompleted'),
    description: formData.get('description'),
    type: formData.get('type'),
    technologies: formData.get('technologies'),
    link: formData.get('link'),
  });

  // Stop if the data is invalid.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update project.',
    };
  }

  const { title, yearCompleted, description, type, technologies, link } =
    validatedFields.data;

  // Update the project in the database.
  await sql`
    UPDATE projects
    SET
      title = ${title},
      year_completed = ${yearCompleted},
      description = ${description},
      type = ${type},
      technologies = ${`{${technologies.join(',')}}`}::text[],
      link = ${link || null}
    WHERE id = ${id}
  `;

  // Refresh the projects page.
  revalidatePath('/projects');

  return { message: 'Project updated successfully.' };
}

// Deletes an existing project.

export async function deleteProject(id: number) {
  try {
    await sql`
      DELETE FROM projects
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error deleting project:', error);

    throw new Error(
      'Failed to delete project. Please try again later.'
    );
  }

  // Refresh the projects page.
  revalidatePath('/projects');

  // Redirect with a success message.
  redirect('/projects?message=deleted');
}




/* Recordatorios para createProject:
'use server': indica que las funciones de este archivo se ejecutan en el servidor.
ProjectSchema: define qué datos necesitamos y cuáles son válidos.
safeParse(): comprueba los datos sin detener la aplicación si encuentra errores.
INSERT INTO: guarda el proyecto en PostgreSQL.
revalidatePath('/projects'): actualiza la información de la página de proyectos.
`{${technologies.join(',')}}`: Es una plantilla de JavaScript que construye el texto del arreglo.
::text[] : Esta parte indica explícitamente a PostgreSQL, este valor como un arreglo de texto
el ${...} al rededor de `{${technologies.join(',')}}`: Es la interpolación de parámetros de la plantilla SQL,
permite enviar un valor desde JavaScript a la consulta.

Recordatorios para deleteProject:
deleteProject(id) recibe el identificador del proyecto que queremos eliminar.
DELETE FROM projects indica a PostgreSQL que elimine un registro de la tabla.
WHERE id = ${id} asegura que se elimine únicamente el proyecto correspondiente a ese ID.
revalidatePath('/projects') actualiza la lista después de eliminarlo.
La función redirect() devuelve al usuario a /projects y agrega el parámetro message=deleted a la URL.
try...catch debe capturar el error de la consulta a PostgreSQL.
revalidatePath() actualiza la información de la página.
redirect() realiza la navegación. Internamente utiliza un mecanismo de 
excepción de Next.js, por lo que no conviene atraparlo accidentalmente dentro de nuestro catch.

Cuando se agregó yearCompleted: a ProjectSchema, sus comandos definian su información como:
z.string(): recibe el valor del formulario.
min(1): evita que esté vacío.
regex: exige cuatro dígitos.
transform(Number): convierte el texto, por ejemplo "2025", en el número 2025.
refine: comprueba que el año sea razonable y no sea futuro.
*/
