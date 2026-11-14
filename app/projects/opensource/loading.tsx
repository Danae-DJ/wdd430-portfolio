
export default function Loading() {
  return (
    <main className="animate-pulse space-y-8">
      {/* Title placeholder */}
      <section className="space-y-4">
        <div className="h-8 w-64 rounded bg-gray-200" />
        <div className="h-4 w-80 rounded bg-gray-200" />
      </section>

      {/* Project cards placeholder */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="h-64 rounded-xl bg-gray-200" />
        <div className="h-64 rounded-xl bg-gray-200" />
      </section>
    </main>
  );
}







/*
tailwind css
animate-pulse: produce una animación suave para indicar que el contenido está cargando.
h-8: establece la altura del espacio.
w-64: establece su anchura.
rounded: redondea las esquinas.
bg-gray-200: establece un fondo gris claro.
grid-cols-1 md:grid-cols-2: muestra una columna en pantallas pequeñas y dos en pantallas medianas o mayores.
*/