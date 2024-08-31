import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";


const Contact = () => {
    return (
        <div className="py-16 px-6 ">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Get in Touch</h1>
                <p className="text-lg text-gray-600 mb-12">
                    We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us through any of the methods below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <FaPhoneAlt className="text-4xl text-teal-600 mb-4 mx-auto" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Phone</h2>
                        <p className="text-gray-700">+1 (123) 456-7890</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <FaEnvelope className="text-4xl text-teal-600 mb-4 mx-auto" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Email</h2>
                        <p className="text-gray-700">contact@soultie.com</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <FaMapMarkerAlt className="text-4xl text-teal-600 mb-4 mx-auto" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Address</h2>
                        <p className="text-gray-700">1234 SoulTie Lane, Love City, LC 12345</p>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Form</h2>
                    <form className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                                    placeholder="Your Email"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
