'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoReloadCircleOutline,
} from 'react-icons/io5'

export const LogoutButton = () => {
  // El 'status' que nos devuelve la session puede ser 'authenticated', 'loading' o 'unauthenticated'
  const { data: session, status } = useSession()

  //Recordar que esta validacion no seria necesaria si el componente fuera del lado del servidor
  if (status === 'loading') {
    return (
      <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
        <IoReloadCircleOutline />
        <span className='group-hover:text-gray-700'>Loading...</span>
      </button>
    )
  }

  // La libreria de Auth.js ya nos ofrece 2 funciones para ser llamadas directamente que son 'signIn' y 'signOut', esto nos logueara o nos deslogueara de la aplicacion
  if (status === 'unauthenticated') {
    return (
      <button
        onClick={() => signIn()}
        className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'
      >
        <IoLogInOutline />
        <span className='group-hover:text-gray-700'>Log In</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => signOut()}
      className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'
    >
      <IoLogOutOutline />
      <span className='group-hover:text-gray-700'>Logout</span>
    </button>
  )
}
