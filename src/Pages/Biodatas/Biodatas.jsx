import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import BiodataCard from "./BiodataCard";
import Heading from "../Dashboard/Sidebar/Heading";
import { useEffect, useState } from "react";





const Biodatas = () => {
    

    const axiosPublic = UseAxiosPublic();
  const [allBiodata,setBiodata]=useState(null)

    const {data: aldata=[],} = useQuery({
      queryKey:['aldata'],
      queryFn: async() =>{
      const res = await axiosPublic.get('/biodatas')
      return res.data
      }
        })
        
     
        // console.log(aldata[0]);
             const mapdata =aldata[0]
          
      
             useEffect(()=>{
                setBiodata(mapdata )
             
            },[mapdata])
    
        
        const Maledata = mapdata?.filter((maledata)=> maledata.biodataType== 'male')
        const FeMaledata = mapdata?.filter((femaledata)=> femaledata.biodataType== 'female')
   
        console.log(Maledata);
const handleFemale=()=>{
setBiodata(FeMaledata) 
}
const handleMale=()=>{
    setBiodata(Maledata)
}

       const handle2025=async(first,second)=>{
      
        const age1=first;
        const age2=second;
        const age={
           params:{age1,age2}
        }
       console.log(age);
        
        const res =  await axiosPublic.get('/getbyage',{params:{age1,age2}})
        console.log(res.data);
        setBiodata(res.data)
       }

       const handleDivision=async(r)=>{
        console.log(r);
          const Divison = await axiosPublic.get('/getdivison',{params:{r}})
            console.log(Divison.data);
          setBiodata(Divison.data)
       }
    
    return (
        <div className=" "> 

        <Heading subheading={'all biodatas are here'} heading={'Biodatas'}></Heading>
          <div className="md:flex justify-center  gap-3">
          <div className="md:w-1/4 w-2/3 mx-auto">

             <div className="w-full">
              
             <div className="w-full pt-5 text-center">

                {/*  */}
          <div className="dropdown w-full my-5">
            <div tabIndex={0} role="button" className="btn m-1 w-full mx-auto h-full bg-rose-300 text-white text-xl">
              Filter by BiodataType
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2  shadow bg-base-100 rounded-box "
            >
              <li>
                <button onClick={handleMale}>Male</button>
              </li>
              <li>
                <button onClick={handleFemale}>Female</button>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="dropdown w-full">
            <div tabIndex={0} role="button" className="btn m-1 w-full h-full mx-auto bg-rose-300 text-white text-xl">
              Filter by Age
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow  rounded-box  bg-rose-100 text-black"
            >
              <li>
                <button onClick={()=>handle2025(20,25)}>20-25</button>
              </li>
              <li>
                <button onClick={()=>handle2025(26,30)}>26-30</button>
              </li>
              <li>
                <button onClick={()=>handle2025(31,35)}>31-35</button>
              </li>
              <li>
                <button onClick={()=>handle2025(36,40)}>36-40</button>
              </li>
              <li>
                <button onClick={()=>handle2025(41,45)}>41-45</button>
              </li>
            
            </ul>
          </div>
          {/*  */}
          <div className="dropdown w-full my-5">
            <div tabIndex={0} role="button" className="btn m-1 w-full mx-auto h-full bg-rose-300 text-white text-xl">
              Filter by Divison
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box "
            >
              <li>
                <button onClick={()=>handleDivision("Rangpur")}>Rangpur</button>
                <button onClick={()=>handleDivision("Sylhet")}>Sylhet</button>
                <button onClick={()=>handleDivision("Rajshahi")}>Rajshahi</button>
                <button onClick={()=>handleDivision("Sylhet")}>Sylhet</button>
                <button onClick={()=>handleDivision("Maymansign")}>Maymansign</button>
                <button onClick={()=>handleDivision("Khulna")}>Khulna</button>
                <button onClick={()=>handleDivision("Dhaka")}>Dhaka</button>
                <button onClick={()=>handleDivision("Barisal")}>Barisal</button>
              </li>
             
            </ul>
          </div>
        </div>

              </div> 

            </div>

            <div className="md:w-3/4   w-full flex justify-center mt-4">

              
              { allBiodata===null ? <p className="text-center text-black text-3xl">ruhul</p>
                :allBiodata!== null ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                  allBiodata?.map(data=> <BiodataCard key={data?._id} data={data}></BiodataCard>)
                } 
            </div>:<p className="text-center text-black text-3xl">ruhul</p>
                }
{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {
                      allBiodata?.map(data=> <BiodataCard key={data?._id} data={data}></BiodataCard>)
                    } 
                </div> */}
            </div>
          </div>
        </div>
    );
};

export default Biodatas;