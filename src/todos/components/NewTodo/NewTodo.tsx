'use client'

import { FormEvent, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import * as todosApi from '@/todos/helpers/todos'
// import { useRouter } from 'next/navigation'
import { addTodo, deletedCompletedTodos } from '@/todos/actions/todo-actions'
import { useRouter } from 'next/navigation'

export const NewTodo = () => {
  const [description, setDescription] = useState('')
  const router = useRouter()

  //! Funcion sin server action
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (description.trim().length === 0) return
    await todosApi.createTodo(description) // <- Rest Full Api
    setDescription('')

    router.refresh()
  }

  //! Funcion sin server action
  // const onDeleteCompletedTodos = async () => {
  //   const res = await todosApi.deleteCompletedTodos()
  //   if (!res?.ok) return

  //   router.refresh()
  // }

  //* Funcion con server actions
  // const onSubmit = async (e: FormEvent) => {
  //   e.preventDefault()

  //   if (description.trim().length === 0) return

  //   await addTodo(description) // <- Action
  //   setDescription('')
  // }

  return (
    <form onSubmit={onSubmit} className='flex'>
      <input
        type='text'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className='w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all'
        placeholder='What you need to do?'
      />
      <button
        type='submit'
        className='flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all'
      >
        Create
      </button>
      <span className='flex grow'></span>
      <button
        // A la funcion deletedCompletedTodos hay que llamarla dentro del callback porque si la llamamos implícitamente le estaríamos mandando el objeto 'event' que es un objeto con propiedades, funciones, etc. y una funcion que es un 'action' como lo es deletedCompletedTodos solo debe recibir objetos literales o primitivos
        onClick={() => deletedCompletedTodos()}
        type='button'
        className='flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all'
      >
        <IoTrashOutline />
        <span className='ml-2'>Delete Completed</span>
      </button>
    </form>
  )
}
