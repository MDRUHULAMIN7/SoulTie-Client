import Heading from "../Dashboard/Sidebar/Heading";
import img1 from '../../images/ccccc.jpg'
import img2 from '../../images/counter2.png'
import { FaRegHeart, FaUsers, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { IoManSharp } from "react-icons/io5";
import { ImUserCheck, ImWoman } from "react-icons/im";

const ProgressCounter = ({ data }) => {
    const { loading } = UseAuth();
    const axiosPublic = UseAxiosPublic();

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ["admin-info"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get("/admin-info");
            return res.data;
        },
    });

    const statsData = [
        {
            icon: <FaRegHeart className="text-4xl" />,
            count: data?.length || 10,
            label: "Couple Paired",
            gradient: "from-rose-400 to-pink-500"
        },
        {
            icon: <FaUsers className="text-4xl" />,
            count: stats.biodata || 0,
            label: "Registered Biodatas",
            gradient: "from-rose-500 to-rose-600"
        },
        {
            icon: <IoManSharp className="text-4xl" />,
            count: stats.maleData || 0,
            label: "Male Biodatas",
            gradient: "from-blue-400 to-blue-500"
        },
        {
            icon: <ImWoman className="text-4xl" />,
            count: stats.femaleData || 0,
            label: "Female Biodatas",
            gradient: "from-pink-400 to-pink-500"
        },
        {
            icon: <ImUserCheck className="text-4xl" />,
            count: stats.premiumData || 0,
            label: "Premium Members",
            gradient: "from-rose-400 to-rose-500"
        }
    ];

    return (
        <div className="py-5 px-4 sm:px-6 lg:px-16 ">
            <Heading 
                heading="Our Journey & Success" 
                subheading="See how we're helping people find their perfect match" 
            />

            {/* Main Content Section */}
            <div className=" mx-auto mt-12">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Side - Images */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative w-full">
                            <img 
                                className="w-full h-[350px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl" 
                                src={img1} 
                                alt="Happy Couple" 
                            />
                            <div className="absolute bottom-4 right-4 lg:-bottom-10 lg:-right-10 ">
                                <img 
                                    className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 object-cover rounded-full border-8 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300" 
                                    src={img2} 
                                    alt="Success Story" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <div>
                     
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                                Connecting Hearts Across Bangladesh
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p className="text-base sm:text-lg">
                                Track our incredible journey as we continue to bring people together. 
                                SoulTie has become Bangladesh's trusted platform for finding meaningful connections 
                                and lifelong partnerships.
                            </p>
                            <p className="text-base sm:text-lg">
                                Every number represents a story of hope, connection, and love. Join thousands 
                                of satisfied members who found their perfect match through our platform.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-500 p-3 rounded-full">
                                        <FaWhatsapp className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Quick Enquiry</p>
                                        <p className="text-lg font-bold text-gray-800">+880 19001...</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-500 p-3 rounded-full">
                                        <MdEmail className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Email Support</p>
                                        <p className="text-lg font-bold text-gray-800">support@soultie.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className=" mx-auto mt-16 xl:mt-24">


                {statsLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-rose-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                        {statsData.map((stat, index) => (
                            <div
                                key={index}
                                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-rose-200 hover:border-rose-400 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div className={`bg-gradient-to-br ${stat.gradient} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto text-white group-hover:rotate-12 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <h4 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center">
                                    {stat.count}+
                                </h4>
                                <p className="text-sm sm:text-base text-gray-600 font-medium text-center">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProgressCounter;