import { supabase } from '../../../backend/client';
import { NextResponse } from 'next/server';

export async function POST (req: Request) {
    const { firstname, lastname, star, title, review } = await req.json();

    const { data, error }= await supabase
    .from('reviews')
    .insert ({
        "firstname": firstname,
        "lastname": lastname,
        "star": star,
        "title": title,
        "review" : review
})
    .select();

    if (error) {
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        );
    } 
    return NextResponse.json({
        items: data
    });
}