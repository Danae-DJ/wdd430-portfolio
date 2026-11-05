import ProjectsList from '@/components/ProjectsList';

export default function SchoolProjectsPage() {
  return (
    <main>
      <h1>School Projects</h1>
      <p>Here are my school projects.</p>

      <ProjectsList endpoint="/api/projects?type=school" />
    </main>
  );
}