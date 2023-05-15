import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps{
    label:string;
    href?: string;
    icon: IconType;
    onClick?: ()=> void
    auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({label, href, auth, icon: Icon, onClick}) => {
  const router = useRouter()
  const {data: currentUser} = useCurrentUser()
  const loginUser = useLoginModal()
  
  const handleClick = useCallback(()=>{
    if(onClick) onClick()
    if(auth && !currentUser) return loginUser.onOpen()
    if(href) router.push(href)
  },[onClick, router, currentUser])

  return (
    <div 
    onClick={handleClick}
    className="
    h-14
    w-14
    rounded-full
    flex items-center 
    justify-center 
    lg:justify-start
    p-4
    hover:bg-neutral-800
    transition
    hover:opacity-30
    cursor-pointer
    lg:w-full
    ">
        <div className="flex items-center space-x-3 ">
        <Icon size={20} color='white' />
        <p className="lg:block hidden text-white ">{label}</p>
        </div>
    </div>
  )
}

export default SidebarItem