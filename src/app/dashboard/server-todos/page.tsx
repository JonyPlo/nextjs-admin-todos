import type { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'

export const metadata: Metadata = {
  title: 'Server Todos Page',
  description: 'Server Todos Page',
}

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <>
      <h1 className='text-3xl mb-5'>Server Actions</h1>

      <hr />

      <div className='mb-5'>
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  )
}
