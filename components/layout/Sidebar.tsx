import {BsHouseFill, BsBellFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTwitterButton from './SidebarTwitterButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
interface SidebarProps{

}

const Sidebar = () => {
  const {data: currentUser} = useCurrentUser()

  const items = [
    {
        label: 'Home',
        href: '/',
        icon: BsHouseFill
    },
    {
        label: 'Notifications',
        href: '/notifications',
        icon: BsBellFill,
        auth: true

    },
    {
        label: 'Profile',
        href: `/users/${currentUser?.id}`,
        icon: FaUser,
        auth: true
    },
    
  ]
  return (
    <div className="h-full pr-4 ">
        <div className='flex flex-col items-end'>
           <div className='space-y-2 lg:w-[230px]'>
                <SidebarLogo />
                    {
                        items.map(item => (
                            <SidebarItem key={item.label} label={item.label} href={item?.href} auth={item?.auth} icon={item?.icon} />
                        ))
                    }
                {currentUser &&
                 <SidebarItem onClick={()=> signOut()} label='Logout' href='/' icon={BiLogOut} />}
                <SidebarTwitterButton />
           </div>
        </div>
    </div>
  )
}

export default Sidebar