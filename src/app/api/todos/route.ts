import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10') // Cantidad de items que se devolvera
  const skip = Number(searchParams.get('skip') ?? '0') // Cantidad de items que se salteara

  if (isNaN(take)) {
    return NextResponse.json(
      { message: 'Take should be a number' },
      { status: 400 }
    )
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: 'Skip should be a number' },
      { status: 400 }
    )
  }

  // Con el metodo findMany() obtenemos todos los "todos" de la base de datos
  const todos = await prisma.todo.findMany({ take, skip })

  return NextResponse.json(todos)
}

// Defino un esquema de validacion con yup para validar el objeto antes de ingresarlo a la base de datos con Prisma
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {
  // Con hacer un request.json() ya obtenemos el body de lo que se recibe de la peticion
  // Tener en cuenta que si en el body no llega nada al tomar el body dara un error

  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    )
    const todo = await prisma.todo.create({ data: { complete, description } })

    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
