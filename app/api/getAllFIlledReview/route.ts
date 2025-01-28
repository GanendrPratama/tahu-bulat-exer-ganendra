import { supabase } from '../../../backend/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { data, error } = await supabase
    .from('reviews')
    .select()
    .not('review', 'is', null)
    .not('review', 'eq', '');

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json({
    items: data
  });
}