import { getServerSession } from 'next-auth'
import { authOptions } from '../[...nextauth]/route'

import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions)

  return session?.user
}

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null

  // Busco el usuario en la base de datos mediante el email
  const user = await prisma.user.findUnique({ where: { email } })

  // Si no se encontro un usuario entonces lo creamos
  if (!user) {
    const dbUser = await createUser(email, password)

    // Retornamos el usuario que acabamos de crear
    return dbUser
  }

  // Verificamos si el password que recibimos desde el campo de login no coincide con el password del usuario que encontramos en la db retornamos null para indicar que el password es incorrecto
  if (!bcrypt.compareSync(password, user.password!)) {
    return null
  }

  // Si se encontro el usuario en la base de datos y ademas el password esta bien, entonces retornamos el usuario que encontramos en la db y realizamos el login
  return user
}

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      name: email.split('@')[0],
    },
  })

  return user
}
