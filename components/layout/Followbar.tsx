import useUsers from "@/hooks/useUsers"
import Avatar from "../Avatar";


const Followbar = () => {
  const {data: users} = useUsers();

  return (
    <div className="px-2  py-4 hidden lg:block">
        <div className="p-4  rounded-lg shadow-md  text-white bg-neutral-800 ">
            <h2 className="font-semibold">Who to follow</h2>
            <div className="py-6  flex flex-col gap-4">
            {
                users?.map((user: Record<string, any>) => (
                    <div key={user?.id} className="flex items-center w-full gap-4 ">
                        <Avatar userId={user?.id}/>
                        <div className="flex flex-col ">
                            <p className="text-white font-semibold text-sm">{user?.name}</p>
                            <p className="text-neutral-400 text-sm">@{user?.username}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default Followbar