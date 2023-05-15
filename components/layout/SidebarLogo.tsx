import { useRouter } from 'next/router'
import {BsTwitter} from 'react-icons/bs'

const SidebarLogo = () => {
  const router = useRouter()
  return (
    <div 
    onClick={()=> router.push('/')}
    className='
    h-14
    w-14
    flex 
    items-center
    justify-center
    p-4
    hover:bg-blue-500
    hover:opacity-10
    transition
    cursor-pointer
    rounded-full
    '>
        <BsTwitter size={20} color='white' />
    </div>
  )
}

export default SidebarLogo