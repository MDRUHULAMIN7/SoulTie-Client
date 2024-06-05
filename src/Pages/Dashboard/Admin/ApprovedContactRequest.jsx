import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
// import { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";

const ApprovedContactRequest = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();
  // const [payData,setData]=useState([])
  const { data:alldata=[], refetch } = useQuery({
    queryKey: ["data"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get("/payments");

      return res?.data;
    },
  });
  // setData(alldata)

  console.log(alldata?.length);

  const handleApprove = async (id) => {
    const update = {
      data: `aprovefor${id}`,
      biodataId: id,
    };
    console.log(update);
    const res = await axiosPublic.put("/payment/approve", update);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Request Approved Successfull",
        showConfirmButton: false,
        timer: 2500,
      });
      refetch()
    }
    else{
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "something wrong",
            showConfirmButton: false,
            timer: 2500,
          });
          refetch()
    }
    console.log(res.data);
  };

  return (
    <div>
      <Heading
        heading={"Approve Contact Request"}
        subheading={"approve requested contact data ...."}
      >
        {" "}
      </Heading>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-rose-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>BiodataId</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {alldata?.map((data) => (
              <tr key={data._id} className="bg-rose-50 mt-2">
                <th>{data?.name}</th>
                <td>{data?.email}</td>
                <td>{data?.biodataId}</td>
                <td className="">
                  {" "}
                  <p
                    className={
                      data?.status === "pending"
                        ? "bg-red-500 w-fit  px-3 py-2 txt-lg rounded-xl"
                        : "bg-green-500 p-2 w-fit  px-3 py-2 txt-lg rounded-xl"
                    }
                  >
                    {data?.status}
                  </p>{" "}
                </td>
                <td>
                  {" "}
                  {data?.status === "pending" ? (
                    <button
                      onClick={() => handleApprove(data?.biodataId)}
                      className="bg-green-500 p-2 w-fit  px-3 py-2 txt-lg rounded-xl"
                    >
                      Approve
                    </button>
                  ) : (
                    <p className="bg-red-500 p-2 w-fit  px-3 py-2 txt-lg rounded-xl">
                      Approved
                    </p>
                  )}
                </td>
                <hr />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedContactRequest;
