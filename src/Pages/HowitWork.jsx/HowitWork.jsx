import img1 from "../../images/download.png";
import img2 from "../../images/images__1_-removebg-preview.png";
import img3 from "../../images/images-removebg-preview.png";
import img4 from "../../images/got.png";
import Heading from "../Dashboard/Sidebar/Heading";

const HowitWork = () => {
  return (
    <div className="w-full mx-auto  rounded-lg py-5 px-2 md:px-8 lg:px-16">
      {/* Heading */}
      <Heading
        heading={"How It Works"}
        subheading={"Our working process is preplanned and very successful."}
      />

      {/* Grid Layout for Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Step 1 */}
        <div className="relative md:w-auto mx-auto md:h-64 p-6 bg-gradient-to-br from-pink-50 to-rose-100 border-2 rounded-3xl border-rose-200 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex justify-center items-center gap-4">
          <div>
            <h1 className="bg-gradient-to-br from-rose-200 to-rose-400 text-white text-xl rounded-full h-12 w-12 flex items-center justify-center mb-4">
              1
            </h1>
            <h1 className="md:text-3xl text-2xl font-bold text-gray-700 mb-2">Create Your Biodata</h1>
            <p className="md:text-lg text-gray-600">
              Create your own biodata with authentic information about yourself and be honest.
            </p>
          </div>
          <div>
            <img className="md:h-52 transition-transform transform hover:scale-105" src={img1} alt="Step 1" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative md:w-auto mx-auto md:h-64 p-6 bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex justify-center items-center gap-4">
          <div>
            <h1 className="bg-gradient-to-br from-pink-300 to-rose-500 text-white text-xl rounded-full h-12 w-12 flex items-center justify-center mb-4">
              2
            </h1>
            <h1 className="md:text-3xl text-2xl font-bold text-gray-700 mb-2">Find Your Partner</h1>
            <p className="md:text-lg text-gray-600">
              Find your life partner with SoulTie. We suggest matches based on your preferences.
            </p>
          </div>
          <div>
            <img className="md:h-52 transition-transform transform hover:scale-105" src={img2} alt="Step 2" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative md:w-auto mx-auto md:h-64 p-6 bg-gradient-to-br from-pink-50 to-rose-100 rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex justify-center items-center gap-4">
          <div>
            <h1 className="bg-gradient-to-br from-rose-200 to-rose-400 text-white text-xl rounded-full h-12 w-12 flex items-center justify-center mb-4">
              3
            </h1>
            <h1 className="md:text-3xl text-2xl font-bold text-gray-700 mb-2">Contact with Partner</h1>
            <p className="md:text-lg text-gray-600">
              After finding a match, contact them through SoulTie after payment and arrange a meeting.
            </p>
          </div>
          <div>
            <img className="md:h-52 transition-transform transform hover:scale-105" src={img3} alt="Step 3" />
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative md:w-auto mx-auto md:h-64 p-6 bg-gradient-to-br from-rose-50 to-pink-100 border-2 rounded-3xl border-rose-200 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex justify-center items-center gap-4">
          <div>
            <h1 className="bg-gradient-to-br from-pink-300 to-rose-500 text-white text-xl rounded-full h-12 w-12 flex items-center justify-center mb-4">
              4
            </h1>
            <h1 className="md:text-3xl text-2xl font-bold text-gray-700 mb-2">Engagement</h1>
            <p className="md:text-lg text-gray-600">
              Once both parties agree, they become one of our successful couples, inspiring others.
            </p>
          </div>
          <div>
            <img className="md:h-52 transition-transform transform hover:scale-105" src={img4} alt="Step 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowitWork;
