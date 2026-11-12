import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const projects = await getProjects(type); //Ahora espera a que PostgreSQL devuelva los proyectos antes de enviarlos como respuesta JSON.

  return NextResponse.json(projects);
}
