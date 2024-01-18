// Este es un componente del lado del cliente

import { getCookie, hasCookie, setCookie } from 'cookies-next'

export const getCookieCart = (): { [id: string]: number } => {
  // Con el metodo hasCookie de la libreria cookies-next podemos saber si existe o no una cookie, y para eso tenemos que mandar la key de como se llama la cookie
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse((getCookie('cart') as string) ?? '{}')

    return cookieCart
  }

  return {}
}

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()

  if (cookieCart[id]) {
    cookieCart[id] += 1
  } else {
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  delete cookieCart[id]
  setCookie('cart', JSON.stringify(cookieCart))
}
