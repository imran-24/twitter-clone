import { useRouter } from 'next/router';
import { useCallback } from 'react';
import {BiArrowBack} from 'react-icons/bi'

interface HeaderProps{
    label: string;
    showbackArrow?: boolean
}

const Header: React.FC<HeaderProps> = ({label, showbackArrow}) => {
  const router = useRouter()
  const handleBack = useCallback(()=>{
    router.back()
  },[showbackArrow])
  return (
    <div className="p-5 border-b-[1px] border-neutral-800 text-white">
        <div className="flex items-center gap-3">
            {
                showbackArrow &&
                <BiArrowBack onClick={handleBack} size={20} color='white' className='cursor-pointer hover:opacity-70 transition' />
            }
            <h2 className="text-white font-semibold">{label}</h2>
        </div>
    </div>
  )
}

export default Header