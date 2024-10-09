import { NextResponse } from 'next/server';
import Tag from '@/models/Tag';

export async function GET(request: Request) {
  try {
    const tags = await Tag.findAll({
      attributes: ['name'],
    });

    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
