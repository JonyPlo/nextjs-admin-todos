'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function ProfilePage() {
  //! De esta forma se obtienen los datos de un usuario logueado desde el lado del cliente
  // El custom hook useSession es de la libreria Auth.js y para que funcione y poder extraer los datos del usuario logueado, el componente del lado del cliente debe estar dentro de un HOC <SessionProvider />, por lo tanto en este caso agregamos el HOC en el archivo layout.tsx mas alto de la aplicacion
  const { data: session } = useSession()

  useEffect(() => {
    console.log('client')
  }, [])

  return (
    <div>
      <h1>Hello Page ProfilePage</h1>
      <hr />
      <div className='flex flex-col'>
        <span>Name: {session?.user?.name ?? 'No name'}</span>
        <span>Email: {session?.user?.email ?? 'No email'}</span>
        <span>Image: {session?.user?.image ?? 'No image'}</span>
        <span>UserId: {session?.user?.id ?? 'No UUID'}</span>
        <span>Roles: {session?.user?.roles?.join(', ') ?? ['No-roles']}</span>
      </div>
    </div>
  )
}
