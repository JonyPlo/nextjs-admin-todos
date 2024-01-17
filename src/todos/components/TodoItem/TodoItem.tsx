'use client'

import { Todo } from '@prisma/client'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import { startTransition, useOptimistic } from 'react'

interface Props {
  todo: Todo
  // Todo: Acciones que quiero llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  // El hook useOptimistic es un nuevo hook de React y sirve para cambiar states en la interfaz mientras se realiza la peticion de fondo, esto es para darle al usuario la sensación de que no tiene que esperar cuando realiza una peticion asíncrona
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    //Primer argumento es el estado inicial
    todo,
    // Segundo argumento es un callback con 2 parametros, el primero es el estado actual, y el segundo es un valor que enviaremos con la funcion dispatcher que en este caso esa funcion es el toggleTodoOptimistic, y por ultimo este callback tiene que retornar un nuevo state, y dicho state sera el que se mostrara instantáneamente reflejado en la pantalla
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  )

  const onToggleTodo = async () => {
    try {
      // startTransition le indica a React que la siguiente actualización de estado se ejecutará de forma asíncrona y no bloqueará el renderizado del componente mientras se realiza la peticion en segundo plano, en otras palabras el usuario puede seguir usando la pagina mientras se realiza la peticion
      // Recordar que la funcion startTransition es requerida por React cuando manejamos states optimistas
      startTransition(() => {
        //Cambio el valor del state para que se muestre este nuevo valor en pantalla mientras debajo se realiza la peticion asíncrona
        toggleTodoOptimistic(!todoOptimistic.complete)
      })

      // Si la peticion es exitosa, entonces se realizaran los cambios en la base de datos pero en la pantalla ya no cambiara nada porque ya lo cambiamos anteriormente
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
    } catch (error) {
      startTransition(() => {
        // Si algo sale mal en la peticion, volvemos el state como estaba anteriormente para indicarle al usuario que hubo un problema
        toggleTodoOptimistic(!todoOptimistic.complete)
      })
    }
  }

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div
          // onClick={() =>
          //   toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
          // }
          onClick={onToggleTodo}
          className={`
      flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
        todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'
      }`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className='text-center sm:text-left'>
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  )
}
