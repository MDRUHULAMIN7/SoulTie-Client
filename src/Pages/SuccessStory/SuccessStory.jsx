
import bg from "../../images/flower.png"
import Heading from "../Dashboard/Sidebar/Heading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const SuccessStory = ({data}) => {
  
    console.log(data);
    return (
        <div>
            <div className="mt-20 mb-10  bg-no-repeat hero bg-fixed bg-cover container" style={{
            backgroundImage: `url(${bg})`,
          }}>
           <div className="bg-opacity-60 hero-overlay " >
           <div className="pt-24 text-center"><Heading heading={"Success Story"} subheading={"---Check it out---"}></Heading></div>
<div className="lg:flex  gap-8 w-9/12 h-96 justify-center items-center  mx-auto">
    <div className="lg:w-1/3 w-full">
        <img className="rounded-xl" src={bg} alt="" />
    </div>
    <div className="lg:w-2/3 w-full space-y-3 text-white">
       {/* swiper */}
       <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
       
        modules={[Pagination]}
        className="mySwiper mb-4"
      >
       

            {data?.map(data=>  <SwiperSlide className="m-2" key={data._id}>
                <div className="w-64 rounded-xl">
                <div className="bg-no-repeat w-full   bg-cover  rounded-xl h-96 hover:text-black" style={{
            backgroundImage: `url(${data.Coupleimage})`,
          }}> <div className="flex-col justify-end pt-72 items-end  mx-auto hover:hero-overlay hover:bg-opacity-65 text-center ">
              
              <div>
              <p className="text-center  text-rose-400 font-semibold">{data.
shortStory}</p>
              </div>
              <div className="flex justify-center   items-center">
            <h1 className="text-xl text-rose-400">Rating</h1>  <Rating className="text-center my-3 ml-2" style={{ maxWidth: 150 }} value={data.Ratings}  />
              </div>
            
  
          </div>
       
                </div>
                </div>
               
                
                
                </SwiperSlide>)}
       
    
      </Swiper>

       {/*  */}
    </div>
</div>
           </div>
            
        </div>
        </div>
    );
};

export default SuccessStory;