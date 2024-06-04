import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";


const ApprovedPremium = () => {
    const {user}=UseAuth()
    const axiosPublic= UseAxiosPublic()
    const [reqdata,setData]=useState(null)

    useEffect(()=>{
        const loaddata=async()=>{
           const res = await axiosPublic.get('/biodatas')
        //   console.log(res.data);
            const datas = res.data[0]?.filter((d)=>d.role === "requested")
            // console.log(datas);
            setData(datas)
        }

        if(user?.email){
            loaddata()
        }
    },[axiosPublic,user?.email])
    console.log(reqdata);

    const handlePremium = async (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "Are you sure to make this biodata Premium",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "rose",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes Sure!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const updaterole = { updaterole: "premium" };
    
            const res = await axiosPublic.patch(`/biodataupdatepremium/${id}`, updaterole);
            console.log(res);
            console.log(id);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: " Successfull",
                text: "The biodata is Premium Now",
                icon: "success",
              });

              const remain = reqdata.filter((d)=>d._id !== id)
              setData(remain)
            } else {
              Swal.fire({
                title: "Requested Failed",
                text: "Something wrong!",
                icon: "error",
              });
            }
          }
        });
      };
    return (
        <div>
        <Heading
          heading={"Approved Premiums"}
          subheading={"Approved request to premium"}
        ></Heading>
  
        <div className="container p-2 mx-auto sm:p-4  text-black">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xl">
              <thead className="bg-rose-100">
                <tr className="text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">BiodataId</th>
                  <th className="p-3">Status</th>
  
                  <th className="p-3">MakePremium</th>
                </tr>
              </thead>
              <tbody>
                {reqdata?.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b text-lg border-opacity-20 border-gray-700"
                  >
                    <td className="p-3">
                      <p>{user?.name}</p>
                    </td>
                    <td className="p-3">
                      <p>{user?.ContactEmail}</p>
                    </td>
  
                    <td className="p-3 ">
                    <p>{user?.biodataId}</p>
                    </td>
                    <td className="p-3 ">
                    <p className="bg-red-400 px-2 py-1 rounded-xl w-fit">{user?.role}</p>
                    </td>
                    <td className="p-3 ">
                      
                        <button
                          onClick={() => handlePremium(user?._id)}
                          className="px-3 py-1 font-semibold rounded-md bg-rose-400 "
                        >
                          MakePremium
                        </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default ApprovedPremium;