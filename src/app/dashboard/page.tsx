import { WidgetItem } from '@/components'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard Page',
  description: 'Dashboard Page',
}

export default async function DashboardPage() {
  //! De esta forma tomamos la informacion del logueo del lado del servidor
  // En este caso la constante 'session' almacenara los datos del usuario logueado como por ejemplo el name, email y el image que seria un avatar
  // Recordar que los datos de la session como los tokens de autenticación se almacenan en las cookies del navegador por lo tanto si borramos las cookies la session se cerrara
  const session = await getServerSession(authOptions)
console.log(session?.user);

  // Si la sesion no existe, redirijo al usuario a la pagina para loguearse nuevamente
  if (!session) {
    // El metodo redirect regresa un 'never' que es similar a un 'return' por lo tanto no se sigue ejecutando lo que esta abajo
    redirect('/api/auth/signin')
  }

  return (
    <div className='grid gap-6 grid-cols-1'>
      <WidgetItem title='User connected S-Side'>
        <div className='mt-3'>
          <p>Name: {session.user?.name}</p>
          <p>Email: {session.user?.email}</p>
          <p>Avatar: {session.user?.image}</p>
        </div>
      <div>
        {
          JSON.stringify(session)
        }
      </div>
      </WidgetItem>

    </div>
  )
}
