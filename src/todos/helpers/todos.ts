import { Todo } from '@prisma/client'

const sleep = (seconds: number = 1): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo | undefined> => {
  await sleep(2)

  const body = { complete }

  try {
    const dbTodo = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application.json',
      },
    }).then((res) => res.json())

    return dbTodo
  } catch (error) {
    console.error('error', error)
  }
}

export const createTodo = async (
  description: string
): Promise<Todo | undefined> => {
  const body = { description }

  try {
    const dbTodo = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())

    return dbTodo
  } catch (error) {
    console.error('error', error)
  }
}

export const deleteCompletedTodos = async (): Promise<Response | undefined> => {
  try {
    const data = await fetch('/api/todos', {
      method: 'DELETE',
    }).then((res) => res.json())

    return data
  } catch (error) {
    console.error('error', error)
  }
}
