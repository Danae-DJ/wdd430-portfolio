import Link from "next/link";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="flex flex-wrap gap-4 border-b border-gray-300 py-4 mb-6">
        <Link
          href="/projects"
          className="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          Overview
        </Link>

        <Link
          href="/projects/opensource"
          className="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          Open Source
        </Link>

        <Link
          href="/projects/school"
          className="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          School
        </Link>
      </nav>

      {children}
    </section>
  );
}

/*
Clase	-- Función
flex --	Coloca los enlaces en una fila.
flex-wrap	-- Permite que pasen a otra línea si falta espacio.
gap-4	-- Agrega separación entre enlaces.
border-b	-- Dibuja un borde inferior.
border-gray-300	-- Define el color del borde.
py-4	-- Agrega espacio vertical.
mb-6	-- Agrega margen inferior.
rounded-lg	-- Redondea las esquinas.
bg-indigo-600	-- Aplica un fondo índigo.
px-4 py-2	-- Agrega espacio interno.
text-white	-- Cambia el texto a blanco.
hover:bg-indigo-700	-- Oscurece el botón al pasar el cursor.
transition	-- Suaviza el cambio visual.
*/