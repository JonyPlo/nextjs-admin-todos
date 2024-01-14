'use client'

import React from 'react'
import style from './SideBarItem.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  path: string
  icon: React.ReactNode
  text: string
}

export const SideBarItem = ({ path, icon, text }: Props) => {
  const pathName = usePathname()

  return (
    <div>
      <li>
        <Link
          href={path}
          className={`${style.link} ${
            pathName === path && style['active-link']
          }`}
        >
          {icon}
          <span className='-mr-1 font-medium'>{text}</span>
        </Link>
      </li>
    </div>
  )
}
