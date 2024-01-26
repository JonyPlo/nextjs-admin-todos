import Image from 'next/image'
import Link from 'next/link'
import { CiLogout } from 'react-icons/ci'
import { LogoutButton, SideBarItem } from '..'
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const menuItems = [
  {
    path: '/dashboard',
    icon: <IoCalendarOutline size={20} />,
    text: 'Dashboard',
  },
  {
    path: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline size={20} />,
    text: 'Rest TODOS',
  },
  {
    path: '/dashboard/server-todos',
    icon: <IoListOutline size={20} />,
    text: 'Server Actions',
  },
  {
    path: '/dashboard/cookies',
    icon: <IoCodeWorkingOutline size={20} />,
    text: 'Cookies',
  },
  {
    path: '/dashboard/products',
    icon: <IoBasketOutline size={20} />,
    text: 'Products',
  },
  {
    path: '/dashboard/profile',
    icon: <IoPersonOutline size={20} />,
    text: 'Profile',
  },
]

export const SideBar = async () => {
  const session = await getServerSession(authOptions)
  const userName = session?.user?.name ?? 'No Name'
  const userAvatarUrl = session?.user?.image
    ? session.user.image
    : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
  const userRole = session?.user?.roles ? session.user.roles : ['client']

  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='/dashboard' title='home'>
            <Image
              src='https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
              className='w-32'
              alt='tailus logo'
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className='mt-8 text-center'>
          <Image
            src={userAvatarUrl}
            alt='avatar'
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
            width={100}
            height={100}
            priority
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            {userName}
          </h5>
          <span className='hidden text-gray-400 lg:block capitalize'>{ userRole.join(', ')}</span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {menuItems.map((item) => (
            <SideBarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>
      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
<LogoutButton/>
      </div>
    </aside>
  )
}
