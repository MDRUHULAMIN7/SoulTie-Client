import Carousel from "../../Components/Carousel/Carousel";
import HowitWork from "../HowitWork.jsx/HowitWork";
import PremiumMember from "../PremiumMember.jsx/PremiumMember";
import ProggessCXounter from "../Proggess/ProggessCXounter";




const Home = () => {
  
   
    return (
        <div>
         <Carousel></Carousel>
         <PremiumMember></PremiumMember>
         <HowitWork></HowitWork>
         <ProggessCXounter></ProggessCXounter>
            
        </div>
    );
};

export default Home;