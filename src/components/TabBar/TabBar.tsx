'use client'

import { setCookie } from 'cookies-next' // A esta libreria solo la podemos usar en los client components
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  currentTab?: number
  tabOptions?: number[]
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const [selected, setSelected] = useState(currentTab)
  const router = useRouter()

  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('selectedTab', tab.toString())
    router.refresh()
  }

  return (
    <div className='grid grid-cols-4 w-full space-x-2 rounded-xl bg-gray-200 p-2'>
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            type='radio'
            id={tab.toString()}
            className='peer hidden'
            onChange={() => {}}
          />
          <label
            onClick={() => onTabSelected(tab)}
            className='transition duration-200 ease-in-out block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}
