import {create} from 'zustand'

interface RegisterModal{
    isOpen: boolean;
    onClose: ()=> void;
    onOpen: ()=> void
}

const useRegisterModal = create<RegisterModal>((set)=>({
    isOpen: false,
    onClose: ()=> set({isOpen: false}),
    onOpen: ()=> set({isOpen: true})
}))

export default useRegisterModal