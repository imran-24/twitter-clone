import { useCallback, useState } from "react"
import Input from "../Input"
import useLoginModal from "@/hooks/useLoginModal"
import Modal from "../Modal"
import useRegisterModal from "@/hooks/useRegisterModal"
import useCurrentUser from "@/hooks/useCurrentUser"
import { signIn } from "next-auth/react"
import {toast} from 'react-hot-toast'

const LoginModal = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const handleClick = useCallback(()=> {
    if(loading) return null
    if(loginModal.isOpen) loginModal.onClose()
    if(!registerModal.isOpen) registerModal.onOpen()
  },[loginModal, registerModal, loading])

  const handleSubmit = useCallback(async()=>{
    setLoading(true)
    try{
        await signIn('credentials',{
            email, password
        })
        loginModal.onClose()
        toast.success("Logged in ")
    }
    catch(error){
        console.log(error)
        toast.error('Something went wrong')
    }
    finally{
        setLoading(false)
    }
  }, [loginModal, email, password])


  const handleback = useCallback(()=>{
    if(loginModal.isOpen) loginModal.onClose() 
  },[loginModal])

  const body = (
    <div className="flex flex-col gap-3">
        <Input 
        placeholder="Email"
        value={email}
        disabled={loading}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <Input 
        placeholder="Password"
        value={password}
        disabled={loading}
        onChange={(e)=> setPassword(e.target.value)}
        />
    </div>
  )
  const footer = (

    <div className="">
        <p className="flex items-center justify-center gap-2 text-gray-500 text-sm text-center">
            First time using Twitter? 
            <span onClick={handleClick} className="text-white hover:underline cursor-pointer"
            > Create an account!
            </span>
        </p>
    </div>
    
) 
  return (
    <Modal 
    isOpen={loginModal.isOpen}
    onSubmit={handleSubmit}
    onClose={handleback}
    title="Sign In"
    actionLabel="Login"
    disabled={loading}
    body={body}
    footer={footer}
    />
        
    
  )
}

export default LoginModal