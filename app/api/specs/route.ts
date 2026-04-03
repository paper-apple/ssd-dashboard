import { NextResponse } from 'next/server';
import specsData from '@/data/specifications.json';

// @req SDD-API-001
export async function GET() {
  let data = { ...specsData };
  return NextResponse.json(data);
}