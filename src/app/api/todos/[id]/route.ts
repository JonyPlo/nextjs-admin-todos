import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'
import { getUserSessionServer } from '../../auth/actions/auth-actions'

interface Segment {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer()

  if (!user) {
    return null
  }

  const todoById = await prisma.todo.findFirst({
    where: { id },
  })

  if (todoById?.userId !== user.id) {
    return null
  }

  return todoById
}

// Get one todo
export async function GET(request: Request, { params }: Segment) {
  // Con el segundo parametro de la funcion podemos obtener los parametros que mandamos por la url, en este caso obtenemos el parametro "id"
  const { id } = params

  const todoById = await getTodo(id)

  if (!todoById) {
    return NextResponse.json(
      {
        message: `Todo with id ${id} no exist`,
      },
      { status: 404 }
    )
  }

  return NextResponse.json(todoById)
}

// Update one todo
const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
})

export async function PUT(request: Request, { params }: Segment) {
  const { id } = params

  const todoById = await getTodo(id)

  if (!todoById) {
    return NextResponse.json(
      {
        message: `Todo with id ${id} no exist`,
      },
      { status: 404 }
    )
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    )

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    })

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
