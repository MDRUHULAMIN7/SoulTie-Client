
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Heading from "../Sidebar/Heading";
import {  useState } from "react";
// import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const EditBiodata = () => {
    const {user}=UseAuth()
    const navigate=useNavigate()
    const[loading,setLoading]=useState(false)
    const {
        register,
       
        handleSubmit,
        formState: { errors },
      } = useForm();
      
      const axiosPublic = UseAxiosPublic();
      const {data: iddata=[], refetch} = useQuery({
        queryKey:['iddata'],
        queryFn: async() =>{
        const res = await axiosPublic.get('/biodatas')
        return res.data
        }
          })
          console.log(iddata);
          const idbio = iddata[0]?.length;
          console.log(idbio);

          const news =iddata[0]
          const isBiodata = news?.find(fdata=>fdata.ContactEmail == user?.email)

    //   const navigate = useNavigate()
      const image_host_key = import.meta.env.VITE_IMAGE_API;
      const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;
    const onSubmit = async (data) => {
      setLoading(true)
     
        const imagefile = { image: data.photo[0] };
    
        const res = await axiosPublic.post(image_host_api, imagefile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        const name = data.name;
        const photo = res.data.data.url;
        const biodataType = data.biodatatype;
        const birtsdate =data.birthdate;
        
        const role='normal';
        const Height = data.hieght;
        const Weight = data.wieght;
        const Age = data.age;
        const Occupation= data.occupation;
        const Race = data.race;
        const FatherName = data.fathersname
        const MotherName = data.mothersname
        const ParmanentDivison = data.parmanentdivison
        const PresentDivison = data.presentdivison
        const PartnerAge = data.partenerage
        const ParnerHeight = data.partnerhieght
        const PartnerWeight = data.partnerwieght
        const ContactEmail = data.contactemail
        const MobileNumber = data.phonenumber
        const biodataId = idbio +1 ;
        

        const biodataInfo = {name,photo,role, biodataType,birthDate:new Date(birtsdate),Height,Weight,Age,Occupation,Race,FatherName,MotherName,ParmanentDivison,PresentDivison,PartnerAge,ParnerHeight,PartnerWeight,ContactEmail,MobileNumber,biodataId}
        console.log(biodataInfo);
      

        axiosPublic.put('/biodatas',biodataInfo)
        
        .then(result=>{
          console.log(result.data);
          if(result.data.modifiedCount > 0 || result.data.upsertedCount > 0  ){
        
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your BiodataAdded Succesfully",
              showConfirmButton: false,
              timer: 1500
            });
            refetch()
            navigate('/dashboard/viewbiodata')
          }
          

        })
        .then(err=>{
          console.log(err);
          setLoading(false)
        })
        setLoading(false)
    
    }
    return (



      <div>
        {
          isBiodata ? 
           <div className="bg-rose-50 rounded-md pt-6">
      
          <Heading heading={'Edit Your BioData'} subheading={'Edit Your Needed Data '}></Heading>
 
 
       <div>
       <section className="p-6  dark:text-white">
       <form
     onSubmit={handleSubmit(onSubmit)}
     noValidate=""
     action=""
     className="space-y-6"
   >
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 text-lg">
      {/* name */}
      <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
         Name
       </label>
       <input
         type="name"
         {...register("name", { required: true })}
         name="name"
         id="username"
         required
         placeholder="Username"
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
       {errors.name && (
         <span className="text-red-600">Name is required</span>
       )}
     </div>
{/* photo */}
     <div className=" text-sm">
       <label htmlFor="username" className="block text-black text-lg">
         Photo
       </label>

       <div className="flex bg-white w-full mt-1 rounded-lg ">
         <input
           type="file"
           {...register("photo", { required: true })}
           required
           name="photo"
           id="files"
           className="px-8 py-1 dark:text-black text-lg dark:bg-white"
         />
        
       </div>
       {errors.photo && (
         <span className=" text-red-600 bg-slate-200 p-2">
           photoURL is required
         </span>
       )}
     </div>
     {/* biodata type */}
     <div className="flex-col  col-span-1">
 
 <span>Biodata Type*</span> <br />
 <select defaultValue={'default'} {...register("biodatatype")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Biodata Type</option>
<option value={"male"}>Male</option>
<option value={"female"}>Female</option>
</select>

</div>
     {/* birthdate */}
     <div className="">
           <label htmlFor="">BirthDate</label>
           <br />
           <input
           {...register("birthdate")}
             className="border-2 border-purple-500 rounded-xl px-3 py-1 mt-1 w-full"
             placeholder="birthdate"
             required
             type="date"
             name="birthdate"
             id=""
           />
         </div>
         {/* hieght */}
         <div className="flex-col  col-span-1">
 <span>Hieght*</span> <br />
 <select defaultValue={'default'} {...register("hieght")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Hieght</option>
<option value={"4"}>4 feet</option>
<option value={"5"}>5 feet</option>
<option value={"6"}>6 feet</option>
<option value={"7"}>7 feet</option>
</select>

</div>
         {/* wieght */}
         <div className="flex-col  col-span-1">
 <span>Wieght*</span> <br />
 <select defaultValue={'default'} {...register("wieght")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Wieght</option>
<option value={"50"}>50 kg</option>
<option value={"55"}>55 kg</option>
<option value={"60"}>60 kg</option>
<option value={"65"}>65 kg</option>
<option value={"70"}>70 kg</option>
<option value={"75"}>75 kg</option>

</select>

</div>
{/* age */}

<div className=" text-sm">
       <label htmlFor="username" className="block text-black text-lg mb-1">
         Age
       </label>
       <input
         type="number"
         {...register("age", { required: true })}
         name="age"
         id="username"
         required
         placeholder="age"
         className="w-full px-4 py-3  rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
      
     </div>

     {/* occupation */}

     <div className="flex-col  col-span-1">
 
 <span>Occupatio*</span> <br />
 <select defaultValue={'default'} {...register("occupation")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Occupation</option>
<option value={"Doctor"}>Doctor</option>
<option value={"Engineer"}>Engineer</option>
<option value={"Web developer"}>Web developer</option>
<option value={"Hacker"}>Hacker</option>
<option value={"farmer"}>farmer</option>
<option value={"driver"}>driver</option>
<option value={"housewife"}>housewife</option>
<option value={"teacher"}>teacher</option>
<option value={"student"}>student</option>
</select>

</div>
     {/* Race */}

     <div className="flex-col  col-span-1">
 
 <span>Race*</span> <br />
 <select defaultValue={'default'} {...register("race")} className="select rounded-lg select-bordered py-3 mt-1 w-full " required>
<option disabled value={"default"} selected>Race</option>
<option value={"Muslim"}>Muslim</option>
<option value={"hindu"}>hindu</option>
<option value={"budho"}>budho</option>

</select>

</div>

 {/* fathersname */}
 <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
         FathersName
       </label>
       <input
         type="name"
         {...register("fathersname", { required: true })}
        
         id="username"
         required
         placeholder="Fathersname"
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
       {errors.name && (
         <span className="text-red-600">FathersName is required</span>
       )}
     </div>
 {/* motherssname */}
 <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
        MothersName
       </label>
       <input
         type="name"
         {...register("mothersname", { required: true })}
       
         id="username"
         required
         placeholder="Mothername"
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
       {errors.name && (
         <span className="text-red-600">MothersName is required</span>
       )}
     </div>

     {/* parmanent divisons */}
     <div className="flex-col  col-span-1">
 
 <span>Parmanent Divison*</span> <br />
 <select defaultValue={'default'} {...register("parmanentdivison")} className="select rounded-lg select-bordered py-3 mt-1 w-full " required>
<option disabled value={"default"} selected>Divison</option>
<option value={"Rajshahi"}>Rajshahi</option>
<option value={"Dhaka"}>Dhaka</option>
<option value={"Rangpur"}>Rangpur</option>
<option value={"Chattagram"}>Chatragram</option>
<option value={"Sylhet"}>Sylhet</option>
<option value={"Khulna"}>Khulna</option>
<option value={"Maymansign"}>MaymenSingh</option>
<option value={"Barisal"}>Barisal</option>
</select>

</div>
  
     {/* present divisons */}
     <div className="flex-col  col-span-1">
 
 <span>Present Divison*</span> <br />
 <select defaultValue={'default'} {...register("presentdivison")} className="select rounded-lg select-bordered py-3 mt-1 w-full " required>
<option disabled value={"default"} selected>Divison</option>
<option value={"Rajshahi"}>Rajshahi</option>
<option value={"Dhaka"}>Dhaka</option>
<option value={"Rangpur"}>Rangpur</option>
<option value={"Chattagram"}>Chatragram</option>
<option value={"Sylhet"}>Sylhet</option>
<option value={"Khulna"}>Khulna</option>
<option value={"Maymansign"}>MaymenSingh</option>
<option value={"Barisal"}>Barisal</option>
</select>

</div>
{/* expected parterage */}

<div className=" text-sm">
       <label htmlFor="username" className="block text-black text-lg mb-1">
       Expected Partner  Age
       </label>
       <input
         type="number"
         {...register("partenerage", { required: true })}
       
         id="username"
         required
         placeholder="expected partner age"
         className="w-full px-4 py-3  rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
       {errors.name && (
         <span className="text-red-600">Age is required</span>
       )}
     </div>


            {/* partener hieght */}
         <div className="flex-col  col-span-1">
 <span>Excepted Partner Hieght*</span> <br />
 <select defaultValue={'default'} {...register("partnerhieght")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Hieght</option>
<option value={"4"}>4 feet</option>
<option value={"5"}>5 feet</option>
<option value={"6"}>6 feet</option>
<option value={"7"}>7 feet</option>
</select>

</div>

    {/* partner wieght */}
    <div className="flex-col  col-span-1">
 <span>Expected Partner Wieght*</span> <br />
 <select defaultValue={'default'} {...register("partnerwieght")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Wieght</option>
<option value={"50"}>50 kg</option>
<option value={"55"}>55 kg</option>
<option value={"60"}>60 kg</option>
<option value={"65"}>65 kg</option>
<option value={"70"}>70 kg</option>
<option value={"75"}>75 kg</option>

</select>

</div>

  {/* user email */}
  <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
        Contact Email
       </label>
       <input
         type="email"
         defaultValue={user?.email}
         {...register("contactemail", { required: true })}
     
         readOnly
         id="username"
         required
 
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
      
     </div>
      {/* user phone */}
  <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
        Mobile Number
       </label>
       <input
         type="text"
         
         {...register("phonenumber", { required: true })}
         
       placeholder="Mobile Number"
         id="username"
         required
     
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
      
     </div>
  
    </div>
 
     <button
     disabled={loading}
 type="submit"
 value=""
      className="w-full disabled:bg-gray-400 bg-white rounded-lg py-2 p-3 text-center  text-lg text-whitebg-violet-600">
{ loading ? 'loading' :'Edit Biodata'}
     
     </button>

   </form>
 </section>
       </div>
         </div> :
        //  update  
         
         <div className="bg-rose-50 rounded-md pt-6">
      
      <Heading heading={'Add Your BioData'} subheading={'add your full biodata and complete seriously'}></Heading>


   <div>
   <section className="p-6  dark:text-white">
   <form
     onSubmit={handleSubmit(onSubmit)}
     noValidate=""
     action=""
     className="space-y-6"
   >
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 text-lg">
      {/* name */}
      <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
         Name
       </label>
       <input
         type="name"
         {...register("name", { required: true })}
         name="name"
         id="username"
         required
         placeholder="Username"
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
       {errors.name && (
         <span className="text-red-600">Name is required</span>
       )}
     </div>
{/* photo */}
     <div className=" text-sm">
       <label htmlFor="username" className="block text-black text-lg">
         Photo
       </label>

       <div className="flex bg-white w-full mt-1 rounded-lg ">
         <input
           type="file"
           {...register("photo", { required: true })}
           required
           name="photo"
           id="files"
           className="px-8 py-1 dark:text-black text-lg dark:bg-white"
         />
        
       </div>
       {errors.photo && (
         <span className=" text-red-600 bg-slate-200 p-2">
           photoURL is required
         </span>
       )}
     </div>
     {/* biodata type */}
     <div className="flex-col  col-span-1">
 
 <span>Biodata Type*</span> <br />
 <select defaultValue={'default'} {...register("biodatatype")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Biodata Type</option>
<option value={"male"}>Male</option>
<option value={"female"}>Female</option>
</select>

</div>
     {/* birthdate */}
     <div className="">
           <label htmlFor="">BirthDate</label>
           <br />
           <input
           {...register("birthdate")}
             className="border-2 border-purple-500 rounded-xl px-3 py-1 mt-1 w-full"
             placeholder="birthdate"
             required
             type="date"
             name="birthdate"
             id=""
           />
         </div>
         {/* hieght */}
         <div className="flex-col  col-span-1">
 <span>Hieght*</span> <br />
 <select defaultValue={'default'} {...register("hieght")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Hieght</option>
<option value={"4"}>4 feet</option>
<option value={"5"}>5 feet</option>
<option value={"6"}>6 feet</option>
<option value={"7"}>7 feet</option>
</select>

</div>
         {/* wieght */}
         <div className="flex-col  col-span-1">
 <span>Wieght*</span> <br />
 <select defaultValue={'default'} {...register("wieght")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Wieght</option>
<option value={"50"}>50 kg</option>
<option value={"55"}>55 kg</option>
<option value={"60"}>60 kg</option>
<option value={"65"}>65 kg</option>
<option value={"70"}>70 kg</option>
<option value={"75"}>75 kg</option>

</select>

</div>
{/* age */}

<div className=" text-sm">
       <label htmlFor="username" className="block text-black text-lg mb-1">
         Age
       </label>
       <input
         type="number"
         {...register("age", { required: true })}
         name="age"
         id="username"
         required
         placeholder="age"
         className="w-full px-4 py-3  rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
      
     </div>

     {/* occupation */}

     <div className="flex-col  col-span-1">
 
 <span>Occupatio*</span> <br />
 <select defaultValue={'default'} {...register("occupation")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Occupation</option>
<option value={"Doctor"}>Doctor</option>
<option value={"Engineer"}>Engineer</option>
<option value={"Web developer"}>Web developer</option>
<option value={"Hacker"}>Hacker</option>
<option value={"farmer"}>farmer</option>
<option value={"driver"}>driver</option>
<option value={"housewife"}>housewife</option>
<option value={"teacher"}>teacher</option>
<option value={"student"}>student</option>
</select>

</div>
     {/* Race */}

     <div className="flex-col  col-span-1">
 
 <span>Race*</span> <br />
 <select defaultValue={'default'} {...register("race")} className="select rounded-lg select-bordered py-3 mt-1 w-full " required>
<option disabled value={"default"} selected>Race</option>
<option value={"Muslim"}>Muslim</option>
<option value={"hindu"}>hindu</option>
<option value={"budho"}>budho</option>

</select>

</div>

 {/* fathersname */}
 <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
         FathersName
       </label>
       <input
         type="name"
         {...register("fathersname", { required: true })}
        
         id="username"
         required
         placeholder="Fathersname"
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
       {errors.name && (
         <span className="text-red-600">FathersName is required</span>
       )}
     </div>
 {/* motherssname */}
 <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
        MothersName
       </label>
       <input
         type="name"
         {...register("mothersname", { required: true })}
       
         id="username"
         required
         placeholder="Mothername"
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
       {errors.name && (
         <span className="text-red-600">MothersName is required</span>
       )}
     </div>

     {/* parmanent divisons */}
     <div className="flex-col  col-span-1">
 
 <span>Parmanent Divison*</span> <br />
 <select defaultValue={'default'} {...register("parmanentdivison")} className="select rounded-lg select-bordered py-3 mt-1 w-full " required>
<option disabled value={"default"} selected>Divison</option>
<option value={"Rajshahi"}>Rajshahi</option>
<option value={"Dhaka"}>Dhaka</option>
<option value={"Rangpur"}>Rangpur</option>
<option value={"Chatragram"}>Chatragram</option>
<option value={"Sylhet"}>Sylhet</option>
<option value={"Khulna"}>Khulna</option>
<option value={"MaymenSingh"}>MaymenSingh</option>
<option value={"Barishal"}>Barishal</option>
</select>

</div>
  
     {/* present divisons */}
     <div className="flex-col  col-span-1">
 
 <span>Present Divison*</span> <br />
 <select defaultValue={'default'} {...register("presentdivison")} className="select rounded-lg select-bordered py-3 mt-1 w-full " required>
<option disabled value={"default"} selected>Divison</option>
<option value={"Rajshahi"}>Rajshahi</option>
<option value={"Dhaka"}>Dhaka</option>
<option value={"Rangpur"}>Rangpur</option>
<option value={"Chatragram"}>Chatragram</option>
<option value={"Sylhet"}>Sylhet</option>
<option value={"Khulna"}>Khulna</option>
<option value={"MaymenSingh"}>MaymenSingh</option>
<option value={"Barishal"}>Barishal</option>
</select>

</div>
{/* expected parterage */}

<div className=" text-sm">
       <label htmlFor="username" className="block text-black text-lg mb-1">
       Expected Partner  Age
       </label>
       <input
         type="number"
         {...register("partenerage", { required: true })}
       
         id="username"
         required
         placeholder="expected partner age"
         className="w-full px-4 py-3  rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
       {errors.name && (
         <span className="text-red-600">Age is required</span>
       )}
     </div>


            {/* partener hieght */}
         <div className="flex-col  col-span-1">
 <span>Excepted Partner Hieght*</span> <br />
 <select defaultValue={'default'} {...register("partnerhieght")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Hieght</option>
<option value={"4"}>4 feet</option>
<option value={"5"}>5 feet</option>
<option value={"6"}>6 feet</option>
<option value={"7"}>7 feet</option>
</select>

</div>

    {/* partner wieght */}
    <div className="flex-col  col-span-1">
 <span>Expected Partner Wieght*</span> <br />
 <select defaultValue={'default'} {...register("partnerwieght")} className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Wieght</option>
<option value={"50"}>50 kg</option>
<option value={"55"}>55 kg</option>
<option value={"60"}>60 kg</option>
<option value={"65"}>65 kg</option>
<option value={"70"}>70 kg</option>
<option value={"75"}>75 kg</option>

</select>

</div>

  {/* user email */}
  <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
        Contact Email
       </label>
       <input
         type="email"
         defaultValue={user?.email}
         {...register("contactemail", { required: true })}
     
         readOnly
         id="username"
         required
 
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
      
     </div>
      {/* user phone */}
  <div className="space-y-1 text-sm">
       <label htmlFor="username" className="block text-black text-lg">
        Mobile Number
       </label>
       <input
         type="text"
         
         {...register("phonenumber", { required: true })}
         
       placeholder="Mobile Number"
         id="username"
         required
     
         className="w-full px-4 py-3 rounded-md border-white bg-whitetext-white focus:border-violet-600"
       />
      
     </div>
  
    </div>
 
     <button
     disabled={loading}
 type="submit"
 value=""
      className="w-full disabled:bg-gray-400 bg-white rounded-lg py-2 p-3 text-center  text-lg text-whitebg-violet-600">
{ loading ? 'loading' :'Save And Publish'}
     
     </button>

   </form>
</section>
   </div>
     </div>
        }
      </div>
    );
};

export default EditBiodata;