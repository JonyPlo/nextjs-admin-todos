//* Por defecto en Next cuando vamos a una ruta de una pagina, y esta pagina se construye para ser mostrada al usuario, Next almacena esa pagina en cache para que cuando el usuario salga de esa pagina y luego vuelva, directamente muestre la pagina que almaceno en cache anteriormente evitando que tenga que reconstruirla nuevamente, pero para los casos que necesitemos que la pagina si se reconstruya desde 0, realice las peticiones http, etc, cada vez que el usuario vuelve, debemos hacer uso de los Route Segment Config

// Las configuraciones 'dynamic' y 'revalidate' son conocidos como Route Segment Options
// Estos 2 Route Segments nos van a ayudar a que una ruta sea 100 % dinámica
// Los Route Segment Options siempre van al principio del archivo
//! Recordar que los Route Segment Options solo se aplican en los archivos que sean pages, layouts o route handler.
// Para mas informacion en la documentación: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate

// El dynamic en 'force-dynamic' es para obligar a mi pagina a que siempre sea dinámica, es decir que siempre se reconstruya cada vez que vuelvo a ella
export const dynamic = 'force-dynamic'
// el revalidate en 0 nos asegura que la pagina siempre sera dinamicamente regenerada
export const revalidate = 0

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todos list',
  description: 'Todos list',
}

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <div>
      <div className='mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
