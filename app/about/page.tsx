import BioCard from '@/components/BioCard';
import Image from 'next/image';

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>

      <p className="text-lg text-gray-700">
        This about page shares more information about my background and work.
      </p>

      <Image
        src="/161665870.jpg"
        alt="Profile photograph"
        width={200}
        height={200}
        loading="eager"
        className="rounded-lg mt-6"
      />

      <BioCard
        name="Dánae De la Cruz Jiménez"
        bio="Software Development student | Web fundamentals, logic & UI | Learning systems and interactive experiences. Student at BYU Worldwide, with interests in frontend development, interactive websites, and video game programming."
      />
    </main>
  );
}