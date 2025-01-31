import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch('https://randomuser.me/api/?password=special,upper,lower,32')
        const data = await response.json()
        
        if (!data.results?.[0]?.login?.password) {
            throw new Error('Invalid response structure')
        }

        return NextResponse.json({
            password: data.results[0].login.password
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch random password' },
            { status: 500 }
        )
    }
}