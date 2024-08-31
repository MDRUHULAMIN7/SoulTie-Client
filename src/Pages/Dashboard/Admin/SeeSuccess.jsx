import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import LoadingSpiner from "../../../Components/Shareds/LoadingSpiner";
import Heading from "../Sidebar/Heading";
import { useState } from "react";

import BookingModal from "./BookingModal";



const SeeSuccess = () => {
    const {loading}= UseAuth()
    const [isOpen,setIsopen]=useState(false)
    const [modaldata,setModaldata]=useState([])
  const axiosPublic= UseAxiosPublic()
    const {data}=useQuery({
        queryKey:["data"],
        queryFn:async()=>{
            const res = await axiosPublic.get('/success')
          return res.data
            
        }
        
    })

    console.log(data);

  if(loading){
    return <LoadingSpiner></LoadingSpiner>
  }
  const handlemodal=(user)=>{
    setIsopen(true)
    setModaldata(user)

  }

  const closeModal =()=>{
    setIsopen(false)
    // setModaldata([])
  }
    return (
        <div>
      <Heading
        heading={"All Success Story"}
        subheading={"see success story"}
      ></Heading>

      <div className="container p-2 mx-auto sm:p-4  text-black">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xl">
            <thead className="bg-rose-100">
              <tr className="text-left">
                <th className="p-3">SelfBiodataId</th>
                <th className="p-3">PartnerBiodataId</th>
                <th className="p-3">SeeBiodata</th>

                
              </tr>
            </thead>
            <tbody>
              {data?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b text-lg border-opacity-20 border-gray-700"
                >
                  <td className="p-3">
                    <p>{user?.SelfBiodata}</p>
                  </td>
                  <td className="p-3">
                    <p>{user?.PartnerBiodata}</p>
                  </td>

                  <td className="p-3 ">
                    <button onClick={()=>handlemodal(user)} className="bg-rose-300 px-3 py-2 rounded-md">See Story</button>
                 
                  </td>
                  
                </tr>
                 

              ))}
              <BookingModal isOpen={isOpen} closeModal={closeModal} user={modaldata}></BookingModal>
               
            </tbody>
          </table>

               
        
        </div>
      </div>
    </div>
    );
};

export default SeeSuccess;