import ProjectsList from '@/components/ProjectsList';

export default function OpenSourcePage() {
  return (
    <main>
      <h1>Open Source Projects</h1>
      <p>Here are my open source contributions.</p>

      <ProjectsList type="opensource"/>
    </main>
  );
}
/*
Recuerda que eliminamos endpoint="/api/projects?type=opensource" 
porque ProjectsList ya se le ha integrado esa parte.
el projectsList fue modificado para que al cargar la pagina,
toda tuviera Skeleton gris en el type=opensourge.
para simular una carga lenta se modifico ProjectsList temporalmente:
justo despues de "await connection();"  se agregó:
  if (type === 'opensource') {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
Open Source utiliza loading.tsx para mostrar un indicador de carga de la ruta.
*/