import { supabase } from '../../../backend/client';
import { NextResponse } from 'next/server';

export async function PUT (req: Request) {
    const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }

  // First, check if the review exists
  const { data, error: checkError } = await supabase
    .from("reviews")
    .select("id")
    .eq("id", id)
    .single();

  if (checkError || !data) {
    return NextResponse.json(
      { error: "Review not found" },
      { status: 404 }
    );
  }

  // If review exists, proceed with deletion
  const { error } = await supabase
    .from("reviews")
    .update( { featured: true } )
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ 
    message: "Review set as featured"
   });
}