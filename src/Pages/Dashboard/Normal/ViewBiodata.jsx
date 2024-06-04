import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const ViewBiodata = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const { data: mydata = [], refetch } = useQuery({
    queryKey: ["mydata"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/view-biodatas/${user?.email}`);
      return res.data;
    },
  });
  refetch()
  console.log(mydata);

  const handlePremium = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to make your biodata premium",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rose",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Request!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updaterole = { updaterole: "requested" };

        const res = await axiosPublic.patch(`/biodataupdate/${id}`, updaterole);
        console.log(res);
        console.log(id);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Requested Successfully",
            text: "Wait for Admin Approved",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Requested Failed",
            text: "Something wrong!",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div className="bg-rose-100 p-6 rounded-md">
      <div>
        {/* first */}
        <div className="md:flex  border-b-2 border-y-black pb-4  items-center ">
          <div className="row-span-3  md:w-1/3">
            <img
              className=" rounded-full mx-auto w-24 lg:w-44 h-24  lg:h-44"
              src={mydata.photo}
              alt=""
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              Name : {mydata?.name}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              Biodata Type : {mydata?.biodataType}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              BirthDate : {mydata?.birthDate?.slice(0, 10)}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              Occupation : {mydata?.Occupation}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              Height : {mydata?.Height}
            </div>
            <div className="text-lg w-full bg-white rounded-md text-black p-2">
              Age : {mydata?.Age}
            </div>
          </div>
        </div>

        {/*  */}

        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-5 lg:gap-10 pt-16">
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            ParmanentDivison : {mydata?.ParmanentDivison}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            Weight : {mydata?.Weight}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            PresentDivison : {mydata?.PresentDivison}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            Race : {mydata?.Race}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            FatherName : {mydata?.FatherName}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            MotherName : {mydata?.MotherName}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            ExceptedPartnerWeight : {mydata?.PartnerWeight}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            ExceptedParnerHeight : {mydata?.PartnerHeight}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            ExceptedPartnerAge : {mydata?.PartnerAge}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            ContactEmail : {mydata?.ContactEmail}
          </div>
          <div className="text-lg w-full bg-white rounded-md text-black p-2">
            MobileNumber : {mydata?.MobileNumber}
          </div>
          <div className="text-lg w-full  rounded-md text-black ">
            { mydata?.role === 'normal'? <button
              onClick={() => handlePremium(mydata?._id)}
              className="bg-rose-200 p-2 w-full hover:bg-rose-300 rounded-md"
            >
             
              Make biodata to premium
            </button>  :  <button
              disabled
              className="bg-rose-200 p-2 w-full  rounded-md"
            >
             {mydata?.role}
            </button>  }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBiodata;
