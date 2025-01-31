import { readFile, writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'backend', 'featuredReviews.json')
    const data = await readFile(filePath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json({ firstID: 26, secondID: 27, thirdID: 28 })
  }
}

export async function PUT(request:Request) {
  try {
    const data = await request.json()
    const filePath = path.join(process.cwd(), 'backend', 'featuredReviews.json')
    await writeFile(filePath, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}