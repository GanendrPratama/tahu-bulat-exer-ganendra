import { supabase } from '@/backend/client'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { data: { user } } = await supabase.auth.getUser()
    return Response.json({ user });
}