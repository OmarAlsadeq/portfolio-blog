import { NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/db';
import { Project } from '@/models/Project';

export async function GET() {
  const projectRepo = AppDataSource.getRepository(Project);
  const projects = await projectRepo.find();
  return NextResponse.json(projects);
}
