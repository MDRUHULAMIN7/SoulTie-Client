import { FaRegHeart, FaUsers, FaShieldAlt, FaAward } from "react-icons/fa";
import Heading from "../Dashboard/Sidebar/Heading";
import { MdEmail, MdVerifiedUser, MdSecurity } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import { useEffect } from "react";

const About = () => {
     const scrollToTop = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
      useEffect(() => {
        scrollToTop();
      }, []);
    return (
        <div className=" px-2 md:px-8 lg:px-16 pb-4">
            < Heading heading={" About SoulTie"} subheading={"Connecting Hearts, Creating Futures in Bangladesh"} />

        <section className="space-y-12">

            {/* Features Section */}
            <div className=" ">
                <div className=" mx-auto">
                    <div className="text-center mb-12">
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Why Choose SoulTie?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className="group bg-gradient-to-br from-rose-50 to-white border-2 border-rose-200 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                            <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                                <FaRegHeart className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Personalized Matches</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Our advanced algorithms ensure you connect with individuals who truly align with your values and relationship goals.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-gradient-to-br from-rose-50 to-white border-2 border-rose-200 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                            <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                                <MdSecurity className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Secure & Confidential</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                We prioritize your privacy and security with advanced protection for your personal information.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-gradient-to-br from-rose-50 to-white border-2 border-rose-200 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                            <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                                <MdVerifiedUser className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Verified Profiles</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Every profile is carefully verified to ensure authenticity and genuine connections.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group bg-gradient-to-br from-rose-50 to-white border-2 border-rose-200 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                            <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                                <HiSparkles className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Smart Matching</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Intelligent system considers age, height, weight, and preferences for perfect matches.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="">
                <div className=" mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                           Our Team  Dedicated to Your Success
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     
                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200 transform transition-all hover:scale-105">
                            <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <FaUsers className="text-white text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">Expert Team</h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-center">
                                Passionate experts in technology and matchmaking dedicated to your success.
                            </p>
                        </div>

                       
                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200 transform transition-all hover:scale-105">
                            <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <MdEmail className="text-white text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">24/7 Support</h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-center">
                                Our support team is always ready to help with any questions or concerns.
                            </p>
                        </div>

                      
                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200 transform transition-all hover:scale-105">
                            <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <FaShieldAlt className="text-white text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">Privacy First</h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-center">
                                Your data is protected with industry-leading security measures.
                            </p>
                        </div>

                  
                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200 transform transition-all hover:scale-105">
                            <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <FaAward className="text-white text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">Trusted Service</h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-center">
                                Award-winning platform trusted by thousands across Bangladesh.
                            </p>
                        </div>
                    </div>


                </div>
            </div>

        
        </section>
      
        </div>
    );
};

export default About;