import { supabase } from '@/backend/client'
import { NextResponse } from 'next/server'
import { features } from 'process'

interface Review {
  id: number
  firstname: string
  lastname: string
  star: number
  title: string
  review: string
  created_at: string
}

export async function GET(): Promise<NextResponse> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq("featured", true)
      .order('id', { ascending: true })
      .limit(3)
    
    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ data: data as Review[] })
    
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    )
  }
}