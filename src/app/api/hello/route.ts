// Snippet para creaR un restful api rápidamente "rag"
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({
    hola: 'mundo',
  })
}

export async function POST(request: Request) {
  return NextResponse.json({
    hola: 'mundo',
    post: 'POST',
  })
}
