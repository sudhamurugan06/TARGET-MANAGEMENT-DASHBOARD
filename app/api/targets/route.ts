import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'targets.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const targets = JSON.parse(data);
    return NextResponse.json(targets, { status: 200 });
  } catch (error) {
    console.error('Error fetching targets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
