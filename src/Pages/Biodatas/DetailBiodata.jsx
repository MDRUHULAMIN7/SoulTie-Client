import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import BiodataCard from "./BiodataCard";
import Heading from "../Dashboard/Sidebar/Heading";
import Swal from "sweetalert2";
import UserRole from "../../Hooks/UserRole";
import { useState } from "react";



const DetailBiodata = () => {
    const {user}=UseAuth()
   const [role]=UserRole();
 const[isIpoen,SetIsOpen]=useState(false)

const axiosPublic=UseAxiosPublic()
const {id}=useParams()
    console.log(id);
    const {data:mydata}=useQuery({
        queryKey:['data'],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/biodatas/${id}`)

            return res.data
        }
  
    })
    const {data:alldata}=useQuery({
        queryKey:['alldata'],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/biodatas`)

            return res.data[0]
        }
  
    })
    const {data:paydata}=useQuery({
        queryKey:['paydata'],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/payments`)

            return res.data
        }
  
    })
// console.log(paydata);
   
    const finded = paydata?.find(ids=>parseInt(ids?.biodataId) === mydata?.biodataId)
      //  console.log(finded);
const condition = role[1] ==='premium' || parseInt(finded?.biodataId) === mydata?.biodataId;
// console.log(role[0]);

console.log(condition);
  
    const filtered = alldata?.filter((datas)=>datas.biodataType === mydata?.biodataType).slice(0,3)
    // console.log(filtered);

    const handlemyourite=async()=>{
          
    const myfavouriteData={
        Name:mydata?.name,
        BiodataId:mydata?.biodataId,
        ParmanentAddress:mydata?.ParmanentDivison,
        Occupation:mydata?.Occupation,
        useremail:user?.email
    }
   try{
    const res = await axiosPublic.post('/favourites',myfavouriteData)
    console.log(res.data);
      if(res.data.insertedId){

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add to Favourites Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
   }catch(err){
    if(err.response.status){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Already Added to Favourites ",
        showConfirmButton: false,
        timer: 1500
      });
    }
   }
  
    }

    const openModal=()=>{
      SetIsOpen(true)
    }
    const closeModal=()=>{
      SetIsOpen(false)
    }
   
    return (
        <div className=" p-6 rounded-md">
          <Heading subheading={'you can see deatils of a biodata'} heading={'Detail Biodata'}></Heading>
        <div className="bg-rose-100 rounded-sm p-5">
          {/* first */}
          <div className="md:flex  border-b-2 border-y-black pb-4  items-center ">
            <div className="row-span-3  md:w-1/3">
              <img
                className=" rounded-full mx-auto w-24 lg:w-44 h-24  lg:h-44"
                src={mydata?.photo}
                alt=""
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              <div className="text-lg w-full bg-white rounded-md text-black p-2">
                Name : {mydata?.name}
              </div>
              <div className="text-lg w-full bg-white rounded-md text-black p-2">
                Biodata Type : {mydata?.biodataType}
              </div>
              <div className="text-lg w-full bg-white rounded-md text-black p-2">
                BirthDate : {mydata?.birthDate?.slice(0, 10)}
              </div>
              <div className="text-lg w-full bg-white rounded-md text-black p-2">
                Occupation : {mydata?.Occupation}
              </div>
              <div className="text-lg w-full bg-white rounded-md text-black p-2">
                Height : {mydata?.Height}
              </div>
              <div className="text-lg w-full bg-white rounded-md text-black p-2">
                Age : {mydata?.Age}
              </div>
            </div>
          </div>
  
          {/*  */}
  
          <div className="mx-auto pb-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-3 md:gap-5 pt-16">
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              ParmanentDivison : {mydata?.ParmanentDivison}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              Weight : {mydata?.Weight}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              PresentDivison : {mydata?.PresentDivison}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              Race : {mydata?.Race}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              FatherName : {mydata?.FatherName}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              MotherName : {mydata?.MotherName}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              ExceptedPartnerWeight : {mydata?.PartnerWeight}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              ExceptedParnerHeight : {mydata?.PartnerHeight}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              ExceptedPartnerAge : {mydata?.PartnerAge}
            </div>
          { condition  ? <><div className="text-lg w-full bg-white rounded-md text-black p-2">
              ContactEmail : {mydata?.ContactEmail}
            </div></> : <><div className="text-lg w-full bg-rose-200 rounded-md text-black p-2">
            except Contact Information for Email
            </div></>}  
          {condition?<div className="text-lg w-full bg-white rounded-md text-black p-2">
              MobileNumber : {mydata?.MobileNumber}
            </div>: <div className="text-lg w-full bg-rose-200 rounded-md text-black p-2">
            except Contact Information for MobileNumber
            </div>}  
            <button onClick={()=>handlemyourite(mydata)} className="text-lg w-full bg-white rounded-md text-black p-2">
Add to MyFavourites
            </button>
            <div className="text-lg w-full  rounded-md text-black ">
              { !condition ? <button
             onClick={openModal}
                className="bg-rose-200 p-2 w-full hover:bg-rose-300 rounded-md"
              >
               
               Request Contact Information
              </button>  :  '' }
            </div>

            {/* modal   */}
   <div className={isIpoen ?"  bg-rose-50 absolute left-1/3 px-8 py-4 rounded-md w-2/5 " : "hidden"}>
      
      <div className=" space-y-3">
        <h1 className="text-2xl flex justify-center  font-medium text-black">You have to Payment <span className="font-semibold mx-2 text-2xl text-rose-400">5$ </span>for Contact Request</h1> <br />
        <h2 className="text-lg text-center mx-2">After contact request you have to wait sometime for admin approvel. When admin approve your cotact request your can see the contact information</h2>
      </div>
   <div className="flex justify-between items-center">
   <button onClick={closeModal} className="btn px-4 text-lg bg-rose-100 text-black">Cancel</button>
   <Link to={`/dashboard/payment/${mydata?.biodataId}`}  className="btn px-4 text-lg bg-rose-100 text-black">Continue</Link>
   </div>

   
   </div>
                

{/*  */}
          </div>
        </div>

        <Heading subheading={'see some similar biodata here...'} heading={'Smimilar Biodata'}></Heading>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                      filtered?.map(data=> <BiodataCard key={data?._id} data={data}></BiodataCard>)
                    } 
                </div>

            <Link className="my-5 flex justify-center" to={'/biodatas'}> <button className="text-2xl text-rose-400 font-mono text-centre mt-5">Show more... </button></Link>   

      </div>
    );
};

export default DetailBiodata;