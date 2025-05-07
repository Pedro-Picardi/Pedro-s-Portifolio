import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    // Path is relative to the project root
    const filePath = path.join(process.cwd(), 'app/components/ascii-pedro.txt');
    const asciiArt = readFileSync(filePath, 'utf8');
    
    return new NextResponse(asciiArt, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error reading ASCII file:', error);
    return new NextResponse('Error loading ASCII art', { status: 500 });
  }
} 