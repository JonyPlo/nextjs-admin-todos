import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  // Esto elimina toda la tabla de todos, necesitamos purgar la tabla antes de cargar el seed
  await prisma.todo.deleteMany() // Similar a hacer "DELETE * FROM todo"

  // De esta forma se crea un seed con prisma para insertar datos en la base de datos, en la parte que dice prisma.todo, prisma es el cliente y todo es el modelo que creamos en el archivo schema.prisma, por ultimo con el metodo createMany enviamos un objeto con la propiedad 'data' y esta propiedad sera un arreglo de objetos, que estos objetos serán los datos artificiales o de prueba que se cargaran masivamente en la base de datos
  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma', complete: true },
      { description: 'Piedra del poder' },
      { description: 'Piedra del tiempo' },
      { description: 'Piedra del espacio' },
      { description: 'Piedra del realidad' },
    ],
  })

  // De esta forma con el metodo create() se crea un seed pero para cargar solo un objeto
  // const todo = await prisma.todo.create({
  //   data: { description: 'Piedra del alma', complete: true },
  // })

  return NextResponse.json({
    message: 'Seed Executed',
  })
}
