import Carousel from "../../Components/Carousel/Carousel";
import LoadingSpiner from "../../Components/Shareds/LoadingSpiner";
import UseAuth from "../../Hooks/UseAuth";
import HowitWork from "../HowitWork.jsx/HowitWork";
import PremiumMember from "../PremiumMember.jsx/PremiumMember";
import ProggessCXounter from "../Proggess/ProggessCXounter";
import SuccessStory from "../SuccessStory/SuccessStory";
import About from "../About/About";
import Contact from "../Contact/Contact";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";

const Home = () => {
  const { loading } = UseAuth();

  if (loading) {
    return <LoadingSpiner></LoadingSpiner>;
  }

  return (
    <div>
      <Carousel></Carousel>
      <PremiumMember></PremiumMember>
      <HowitWork></HowitWork>
      <ProggessCXounter></ProggessCXounter>
      <About></About>
      <SuccessStory></SuccessStory>
      <Contact></Contact>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
};

export default Home;
