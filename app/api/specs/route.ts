import { NextResponse } from 'next/server';
import specsData from '@/data/specifications.json';

export async function GET() {
  return NextResponse.json(specsData);
}