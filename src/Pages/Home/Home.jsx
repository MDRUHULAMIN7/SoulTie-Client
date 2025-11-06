import { useQuery } from "@tanstack/react-query";
import Carousel from "../../Components/Carousel/Carousel";
import LoadingSpiner from "../../Components/Shareds/LoadingSpiner";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import HowitWork from "../HowitWork.jsx/HowitWork";
import PremiumMember from "../PremiumMember.jsx/PremiumMember";
import ProggessCXounter from "../Proggess/ProggessCXounter";
import SuccessStory from "../SuccessStory/SuccessStory";
import About from "../About/About";
import Contact from "../Contact/Contact";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import { useEffect } from "react";




const Home = () => {
  const {loading,user}= UseAuth()
  const axiosPublic= UseAxiosPublic()
    const {data=[]}=useQuery({
        queryKey:["data"],
        enabled:!!user ||!loading,
        queryFn:async()=>{
            const res = await axiosPublic.get('/success')
            console.log(res)
          return res?.data
            
        }
        
    })
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
useEffect(() => {
  scrollToTop();
}, []);

  if(loading){
    return <LoadingSpiner></LoadingSpiner>
  }
   
    return (
        <div>
         <Carousel></Carousel>
         <PremiumMember></PremiumMember>
         <HowitWork></HowitWork>
         <ProggessCXounter data={data}></ProggessCXounter>
         <About></About>
         <SuccessStory data={data}></SuccessStory>
         <Contact></Contact>
            <ScrollToTopButton></ScrollToTopButton>
        </div>
    );
};

export default Home;