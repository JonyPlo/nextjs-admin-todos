import { TabBar } from '@/components'
import { Metadata } from 'next'
import { cookies } from 'next/headers' // Cookies para componentes server side

export const metadata: Metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page',
  authors: [{ name: 'Jonathan' }],
}

export default function CookiesPage() {
  const cookieStore = cookies()
  const cookieTab = Number(cookieStore.get('selectedTab')?.value ?? '1')

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
      <div className='flex flex-col'>
        <span className='text-3xl mb-4'>Tabs</span>
        <TabBar currentTab={cookieTab} />
      </div>
    </div>
  )
}
