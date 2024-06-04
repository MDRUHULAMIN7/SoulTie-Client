import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseAdmin = () => {
    const {user,loading}=UseAuth();
    const axiosSecure = UseAxiosSecure();
    const {data:isAdmin}=useQuery({
        queryKey:[user?.email,'isadmin'],
        enabled:!loading,
        queryFn: async ()=>{
            const res =await
            axiosSecure.get(`users/admin/:${user?.email}`);
           console.log(res);
            return res.data.admin
        }
    })

    return [isAdmin]
};

export default UseAdmin;