import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosPublic from "./UseAxiosPublic";
// import UseAxiosSecure from "./UseAxiosSecure";


const UserRole = () => {
    const {user,loading}=UseAuth()
    console.log(user.email);
//    const axiosSecure=UseAxiosSecure()
    const axiosPublic = UseAxiosPublic()
    const {data:role=[],isLoading}=useQuery({
        queryKey:['role',user?.email],
        enabled:!!user?.email && !loading,
        queryFn:async()=>{
            const res= await axiosPublic.get(`/user/${user?.email}`)
           
            return [res.data.roll,res.data.role];
        }
    })
   
    return [role,isLoading]
};

export default UserRole;