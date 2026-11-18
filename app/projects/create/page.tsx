import CreateProjectForm from '@/components/CreateProjectForm';

export default function CreateProjectPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create a New Project
      </h1>

      <CreateProjectForm />
    </main>
  );
}
