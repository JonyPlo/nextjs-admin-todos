import { WidgetItem } from '@/components'
import { products, type Product } from '@/data/products'
import { ItemCard } from '@/shopping-cart'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Cart Products',
  description: 'Cart Products',
}

interface CartProduct {
  [id: string]: number
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: CartProduct): ProductInCart[] => {
  const productsInCart: ProductInCart[] = []

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id)

    if (product) {
      productsInCart.push({ product, quantity: cart[id] })
    }
  }

  return productsInCart
}

const CartContent = ({
  productsInCart,
}: {
  productsInCart: ProductInCart[]
}) => {
  return (
    <>
      {productsInCart.length === 0 ? (
        <p className='text-4xl text-center mt-4'>No items in cart</p>
      ) : (
        productsInCart.map(({ product, quantity }) => (
          <ItemCard key={product.id} product={product} quantity={quantity} />
        ))
      )}
    </>
  )
}

export default function CartPage() {
  const cookiesStore = cookies()

  const cart = JSON.parse(
    cookiesStore.get('cart')?.value ?? '{}'
  ) as CartProduct

  const productsInCart = getProductsInCart(cart)

  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  )

  return (
    <div>
      <h1 className='text-5xl mb-4'>Cart Products</h1>
      <hr className='mb-2' />

      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div
          className={`flex flex-col justify-center gap-2 w-full ${
            productsInCart.length > 0 && 'sm:w-8/12'
          } `}
        >
          <CartContent productsInCart={productsInCart} />
        </div>

        <div className='flex flex-col w-full sm:w-4/12'>
          <WidgetItem title='Total to be paid'>
            <div className='text-center'>
              <h3 className='text-3xl font-bold text-gray-700 my-2'>
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
              <span className='font-bold text-center text-gray-500'>
                Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}
              </span>
            </div>
          </WidgetItem>
        </div>
      </div>
    </div>
  )
}
