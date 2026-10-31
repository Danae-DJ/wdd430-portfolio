import ProjectList from '@/components/ProjectList';
const projects = [
  {
    title: 'OWL Game Discover Hub',
    description: 'OWL is a dynamic web application. OWL is a web application designed to help users discover new video games through advanced browsing tools and specific search filters.',
    technologies: ['API', 'Node.js', 'Vite', 'JavaScritp', 'HTML/CSS'],
    link: 'https://github.com/Danae-DJ/owl-game-discovery-hub.git'
  },
  {
    title: 'SleepOutside',
    description: 'An online store featuring dynamic frontend web applications; it allows users to browse a product gallery, select items, and create a shopping list, as well as calculate the applicable tax upon checkout.',
    technologies: ['API', 'Node.js', 'Vite', 'JavaScritp', 'HTML/CSS'],
    link: 'https://github.com/johnvak01/wdd330-team7.git'
  },
  {
    title: 'Snake Game',
    description: 'Classic online video game; the snake must eat apples to grow—the more it eats, the higher the score—but if it crashes, the game ends.',
    technologies: ['JavaScritp', 'HTML/CSS', 'Canvas', 'Render'],
    link: 'https://github.com/Danae-DJ/game2/tree/Buttons'
  }
];

export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I'm a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}
