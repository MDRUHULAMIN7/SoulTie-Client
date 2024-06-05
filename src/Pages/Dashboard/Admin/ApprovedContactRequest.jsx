import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
// import { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";


const ApprovedContactRequest = () => {
const axiosPublic = UseAxiosPublic()
const {user}=UseAuth()
// const [payData,setData]=useState([])
        const {data:alldata=[]}=useQuery({
            queryKey:['data'],
            enabled:!!user?.email,
            queryFn:async()=>{
                const res = await axiosPublic.get('/payments')
        
                return res?.data
              
            }
            
        })
        // setData(alldata)

        console.log(alldata?.length);




    return (
        <div>
                     <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
    
      <tr className="bg-base-200">
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ApprovedContactRequest;