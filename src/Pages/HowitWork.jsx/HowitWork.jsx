
import img1 from "../../images/download.png"
import img2 from "../../images/images__1_-removebg-preview.png"
import img3 from "../../images/images-removebg-preview.png"
import img4 from "../../images/got.png"
import Heading from "../Dashboard/Sidebar/Heading";
const HowitWork = () => {
    return (
        <div className="w-full mx-auto lg:p-6 md:p-4 rounded-lg ">  

              <Heading heading={'How It Works'} subheading={'our working procces is preplaned and very successfull '}></Heading>
            <div className="md:flex gap-3 space-y-3  mb-3 justify-center items-center ">

                {/* first */}
                <div className="md:w-3/5 mx-auto md:h-64 p-4 md:p-8 bg-rose-50 border-2 rounded-xl border-rose-200  flex justify-center items-center">
                <div>
                    <h1 className="bg-rose-100 p-2 text-black text-xl rounded-full h-12 w-12 text-center">1</h1>
                <h1 className="md:text-3xl text-2xl font-semibold">Create Your Biodata </h1>
                <p className="md:text-lg text-md ">create your own biodata with your authentic data about yourself and be honest</p>
                </div>
                <div>
                    <img className="md:h-52" src={img1} alt="" />
                </div>
                </div>
                {/* second */}
                <div className="md:w-2/5 mx-auto md:h-64 p-4 md:p-8 bg-rose-100  rounded-xl  flex justify-center items-center">
                <div>
                    <h1 className="bg-rose-200 p-2 text-blacktext-xl rounded-full h-12 w-12 text-center">2</h1>
                <h1 className="md:text-2xl lg:text-3xl text-2xl font-semibold">Find Your Partner </h1>
                <p className="md:text-md text-md ">Find your life partner with SoulTie . we suggest you in your choise depend</p>
                </div>
                <div>
                    <img className="md:h-52" src={img2} alt="" />
                </div>
                </div>
        
            </div>
            <div className="md:flex gap-3  justify-center items-center">
        {/* third */}
        <div className="md:w-2/5 mx-auto md:h-64 p-4 md:p-8 bg-rose-100  rounded-xl   flex justify-center items-center">
                <div>
                    <h1 className="bg-rose-200 p-2 text-black text-xl rounded-full h-12 w-12 text-center">3</h1>
                <h1 className="md:text-3xl text-2xl font-semibold">Contact with Partner </h1>
                <p className="md:text-lg text-md ">After find your likes your heart you can contact with him or her by SoulTie after payments and also meet</p>
                </div>
                <div>
                    <img className="md:h-52" src={img3} alt="" />
                </div>
                </div>
                {/* four */}
                <div className="md:w-3/5 mx-auto md:h-64 p-4 md:p-8 mt-3 md:mt-0 bg-rose-50 border-2 rounded-xl border-rose-200  flex justify-center items-center">
                <div>
                    <h1 className="bg-rose-100 p-2 text-black text-xl rounded-full h-12 w-12 text-center">4</h1>
                <h1 className="md:text-3xl text-2xl font-semibold">Engagement </h1>
                <p className="md:text-lg text-md ">After contact each other when when they likes each other they are become our success couple and for other inspirations</p>
                </div>
                <div>
                    <img className="md:h-52" src={img4} alt="" />
                </div>
                </div>
            </div>
        </div>
    );
};

export default HowitWork;