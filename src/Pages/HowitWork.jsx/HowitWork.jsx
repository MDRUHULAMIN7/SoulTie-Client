import { useState } from "react";
import {
  FiUser,
  FiSearch,
  FiMessageCircle,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";
import img1 from "../../images/download.png";
import img2 from "../../images/images__1_-removebg-preview.png";
import img3 from "../../images/images-removebg-preview.png";
import img4 from "../../images/got.png";
import Heading from "../Dashboard/Sidebar/Heading";

const HowitWork = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      number: 1,
      icon: FiUser,
      title: "Create Your Biodata",
      description:
        "Create your authentic biodata with detailed information. Be honest and transparent to find the perfect match.",
      image: img1,
      gradient: "from-rose-50 to-pink-50",
      numberGradient: "from-rose-400 to-rose-500",
      borderColor: "border-rose-200",
    },
    {
      number: 2,
      icon: FiSearch,
      title: "Find Your Partner",
      description:
        "Discover compatible matches with our intelligent matching system based on your preferences and values.",
      image: img2,
      gradient: "from-pink-50 to-rose-50",
      numberGradient: "from-pink-400 to-rose-500",
      borderColor: "border-pink-200",
    },
    {
      number: 3,
      icon: FiMessageCircle,
      title: "Connect & Communicate",
      description:
        "Initiate contact through our secure platform. Get to know each other before meeting in person.",
      image: img3,
      gradient: "from-rose-50 to-pink-50",
      numberGradient: "from-rose-400 to-rose-500",
      borderColor: "border-rose-200",
    },
    {
      number: 4,
      icon: FiHeart,
      title: "Start Your Journey",
      description:
        "Begin your beautiful journey together. Join our success stories and inspire others to find love.",
      image: img4,
      gradient: "from-pink-50 to-rose-50",
      numberGradient: "from-pink-400 to-rose-500",
      borderColor: "border-pink-200",
    },
  ];

  return (
    <div className="mx-auto px-2 md:px-8 lg:px-16 mt-4 ">
      {/* Heading */}
      <div className="text-center mb-16">
        <Heading
          heading={"How It Works"}
          subheading={
            "Your journey to finding the perfect life partner in four simple steps"
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`relative group cursor-pointer transition-all duration-500 ${
              activeStep === index ? "transform scale-102" : "hover:scale-100"
            }`}
            onMouseEnter={() => setActiveStep(index)}
            onMouseLeave={() => setActiveStep(null)}
          >
            {/* Main Card */}
            <div
              className={`
              relative bg-white rounded-3xl p-8 h-full
              border-2 ${step.borderColor}
              shadow-lg hover:shadow-2xl
              transition-all duration-500
              overflow-hidden
              ${activeStep === index ? "ring-2 ring-rose-300" : ""}
            `}
            >
              {/* Background Gradient Overlay */}
              <div
                className={`
                absolute inset-0 bg-gradient-to-br ${step.gradient} 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-500
              `}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
                {/* Left Side - Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`
                      relative w-14 h-14 rounded-full 
                      bg-gradient-to-br ${step.numberGradient}
                      flex items-center justify-center
                      shadow-lg group-hover:shadow-xl
                      transition-all duration-300
                      transform group-hover:scale-110
                    `}
                    >
                      <span className="text-white font-bold text-lg">
                        {step.number}
                      </span>

                      {/* Success Checkmark */}
                      <FiCheckCircle className="absolute -top-1 -right-1 w-6 h-6 text-white bg-green-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors">
                    {step.description}
                  </p>
                </div>

                {/* Right Side - Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className={`
                        w-48 h-48 object-contain
                        transition-all duration-500
                        ${
                          activeStep === index
                            ? "transform scale-110 rotate-2"
                            : "group-hover:scale-105 group-hover:rotate-1"
                        }
                        filter drop-shadow-lg
                      `}
                      src={step.image}
                      alt={`Step ${step.number}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowitWork;
