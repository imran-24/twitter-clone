import useLoginModal from '@/hooks/useLoginModal'
import { useCallback } from 'react'
import {FaFeather} from 'react-icons/fa'

const SidebarTwitterButton = () => {
  const loginModal = useLoginModal()

  const handleClick = useCallback(()=>{
    if(!loginModal.isOpen) loginModal.onOpen()
  },[loginModal])
  return (
    <div
    onClick={handleClick}
    className="
    h-14
    lg:h-12
    w-14
    lg:w-full
    p-4
    rounded-full
    flex items-center justify-center
    transition
    hover:opacity-70
    cursor-pointer
    bg-sky-500
    "
    >
        <FaFeather className='lg:hidden' size={28} color='white' />
        <p className='font-semibold hidden lg:block text-white'>Twitter</p>
        
    </div>
  )
}

export default SidebarTwitterButton