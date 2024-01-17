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
