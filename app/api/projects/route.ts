import { NextResponse } from 'next/server';
import { PROJECTS } from '@/app/data/projects';

export async function GET() {
  return NextResponse.json(PROJECTS);
} 