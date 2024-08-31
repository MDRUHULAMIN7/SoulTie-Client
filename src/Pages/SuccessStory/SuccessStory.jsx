import bg from "../../images/flower.png";
import Heading from "../Dashboard/Sidebar/Heading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import { Parallax, Navigation } from 'swiper/modules';
import '@smastrom/react-rating/style.css';

const SuccessStory = ({ data }) => {
    if (!data.length > 0) {
        return null; // Return null if there's no data
    }

    return (
        <div className="relative mt-10 mb-10 bg-no-repeat bg-fixed h-screen bg-cover" style={{ backgroundImage: `url(${bg})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
                <Heading heading={"Success Story"} subheading={"---Check it out---"} />
                <div className="w-full px-4 sm:px-8 md:px-16">
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
                        modules={[Parallax, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            320: { // Mobile
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            640: { // Tablet
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: { // Desktop
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        <div
                            slot="container-start"
                            className="parallax-bg"
                            style={{
                                backgroundImage: 'url(https://i.ibb.co/nDZ3zvK/download-3.jpg)',
                            }}
                            data-swiper-parallax="-23%"
                        ></div>
                        {data.map((item) => (
                            <SwiperSlide key={item._id}>
                                <div className="w-full max-w-sm mx-auto rounded-lg shadow-lg bg-white overflow-hidden">
                                    <img src={item.Coupleimage} alt="" className="object-cover object-center w-full h-64" />
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h1 className="text-lg font-semibold text-rose-500">Rating</h1>
                                            <Rating className="my-3" style={{ maxWidth: 150 }} value={item.Ratings} />
                                        </div>
                                        <p className="text-gray-700">{item.shortStory}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default SuccessStory;
