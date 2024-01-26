//! En este archivo podemos modificar el tipado del usuario que devuelve la session, en otras palabras podemos agregar propiedades al objeto 'user' que devuelve la session.

// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'

interface IUser extends DefaultUser {
  /**
   * La propiedad 'roles' fue agregada por mi para que en el objeto 'user' ahora reconozca la propiedad roles, tambien se pueden agregar otras propiedades
   */
  roles?: string[]
}

declare module 'next-auth' {
  interface User extends IUser {}

  interface Session {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
