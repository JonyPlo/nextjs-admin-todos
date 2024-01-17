// Con 'use server' decimos que todas las funciones de este archivo se ejecutaran del lado del servidor, pero si queremos que solo una de las funciones en particular se ejecute en el servidor entonces hay que poner el 'use server' dentro de la funcion y al principio de la misma
'use server'

import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  })

  if (!todo) {
    throw `Todo with ${id} no exist`
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  })

  // Con este metodo le decimos a next que revalide la ruta que le enviamos en los parentesis y que solo cargue lo que cambio, en otras palabras, hacemos que solo se actualice lo que se modifico y que lo demas se mantenga igual
  // Esto tambien ayuda a mantener el nuevo cambio en cache, entonces cuando recarguemos la pagina todo se cargara mediante el cache
  revalidatePath('/dashboard/server-todos')

  return updatedTodo
}

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } })

    revalidatePath('/dashboard/server-todos')

    return todo
  } catch (error) {
    return {
      message: 'Error creating todo',
    }
  }
}
