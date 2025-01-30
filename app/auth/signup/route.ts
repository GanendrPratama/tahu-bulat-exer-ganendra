import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest) {
    const url = new URL(req.url);

    return NextResponse.redirect(url.origin, {
        status: 301,
    });
}