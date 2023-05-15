import useUser from "@/hooks/useUser"
import Image from "next/image"
import Avatar from "../Avatar"

interface UserHeroProps{
    userId: string
}

const UserHero: React.FC<UserHeroProps> = ({userId}) => {
  const {data: fetchedUser} = useUser(userId)

  return (
    <div className="
    h-44
    relative
    bg-neutral-700
    ">
    {fetchedUser?.coverImage 
    && 
    <Image
    src={fetchedUser?.coverImage}
    fill
    objectFit="cover" 
    alt="coverPhoto"
    />}
    <div className="absolute -bottom-16 left-4">
    <Avatar isLarge userId={userId} hasBorder/>
    </div>
    </div>
  )
}

export default UserHero