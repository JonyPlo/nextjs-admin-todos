import { WidgetItem } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard Page',
  description: 'Dashboard Page',
}

export default function DashboardPage() {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <WidgetItem />
    </div>
  )
}
