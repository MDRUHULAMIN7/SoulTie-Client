
import { FaRegHeart, FaUsers } from "react-icons/fa";
import Heading from "../Dashboard/Sidebar/Heading";
import { IoMdWoman } from "react-icons/io";
import { IoManSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";





const About = () => {
    return (
        <div className="py-12 px-6 ">
            <Heading heading={"About SoulTie"} subheading={"Connecting Hearts, Creating Futures"} />

            <div className="mt-10 max-w-5xl mx-auto text-gray-800">
                <h2 className="text-4xl font-bold text-center text-white mb-8">Our Mission</h2>
                <p className="text-xl text-center text-gray-900 mb-8 px-4">
                    At SoulTie, we are dedicated to helping individuals find their perfect match and build meaningful relationships. Our mission is to provide a safe, trustworthy, and personalized platform where you can connect with like-minded individuals and start your journey towards a happy and fulfilling relationship.
                </p>

                <h2 className="text-4xl font-bold text-center text-white mb-8">What We Offer</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl transform transition-transform hover:scale-105">
                        <FaRegHeart className="text-pink-600 text-5xl mb-4 mx-auto" />
                        <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">Personalized Matches</h3>
                        <p className="text-gray-700 text-center">
                            Our advanced algorithms and personalized matchmaking services ensure that you connect with individuals who truly align with your values, interests, and relationship goals.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-xl transform transition-transform hover:scale-105">
                        <div className="flex justify-center mb-4">
                            <IoMdWoman className="text-pink-600 text-5xl mx-2" />
                            <IoManSharp className="text-pink-600 text-5xl mx-2" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">Secure and Confidential</h3>
                        <p className="text-gray-700 text-center">
                            We prioritize your privacy and security. Our platform is designed to protect your personal information and provide a safe environment for you to explore potential matches.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-xl transform transition-transform hover:scale-105">
                        <FaUsers className="text-pink-600 text-5xl mb-4 mx-auto" />
                        <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">Diverse Community</h3>
                        <p className="text-gray-700 text-center">
                            SoulTie brings together a diverse community of singles looking for genuine connections. Whether you are seeking a life partner or a meaningful relationship, you will find a wide range of profiles to explore.
                        </p>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-4xl font-bold text-center text-white mb-8">Meet the Team</h2>
                    <div className="flex flex-col lg:flex-row gap-8 px-4">
                        <div className="bg-white p-8 rounded-lg shadow-xl flex items-center transform transition-transform hover:scale-105">
                            <FaUsers className="text-pink-600 text-5xl mr-4" />
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Our Team</h3>
                                <p className="text-gray-700">
                                    Our dedicated team at SoulTie is passionate about fostering meaningful connections. With a mix of expertise in technology, matchmaking, and customer support, we work tirelessly to enhance your experience and ensure you find the right match.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-xl flex items-center transform transition-transform hover:scale-105">
                            <MdEmail className="text-pink-600 text-5xl mr-4" />
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Contact Us</h3>
                                <p className="text-gray-700">
                                    If you have any questions or need assistance, please reach out to us. Our support team is here to help you with any inquiries or concerns you may have. You can contact us via email or through our platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

