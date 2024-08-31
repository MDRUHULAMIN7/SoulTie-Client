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

const ProggessCXounter = ({ data }) => {
    const { loading } = UseAuth();
    const axiosPublic = UseAxiosPublic();

    const { data: stats = {} } = useQuery({
        queryKey: ["admin-info"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get("/admin-info");
            return res.data;
        },
    });

    return (
        <div className="px-4 py-8 lg:px-16 lg:py-12">
            <Heading heading={"Progress Counter"} subheading={'See our progress on this journey'} />
            <div className="lg:flex lg:gap-6 lg:mb-32">
                <div className="lg:w-1/2 mx-auto hidden lg:block">
                    <div className="relative w-full">
                        <img className="w-full h-[450px] object-cover rounded-lg shadow-lg" src={img1} alt="Main Image" />
                        <img className="absolute bottom-4 right-4 w-64 h-64 object-cover rounded-full border-8 border-white transform hover:scale-105 transition-transform duration-300" src={img2} alt="Overlay Image" />
                    </div>
                </div>
                <div className="lg:w-1/2 mx-auto mt-6 lg:mt-0">
                    <div className="w-full lg:ml-12">
                        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">Our Progress Counter from Our Start</h1>
                        <p className="mt-4 text-gray-700">Visualize your journey to forever with our matrimony progress counter! This innovative tool keeps you engaged and excited by tracking our progress towards your wedding day.</p>
                        <p className="mt-4 text-gray-700">Whether you are managing tasks or cherishing moments together, the counter adds a whimsical touch to your love story, reminding you how close you are to building your happily ever after.</p>
                        <div className="flex flex-col lg:flex-row justify-between items-center mt-8">
                            <div className="flex items-center gap-4">
                                <FaWhatsapp className="h-12 w-12 text-green-500" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">Enquiry</p>
                                    <p className="text-xl font-medium text-gray-700">+008 019001..</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-6 lg:mt-0">
                                <MdEmail className="h-12 w-12 text-blue-500" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">Get Support</p>
                                    <p className="text-xl font-medium text-gray-700">soultie@a.com..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Desktop View */}
            <div className="mt-10 hidden lg:grid lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                    <FaRegHeart className="text-rose-500 text-3xl mb-2" />
                    <h1 className="text-4xl font-bold text-gray-800">{data?.length}+</h1>
                    <p className="text-lg text-rose-400 mt-2">Couple Paired</p>
                </div>
                <div className="bg-white p-6 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                    <FaUsers className="text-rose-500 text-3xl mb-2" />
                    <h1 className="text-4xl font-bold text-gray-800">{stats.biodata}+</h1>
                    <p className="text-lg text-rose-400 mt-2">Registered Biodatas</p>
                </div>
                <div className="bg-white p-6 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                    <IoManSharp className="text-rose-500 text-3xl mb-2" />
                    <h1 className="text-4xl font-bold text-gray-800">{stats.maleData}+</h1>
                    <p className="text-lg text-rose-400 mt-2">Male Biodatas</p>
                </div>
                <div className="bg-white p-6 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                    <IoMdWoman className="text-rose-500 text-3xl mb-2" />
                    <h1 className="text-4xl font-bold text-gray-800">{stats.femaleData}+</h1>
                    <p className="text-lg text-rose-400 mt-2">Female Biodatas</p>
                </div>
                <div className="bg-white p-6 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                    <ImUserCheck className="text-rose-500 text-3xl mb-2" />
                    <h1 className="text-4xl font-bold text-gray-800">{stats.premiumData}+</h1>
                    <p className="text-lg text-rose-400 mt-2">Premium Biodatas</p>
                </div>
            </div>

            {/* Mobile View */}
            <div className="mt-10 lg:hidden">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                        <FaRegHeart className="text-rose-500 text-3xl mb-2" />
                        <h1 className="text-3xl font-bold text-gray-800">{10}+</h1>
                        <p className="text-lg text-rose-400 mt-2">Couple Paired</p>
                    </div>
                    <div className="bg-white p-4 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                        <FaUsers className="text-rose-500 text-3xl mb-2" />
                        <h1 className="text-3xl font-bold text-gray-800">{stats.biodata}+</h1>
                        <p className="text-lg text-rose-400 mt-2">Registered Biodatas</p>
                    </div>
                    <div className="bg-white p-4 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                        <IoManSharp className="text-rose-500 text-3xl mb-2" />
                        <h1 className="text-3xl font-bold text-gray-800">{stats.maleData}+</h1>
                        <p className="text-lg text-rose-400 mt-2">Male Biodatas</p>
                    </div>
                    <div className="bg-white p-4 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                        <IoMdWoman className="text-rose-500 text-3xl mb-2" />
                        <h1 className="text-3xl font-bold text-gray-800">{stats.femaleData}+</h1>
                        <p className="text-lg text-rose-400 mt-2">Female Biodatas</p>
                    </div>
                    <div className="bg-white p-4 border rounded-lg shadow-lg text-center hover:bg-gray-100 transition-colors duration-300">
                        <ImUserCheck className="text-rose-500 text-3xl mb-2" />
                        <h1 className="text-3xl font-bold text-gray-800">{stats.premiumData}+</h1>
                        <p className="text-lg text-rose-400 mt-2">Premium Biodatas</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProggessCXounter;
