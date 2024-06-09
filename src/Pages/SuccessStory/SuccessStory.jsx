
import bg from "../../images/flower.png"
import Heading from "../Dashboard/Sidebar/Heading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/navigation';


import { Rating } from '@smastrom/react-rating'
import {  Parallax,Navigation} from 'swiper/modules';
import '@smastrom/react-rating/style.css'

const SuccessStory = ({data}) => {
  
    console.log(data);
    return (
        <div>
      
            <div className="mt-10 mb-10  bg-no-repeat hero bg-fixed h-screen bg-cover " style={{
            backgroundImage: `url(${bg})`,
          }}>
           <div className="bg-opacity-60 hero-overlay " >
           <Heading heading={"Success Story"} subheading={"---Check it out---"}></Heading>
           <div className="pt-8 text-center"></div>
<div className=" justify-center items-center  mx-auto">
  
    <div className=" w-full  text-white">
 

    
     
    <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax,  Navigation]}
        className="mySwiper sm:w-[70vh] md:w-[95vh]"
      >
        <div
          slot="container-start"
          className="parallax-bg "
          style={{
            'background-image':
            'url(https://i.ibb.co/nDZ3zvK/download-3.jpg)',
          }}
          data-swiper-parallax="-23%"
        ></div>
       { data.map( data=> <SwiperSlide key={data._id}>
          
          <div className="w-96 rounded-md shadow-md bg-rose-50  text-gray-800">
    <img src={data.Coupleimage} alt="" className="object-cover object-center w-full rounded-t-md h-96  dark:bg-gray-500" />
    <div className="flex flex-col justify-between p-6 ">
      <div className="space-y-2">
          <div className="flex justify-center   items-center">
              <h1 className="text-xl text-rose-400">Rating</h1>  <Rating className="text-center my-3 ml-2" style={{ maxWidth: 150 }} value={data.Ratings}  />
                </div>
      </div>
      <p className="text-center">{data.shortStory}</p>
          
    </div>
  </div>
          </SwiperSlide> )}
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