'use client'

import { SessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({ children, ...rest }: Props) => {
  // Este es el HOC que tiene que encerrar todas las rutas de la aplicacion para poder obtener la informacion de los usuarios logueados desde el lado del cliente
  return <SessionProvider>{children}</SessionProvider>
}
