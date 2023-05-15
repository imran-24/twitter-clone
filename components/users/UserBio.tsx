import useUser from "@/hooks/useUser"
import Button from "../Button"
import {BiCalendar} from 'react-icons/bi'
import useCurrentUser from "@/hooks/useCurrentUser"
import { useMemo } from "react"
import { format } from "date-fns"
import useEditModal from "@/hooks/useEditModal"
import useFollow from "@/hooks/useFollow"
interface UserBioProps{
    userId: string
}

const UserBio: React.FC<UserBioProps> = ({userId}) => {
  const {data: fetchedUser, isLoading, } = useUser(userId)
  const {data: currentUser} = useCurrentUser()
  const {toggleFollow, isFollowing} = useFollow(userId)
  const editMoal = useEditModal()
  const createdAt = useMemo(()=>{
    if(!fetchedUser?.createdAt) return null
    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy')
  },[fetchedUser?.createdAt])
  console.log(fetchedUser,currentUser)
  if(!fetchedUser) return null
  return (
    <div className="border-b-[1px] border-neutral-800  px-4 pb-4 ">
        <div className="flex justify-end pt-2">
        {currentUser?.id == userId  ?
            <Button onClick={editMoal.onOpen} secondary label='edit'/> :
            <Button 
            onClick={toggleFollow} 
            secondary={!isFollowing} 
            outline={isFollowing}
            label={isFollowing ? 'following' : "follow"}/> }
        </div>
        <div className="space-y-4 mt-6">
            <div>
                <h2 className="text-2xl text-white">{fetchedUser?.name}</h2>
                <p className=" text-neutral-500">{fetchedUser?.username}</p>
            </div>

            <div>
            <p className=" text-white">{fetchedUser?.bio}</p>
            </div>            
            <div className="flex items-center gap-3 text-neutral-500">
                <BiCalendar size={24} />
                <p>
                Joined {createdAt}
                </p>
            </div>

            <div className="flex gap-4 items-center">
                <p className=" text-neutral-500 ">
                    <span className="text-white">
                    {fetchedUser?.followingIds?.length}
                    </span> Following</p>
                <p className=" text-neutral-500">
                    <span className="text-white">
                    {fetchedUser?.followersCount || 0}
                    </span> Followers</p>

            </div>

            
        </div>

    </div>
  )
}

export default UserBio