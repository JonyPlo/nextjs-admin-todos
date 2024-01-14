'use client'

import { Todo } from '@prisma/client'
import { TodoItem } from '../..'

import * as todosApi from '@/todos/helpers/todos'
import { useRouter } from 'next/navigation'

interface Props {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
  // useRouter solo puede ser usado del lado del cliente
  const router = useRouter() // Tomar el useRouter desde 'next/navigation', no desde 'next/router'

  const toggleTodo = async (id: string, complete: boolean) => {
    await todosApi.updateTodo(id, complete)

    // useRouter() es un nuevo custom hook que viene de Next 13, y esto nos permite manipular los componentes como por ejemplo actualizarlos usando el metodo refresh(), esto hara que cuando ejecutemos la funcion toggleTodo en un onClick y lleguemos al router.refresh(), este hara que todos los componentes de la pagina se re-rendericen pero sin perder sus estados y solo afectar a los componentes que tenga que afectar
    router.refresh()
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
