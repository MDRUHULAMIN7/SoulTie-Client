import { MdAccessTime, MdSupportAgent } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Heading from "../../Pages/Dashboard/Sidebar/Heading";

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields",
        confirmButtonColor: "#fb7185",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon.",
      confirmButtonColor: "#fb7185",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="px-2 md:px-8 lg:px-16 py-5">
      <Heading
        heading={" Get in Touch"}
        subheading={`Have questions about finding your perfect match?  Reach out to us through any of the methods below.`}
      />

      <div className=" bg-white">
        <div className=" mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side */}
            <div>
              <div className="mb-8">
                <span className="inline-block bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Send Us a Message
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  We'd Love to Hear From You
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="custom-input"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="custom-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="custom-input"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="custom-input"
                      placeholder="Message subject"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="custom-input resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transform transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Side*/}
            <div className="space-y-8">
              <div>
                <span className="inline-block bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Why Contact Us?
                </span>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  We're Here to Help You Find Love
                </h3>
              </div>

              {/* Info Cards */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-xl border-2 border-rose-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-rose-500 p-3 rounded-full flex-shrink-0">
                      <MdAccessTime className="text-white text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        24/7 Support
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Our dedicated support team is available round the clock
                        to assist you with any questions or concerns about your
                        journey to finding love.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-xl border-2 border-rose-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-rose-500 p-3 rounded-full flex-shrink-0">
                      <MdSupportAgent className="text-white text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        Expert Guidance
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Get personalized advice from our matchmaking experts who
                        understand Bangladeshi culture and can help you find
                        your perfect match.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-xl border-2 border-rose-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-rose-500 p-3 rounded-full flex-shrink-0">
                      <BsHeartFill className="text-white text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        Privacy Assured
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Your information is completely secure with us. We
                        maintain strict confidentiality and never share your
                        details without permission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
