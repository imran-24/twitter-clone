import useEditModal from "@/hooks/useEditModal"
import { useCallback, useEffect, useState } from "react"
import Input from "../Input"
import Modal from "../Modal"
import useLoginModal from "@/hooks/useLoginModal"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { signIn } from "next-auth/react"
import useCurrentUser from "@/hooks/useCurrentUser"
import useUser from "@/hooks/useUser"
import ImageUpload from "../ImageUpload"



const EditModal = () => {
    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [name, setName] = useState('')

    const loginModal = useLoginModal()
    const editModal = useEditModal()
    const {data: currentUser} = useCurrentUser()
    const {mutate: mutateFeatchedUser} = useUser(currentUser?.id)

  
    useEffect(()=>{
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setBio(currentUser?.bio)

    }, [currentUser])
  
    const handleSubmit = useCallback( async()=>{
        setLoading(true)
        try{

            
            await axios.patch('/api/edit',{
                name, username, bio, coverImage, profileImage
            })
            mutateFeatchedUser()
            toast.success("Profile updated successfully")
            
            editModal.onClose()
        }
        catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
        finally{
            setLoading(false)
        }


    }, [editModal, name, username, bio, coverImage, profileImage])
  
    const handleback = useCallback(()=>{
      if(editModal.isOpen) editModal.onClose() 
    },[editModal])
  
    const body = (
      <div className="flex flex-col gap-3">
          <ImageUpload
          value={profileImage}
          onChange={(image)=> setProfileImage(image)}
          disabled={loading}
          label="Upload profile image"
          />
          <ImageUpload
          value={coverImage}
          onChange={(image)=> setCoverImage(image)}
          disabled={loading}
          label="Upload cover image"
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
          placeholder="Bio"
          value={bio}
          disabled={loading}
          onChange={(e)=> setBio(e.target.value)}
          />
         
      </div>
    )

   
    return (
      <Modal 
      isOpen={editModal.isOpen}
      onSubmit={handleSubmit}
      onClose={handleback}
      title="Edit your profile"
      actionLabel="Save"
      disabled={loading}
      body={body}
     
      />
          
      
    )
  }


export default EditModal