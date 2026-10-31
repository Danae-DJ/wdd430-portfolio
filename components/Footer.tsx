import { connection } from 'next/server';
/*//this version is dinamic but there are issues in the console with New Date or currentYear
export default async function Footer() { 

  await connection();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>
          Copyright &copy; {currentYear} | Danae De la Cruz | All rights reserved
        </p>
      </div>
    </footer>
  );
}*/

 //no dinamic, but this version hasn't errors
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>
          Copyright &copy; 2026 | Danae De la Cruz | All rights reserved
        </p>
      </div>
    </footer>
  );
}