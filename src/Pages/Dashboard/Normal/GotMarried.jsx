import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";

import img from "../../../images/got ma.png";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";
const GotMarried = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  const { data: mydata = [], refetch } = useQuery({
    queryKey: ["mydata"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/view-biodatas/${user?.email}`);
      return res.data;
    },
  });
  const image_host_key = import.meta.env.VITE_IMAGE_API;
  const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

  const handleForm = async (e) => {
    e.preventDefault();
    const image = e.target.photo.files[0];
    console.log(image);

    const imageFiles = new FormData();
    imageFiles.append("image", image);

    const res = await axiosPublic.post(image_host_api, imageFiles, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const yourBipodata = e.target.yourbiodataid.value;
    const partnerBiodata = e.target.partnerbiodataid.value;
    const rating = e.target.rating.value;
    const photo = res.data.data.url;
    const story = e.target.text.value;
    console.log(story.length);

    const marrigeData = {
      SelfBiodata: yourBipodata,
      PartnerBiodata: partnerBiodata,
      Coupleimage: photo,
      shortStory: story,
      Ratings:parseInt( rating),
      status: "married",
    };
    console.log(marrigeData);

    const res2 = await axiosPublic.post("/success", marrigeData);



    refetch();
    if (res2.data.insertedId) {
      refetch();
      Swal.fire({
        position: "top-centre",
        icon: "success",
        title: "Thank you for adding success story",
        showConfirmButton: false,
        timer: 2500,
      });
     
    }


  };

  return (
    <div>
      <Heading
        subheading={"please sahre success story with us"}
        heading={"Add your story"}
      ></Heading>
      <div className=" bg-rose-50 p-6 lg:flex rounded-xl gap-4">
        <div className="w-1/2 hidden lg:block ">
          <img className="w-fit  p-2" src={img} alt="" />
        </div>

        <form
          className="flex-col justify-center items-center lg:w-1/2     gap-2 text-lg"
          onSubmit={handleForm}
          action="
                "
        >
          <div>
            <div className=" text-sm">
              <label htmlFor="username" className="block text-black text-lg">
                Your BiodataId
              </label>

              <div className="flex bg-white w-full mt-1 rounded-lg ">
                <input
                  type="number"
                  readOnly
                  value={mydata.biodataId}
                  placeholder="Your BiodataId"
                  required
                  name="yourbiodataid"
                  id="files"
                  className="px-8 py-1 dark:text-black text-lg dark:bg-white"
                />
              </div>
            </div>
            <div className=" text-sm">
              <label htmlFor="username" className="block text-black text-lg">
                Your Partner BiodataId
              </label>

              <div className="flex bg-white w-full mt-1 rounded-lg ">
                <input
                  type="number"
                  placeholder="Your Partner BiodataId"
                  required
                  name="partnerbiodataid"
                  id="files"
                  className="px-8 py-1 dark:text-black text-lg dark:bg-white"
                />
              </div>
            </div>
            {/*  */}
            <div className="flex-col  col-span-1">
 <span>Give Rating </span> <br />
 <select defaultValue={'default'} name="rating" className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option disabled value={"default"} selected>Rating</option>
<option value={"1"}>1</option>
<option value={"2"}>2</option>
<option value={"3"}>3</option>
<option value={"4"}>4</option>
<option value={"5"}>5</option>
</select>

</div>
            {/*  */}
            {/* <div className=" text-sm">
              <label htmlFor="username" className="block text-black text-lg">
                Give Rating Out of 10
              </label>

              <div className="flex bg-white w-full mt-1 rounded-lg ">
                <input
                  type="number"
                  placeholder="give ratings out of 10"
                  required
                  name="ratings"
                  className="px-8 py-1 dark:text-black text-lg dark:bg-white"
                />
              </div>
            </div> */}

            <div className=" text-sm">
              <label htmlFor="username" className="block text-black text-lg">
                Photo
              </label>

              <div className="flex bg-white w-full mt-1 rounded-lg ">
                <input
                  type="file"
                  required
                  name="photo"
                  id="files"
                  className="px-8 py-1 dark:text-black text-lg dark:bg-white"
                />
              </div>
            </div>
            <div className=" text-sm">
              <label htmlFor="username" className="block text-black text-lg">
                Share your fellings
              </label>

              <div className="flex bg-white w-full mt-1 rounded-lg col-span-3">
                <textarea
                  name="text"
                  id=""
                  className="w-full col-span-3"
                  required
                  placeholder="Write a short story"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              value={"add story"}
              className="w-full mt-3 bg-rose-400 text-white text-xl py-2 rounded-md"
            >
              Add To Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GotMarried;
