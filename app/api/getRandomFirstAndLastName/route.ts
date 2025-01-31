import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()
      const user = data.results[0]
      return NextResponse.json({
        firstname: user.name.first,
        lastname: user.name.last,
      })
    } catch (error) {
      console.error('Error fetching random user:', error)
      return null
    }
  }