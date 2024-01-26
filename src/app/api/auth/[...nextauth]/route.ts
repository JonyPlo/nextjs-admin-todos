//* La carpeta que encierra este archivo se llama [...nextauth], esto indica que cualquier path que venga despues de la ruta auth es valida, la ruta quedaría asi 'api/auth/[...nextauth]'. Para dejar una idea mas clara la ruta seria algo similar a esta ruta 'api/auth/*'

/*
Behind the scenes, this creates all the relevant OAuth API routes within /api/auth/* so that auth API requests to:

GET /api/auth/signin
POST /api/auth/signin/:provider
GET/POST /api/auth/callback/:provider
GET /api/auth/signout
POST /api/auth/signout
GET /api/auth/session
GET /api/auth/csrf
GET /api/auth/providers

Info sacada de la documentación: https://authjs.dev/getting-started/providers/oauth-tutorial?frameworks=next
*/

import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

// En esta constante vamos a definir nuestros providers
export const authOptions: NextAuthOptions = {
  // Los adaptadores se encargan de almacenar en la base de datos a los usuarios registrados o autenticados con algún proveedor de auth.js, tambien si el usuario ya se registro anteriormente el adaptador buscara en la base de datos si ese usuario que se acaba de loguear ya existe o no
  adapter: PrismaAdapter(prisma) as Adapter,
  // El orden en el que se pongan los proveedores dentro del arreglo, sera el orden en el que se mostraran los botones en la pagina para loguearse
  providers: [
    // Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    // GitHub
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],

  // Aqui indicamos que la sesion este manejada por la estrategia de jwt
  session: {
    strategy: 'jwt',
  },

  // Los callbacks son funciones que se ejecutaran en un cierto punto del ciclo de vida de la autenticación de un usuario, en otras palabras, despues de que la autenticación pase por algún proveedor, se van a ejecutar los callbacks  antes de mostrar la informacion de la sesion en la pagina
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true

      //Si se retorna un 'false' quiere decir que no se realizo la autenticación, esto puede servir por si queremos bloquear usuarios de algún dominio en particular, o no se quieren usuarios que sean de gmail, etc.
      // Recordar que esto es solo a la hora de crear un usuario
      // return false
    },

    // La idea del metodo jwt es que se pase la informacion que yo quiero que sea parte del jwt, esa informacion se firmara de nuevo con el jwt y se lo pasara al metodo session(), en otras palabras, en el payload del 'token' podemos poner la info que nosotros queramos, como por ejemplo poner los roles del usuario, si el usuario esta activo o no, etc.
    // Tener en cuenta que el token que se obtiene es el que se almacena en las cookies del navegador
    // Este metodo se ejecuta antes del metodo session()
    async jwt({ token, user, account, profile }) {
      // El token por defecto almacena datos del usuario que se acaba de loguear, y uno de esos datos es el email, asi que extraemos el email del token y buscamos en la base de datos si ya existe un usuario con ese email
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? 'no-email' },
      })

      // Esta condicional es para evitar que un usuario pueda iniciar sesion con una cuenta desactivada, es una medida de seguridad para evitar que alguien 'bloqueado' pueda iniciar sesion
      if (!dbUser?.isActive) {
        throw Error('No active user')
      }

      // Una vez que ya se encontro el usuario vamos a modificar el token agregando 2 propiedades, los roles y el id del usuario que acabamos de encontrar
      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'

      // Retornamos el token modificado
      // El metodo requiere retornar siempre un token
      return token
    },

    // El trabajo del metodo session() es obtener la informacion de la session modificada y retornarla
    // Este metodo se ejecuta despues del metodo jwt()
    async session({ session, token, user }) {
      // Verificamos si hay una session, o sea si hay alguien logueado, y si la session tiene un user
      if (session && session.user) {
        // Modificamos la session agregando las propiedades del token que creamos anteriormente
        //* Por defecto el tipado del objeto 'user' que devuelve la session no tiene la propiedades que estamos agregando ahora con los valores del token, asi que data error, para agregar el tipado en la raiz del proyecto se agrego un archivo llamado 'nextauth.d.ts' y en ese archivo se modifico el tipado del objeto 'user' para que ahora si reconozca estas nuevas propiedades
        session.user.roles = token.roles
        session.user.id = token.id
      }

      // El metodo tiene que regresar la session modificada con los valores que vienen en el token
      return session
    },
  },
}

const handler = await NextAuth(authOptions)

// Exportar esto como GET, POST, etc. es necesario ya que next lo requiere porque estamos dentro de un archivo 'route.ts' y para que lea los endpoints tienen que estar exportados con esos nombres
export { handler as GET, handler as POST }
