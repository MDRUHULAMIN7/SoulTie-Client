import { useEffect, useState } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";


const MyFavouriteBiodata = () => {
   const axiosPublic=UseAxiosPublic()
   const {user}=UseAuth()
   const [favData,setdata]=useState(null)

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const res =await axiosPublic.get(`/favourites/${user?.email}`)
                console.log(res.data);
                setdata(res.data)
            }
            catch(err){
                console.log(err);
            }
        }
        if(user?.email){
            fetchData()
        }

       
    },[axiosPublic,user?.email])

    const handleDekete=async(id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {


                try{
                    const res = await axiosPublic.delete(`/favourites/${id}`)
                console.log(res.data);
                if(res.data.deletedCount >0){
                    Swal.fire(
                        "Deleted Succesfully!",
                        "Biodata has deleted  from MyFavourites",
                     "success"
                     )
                     const remail = favData.filter(da=> da.BiodataId !== id)
                     setdata(remail)
                }
            }
            catch(err){
                console.log(err);
            }
            }
          });

       
}
    return (
        <div>

            {/* { favData === null ?
       <>     <Heading heading={'Favourites Biodata'} subheading={'See all favourite Biodata'}></Heading>
         
       <div className="container p-2 mx-auto sm:p-4  text-black">
             
<div className="overflow-x-auto">
   <table className="min-w-full text-xl">

       <thead className="bg-rose-100">
           <tr className="text-left">
               <th className="p-3">Name</th>
               <th className="p-3">Occupation</th>
               <th className="p-3"> BiodataId</th>
       
               <th className="p-3"> ParmanentAddress</th>
               <th className="p-3">Action</th>
           </tr>
       </thead>
       <tbody>
           { favData?.map(user=>
               <tr key={user._id} className="border-b text-lg border-opacity-20 border-gray-700">
               <td className="p-3">
                   <p>{user?.Name}</p>
               </td>
               <td className="p-3">
                   <p>{user?.Occupation}</p>
               </td>
           
               <td className="p-3 ">
               <p>{user?. BiodataId}</p>
               </td>
               <td className="p-3 ">
               <p>{user?.ParmanentAddress}</p>
               </td>
               <td className="p-3 ">
                   <button onClick={()=>handleDekete(user?.BiodataId)} className="px-3 py-1 font-semibold rounded-md bg-rose-400 ">
                       Delete
                   </button>
               </td>
           </tr>
           )}

       </tbody>
   </table>
</div>
</div></> :<div>  <div className="flex-col text-center justify-center items-center mt-10 text-2xl md:text-4xl text-rose-300"> <span>No Data Available</span> <br /> <span className="text-lg"> you dont added any Favourite Biodata</span></div></div>} */}
  <div className="container p-2 mx-auto sm:p-4  text-black">
  <Heading heading={'Favourites Biodata'} subheading={'See all favourite Biodata'}></Heading>
             <div className="overflow-x-auto">
                <table className="min-w-full text-xl">
             
                    <thead className="bg-rose-100">
                        <tr className="text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Occupation</th>
                            <th className="p-3"> BiodataId</th>
                    
                            <th className="p-3"> ParmanentAddress</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { favData?.map(user=>
                            <tr key={user._id} className="border-b text-lg border-opacity-20 border-gray-700">
                            <td className="p-3">
                                <p>{user?.Name}</p>
                            </td>
                            <td className="p-3">
                                <p>{user?.Occupation}</p>
                            </td>
                        
                            <td className="p-3 ">
                            <p>{user?. BiodataId}</p>
                            </td>
                            <td className="p-3 ">
                            <p>{user?.ParmanentAddress}</p>
                            </td>
                            <td className="p-3 ">
                                <button onClick={()=>handleDekete(user?.BiodataId)} className="px-3 py-1 font-semibold rounded-md bg-rose-400 ">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        )}
             
                    </tbody>
                </table>
             </div>
             </div>
        </div>
    );
};

export default MyFavouriteBiodata;