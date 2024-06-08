import { useQuery } from "@tanstack/react-query";
import Carousel from "../../Components/Carousel/Carousel";
import LoadingSpiner from "../../Components/Shareds/LoadingSpiner";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import HowitWork from "../HowitWork.jsx/HowitWork";
import PremiumMember from "../PremiumMember.jsx/PremiumMember";
import ProggessCXounter from "../Proggess/ProggessCXounter";
import SuccessStory from "../SuccessStory/SuccessStory";




const Home = () => {
  const {loading}= UseAuth()
  const axiosPublic= UseAxiosPublic()
    const {data}=useQuery({
        queryKey:["data"],
        queryFn:async()=>{
            const res = await axiosPublic.get('/success')
          return res.data
            
        }
        
    })

  if(loading){
    return <LoadingSpiner></LoadingSpiner>
  }
   
    return (
        <div>
         <Carousel></Carousel>
         <PremiumMember></PremiumMember>
         <HowitWork></HowitWork>
         <ProggessCXounter data={data}></ProggessCXounter>

         <SuccessStory data={data}></SuccessStory>
            
        </div>
    );
};

export default Home;