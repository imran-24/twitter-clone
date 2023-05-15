import useRegisterModal from "@/hooks/useRegisterModal"
import { useCallback, useState } from "react"
import Input from "../Input"
import Modal from "../Modal"
import useLoginModal from "@/hooks/useLoginModal"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { signIn } from "next-auth/react"



const RegisterModal = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
  
    const handleClick = useCallback(()=> {
      if(loading) return null
      if(registerModal.isOpen) registerModal.onClose()
      if(!loginModal.isOpen) loginModal.onOpen()
    },[loginModal, registerModal, loading])
  
    const handleSubmit = useCallback( async()=>{
        setLoading(true)
        try{

            
            await axios.post('/api/register',{
                name, username, email, password
            })
            toast.success("Account created successfully")
            await signIn('credentials',{
                email, password
            })
            registerModal.onClose()
        }
        catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
        finally{
            setLoading(false)
        }


    }, [registerModal, email, username, name, password])
  
    const handleback = useCallback(()=>{
      if(registerModal.isOpen) registerModal.onClose() 
    },[registerModal])
  
    const body = (
      <div className="flex flex-col gap-3">
          <Input
          type="text" 
          placeholder="Email"
          value={email}
          disabled={loading}
          onChange={(e)=> setEmail(e.target.value)}
          />
          <Input
          type="text" 
          placeholder="Name"
          value={name}
          disabled={loading}
          onChange={(e)=> setName(e.target.value)}
          />
          <Input
          type="text" 
          placeholder="Username"
          value={username}
          disabled={loading}
          onChange={(e)=> setUsername(e.target.value)}
          />
          
          <Input
          type="text" 
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e)=> setPassword(e.target.value)}
          />
      </div>
    )

    const footer = (
        <div className="">
            <p className="flex items-center justify-center gap-2 text-gray-500 text-sm  text-center">
                Already have an account? 
                <span onClick={handleClick} className="text-white hover:underline cursor-pointer"
                > sign in!
                </span>
            </p>
        </div>
    ) 
    return (
      <Modal 
      isOpen={registerModal.isOpen}
      onSubmit={handleSubmit}
      onClose={handleback}
      title="Create an account"
      actionLabel="Register"
      disabled={loading}
      body={body}
      footer={footer}
      />
          
      
    )
  }


export default RegisterModal