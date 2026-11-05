import ProjectsList from '@/components/ProjectsList';

export default function OpenSourcePage() {
  return (
    <main>
      <h1>Open Source Projects</h1>
      <p>Here are my open source contributions.</p>

      <ProjectsList endpoint="/api/projects?type=opensource" />
    </main>
  );
}