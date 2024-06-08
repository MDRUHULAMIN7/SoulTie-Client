import Heading from "../Dashboard/Sidebar/Heading";
import img1 from '../../images/ccccc.jpg'
import img2 from '../../images/counter2.png'
import { FaRegHeart, FaUsers, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { IoManSharp } from "react-icons/io5";
import { IoMdWoman } from "react-icons/io";
import { ImUserCheck } from "react-icons/im";


const ProggessCXounter = () => {
    const { user } = UseAuth();
    const axiosPublic = UseAxiosPublic();
  
    const { data: stats = {} } = useQuery({
      queryKey: ["admin-info"],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosPublic.get("/admin-info");
        return res.data;
      },
    });
    console.log(stats);
    return (
        <div className="">
            <Heading heading={"Progress Counter"} subheading={'see our progress of journy '}></Heading>
            <div className="lg:flex gap-4 lg:mb-32 " >
                <div className="w-1/2 mx-auto hidden lg:block">
                    <div className="flex bottom-2 relative justify-center items-center w-full">
                    <img className="w-96 h-[450px] rounded-lg" src={img1} alt="" />
                    <img  style={{borderRadius:'0 200px 200px 200px'}} className="w-96 h-72 absolute  top-64 xl:left-80 lg:left-48 justify-end  border-8 hover:filter:grayscale(0%) filter:grayscale(100%) border-white" src={img2} alt=""/>
                    </div>
                </div>
                <div className="lg:w-1/2   mx-auto mt-0 md:mt-24 lg:mt-0 ">
                    <div className=" w-11/12 mx-auto lg:ml-12 xl:ml-0">
                        <h1 className="xl:text-4xl text-3xl font-semibold ">Our Progress Counter from our start</h1>
                        <h1 className="text-md font-medium mt-6">Visualize your journey to forever with our matrimony progress counter! This innovative tool keeps you engaged and excited by tracking ourprogress towards your wedding day</h1>

                        <h1 className="font-medium mt-6 mb-8">
                            <span className="text-rose-400 font-medium  text-md">click here </span> to know more about details....
                        </h1>
                        <hr />

                        <h1 className="text-md font-medium mt-6">Whether you are managing tasks or cherishing moments together, the counter adds a whimsical touch to your love story, reminding you how close you are to building your happily ever after</h1>

                        <div className="flex justify-between mx-6 mt-10 items-center">
                            <h1 className="flex text-lg gap-2 h-12 items-center">
                                <h1>
                                    <FaWhatsapp className="h-10 w-10"></FaWhatsapp> 
                                </h1>
                                <h1 className="flex-col">
                                <p></p>Enquiry
                                    <p className="text-xl font-medium">+008 019001..</p>
                                    
                                </h1>
                            </h1>
                            <h1 className="flex text-lg gap-2 h-12 items-center">
                                <h1>
                                    <MdEmail className="h-10 w-10"></MdEmail> 
                                </h1>
                                <h1 className="flex-col">
                                <p></p>Get Support
                                    <p className="text-xl font-medium">soultie@a.com..</p>
                                    
                                </h1>
                            </h1>
                        </div>
                     
                    </div>
                </div>
            </div>
{/* md */}
            <div className="mt-5 md:mt-10 hidden lg:block">
         <div className="flex justify-center items-center">
        
         <div className="border-y border-r border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><FaRegHeart /></h1><h1 className="text-4xl">{10}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">Couple Pared</h1>
           </div>
         <div className="border-y border-r border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><FaUsers/></h1><h1 className="text-4xl">{stats.biodata}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">register biodatas</h1>
           </div>
         <div className="border-y border-r border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><IoManSharp /></h1><h1 className="text-4xl">{stats.maleData}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">Male biodatas</h1>
           </div>
         <div className="border-y border-r border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><IoMdWoman/></h1><h1 className="text-4xl">{stats.femaleData}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">Female biodatas</h1>
           </div>
         <div className="border-y border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><ImUserCheck /></h1><h1 className="text-4xl">{stats.premiumData}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">Premium biodatas</h1>
           </div>

        
         </div>
            </div>
            {/* small */}

            <div className="mt-5 md:mt-10 lg:hidden">

            <div className="grid grid-cols-2 md:grid-cols-3  gap-3">
            <div className="border border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><FaRegHeart /></h1><h1 className="text-4xl">{10}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">Couple Pared</h1>
           </div>
         <div className="border border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><FaUsers/></h1><h1 className="text-4xl">{stats.biodata}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">register biodatas</h1>
           </div>
         <div className="border border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><IoManSharp /></h1><h1 className="text-4xl">{stats.maleData}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">Male biodatas</h1>
           </div>
         <div className="border border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><IoMdWoman/></h1><h1 className="text-4xl">{stats.femaleData}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">Female biodatas</h1>
           </div>
         <div className="border  border-rose-400 p-4">
         <h1 className="flex gap-2 text-2xl font-semibold text-rose-500">  <h1 className="border-2 px-2 flex items-center rounded-md border-black"><ImUserCheck /></h1><h1 className="text-4xl">{stats.premiumData}+</h1></h1> <h1 className="mt-2 ml-12 text-lg text-rose-400">Premium biodatas</h1>
           </div>
        
         </div>

            </div>
            
        </div>
    );
};

export default ProggessCXounter;