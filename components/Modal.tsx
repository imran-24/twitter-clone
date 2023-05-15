import { useCallback } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import Button from "./Button";
interface ModalProps{
    body: React.ReactElement;
    footer?: React.ReactElement;
    isOpen: boolean;
    title?: string;
    onClose: ()=> void;
    onSubmit: ()=> void;
    actionLabel: string;
    disabled?: boolean
}

const Modal: React.FC<ModalProps> = ({
    body,
    footer,
    isOpen,
    title,
    onClose,
    onSubmit,
    actionLabel,
    disabled
}) => {
   
    const handleClose = useCallback(()=>{
        if(disabled) return
        onClose()
    },[disabled, onClose])

    const handleSubmit = useCallback(()=>{
        if(disabled) return 
        onSubmit()
    },[disabled, onSubmit])

    if(!isOpen) return null
  return (
    <div className="
    bg-neutral-800
    flex
    items-center
    justify-center
    z-50 
    fixed 
    overflow-y-auto
    overflow-x-hidden
    inset-0 
    bg-opacity-70
    ">
       <div className="w-[380px] rounded-t shadow bg-black  py-10 flex flex-col ">
            <div className="w-full px-6">
                {/* header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-white font-bold text-xl ">{title}</h2>
                    <button onClick={handleClose}>
                        <AiOutlineClose size={20} color='white' />
                    </button>
                </div>
                {/* body */}
                <div className="my-8 flex flex-col w-full">
                    {body}
                </div>
                {/* footer */}
                <div className="w-full flex flex-col gap-2">
                    <Button 
                    label={actionLabel}
                    secondary
                    fullWidth
                    disabled={disabled}
                    onClick={handleSubmit}
                    />
                    
                    {footer}
                    
                </div>

            </div>
       </div>
    </div>
  )
}

export default Modal