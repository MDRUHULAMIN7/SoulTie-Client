import { useEffect, useState } from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import BiodataCard from "../Biodatas/BiodataCard";
import Heading from "../Dashboard/Sidebar/Heading";


const PremiumMember = () => {

    const {user}=UseAuth()
    const axiosPublic= UseAxiosPublic()
    const [reqdata,setData]=useState(null)

    useEffect(()=>{
        const loaddata=async()=>{
           const res = await axiosPublic.get('/premium-biodatas')
        //   console.log(res.data);
            const datas = res.data[0]
            // console.log(datas);
            setData(datas)
        }

        if(user?.email){
            loaddata()
        }
    },[axiosPublic,user?.email])
 

    const handle2025=async()=>{
        const res =  await axiosPublic.get('/getbyage-premium')
        console.log(res.data);
        setData(res.data)
       }
    const handledecen=async()=>{
        const res =  await axiosPublic.get('/getbyage-premium-des')
        console.log(res.data);
        setData(res.data)
       }

    return (
        <div className=" mx-2">  

            <Heading heading={'Premium Biodatas'} subheading={'Here are some premium biodatas'}></Heading>

            <div className="dropdown w-fit my-10 flex justify-start">
            <div tabIndex={0} role="button" className="btn m-1 w-full h-full mx-auto bg-rose-300 text-white text-xl">
              Filter by Age
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow  rounded-box  bg-rose-100 text-black"
            >
              <li>
                <button onClick={handle2025}>Ascending </button>
              </li>
              <li>
                <button onClick={handledecen}>Descending</button>
              </li>
            
            
            </ul>
          </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                  reqdata?.map(data=> <BiodataCard key={data?._id} data={data}></BiodataCard>)
                } 
            </div>
        </div>
    );
};

export default PremiumMember;