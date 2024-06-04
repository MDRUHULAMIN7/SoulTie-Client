import { useQuery } from "@tanstack/react-query";
// import {  useState } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";

const ManageUsers = () => {
  // const[allusers,setusers]=useState([])
  const axiosPublic = UseAxiosPublic();
  const { user, loading } = UseAuth();

  const { data: users } = useQuery({
    queryKey: ["roll", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/manageusers`);

      return res.data;
    },
  });

  const handleRole = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to make this user Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rose",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updaterole = { updaterole: "admin" };

        const res = await axiosPublic.patch(`/userupdate/${id}`, updaterole);
        console.log(res);
        console.log(id);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: " Successfull",
            text: "The user is also admin now",
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
  const handlePremium = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to make this user Premium",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rose",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updaterole = { updaterole: "premium" };

        const res = await axiosPublic.patch(`/userupdatepremium/${id}`, updaterole);
        console.log(res);
        console.log(id);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: " Successfull",
            text: "The user is Premium Now",
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
  // setusers(users)
  console.log(users);
  return (
    <div>
      <Heading
        heading={"Manage Users"}
        subheading={"update and premium users"}
      ></Heading>

      <div className="container p-2 mx-auto sm:p-4  text-black">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xl">
            <thead className="bg-rose-100">
              <tr className="text-left">
                <th className="p-3">UserName</th>
                <th className="p-3">UserEmail</th>
                <th className="p-3">MakeAdmin</th>

                <th className="p-3">MakePremium</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b text-lg border-opacity-20 border-gray-700"
                >
                  <td className="p-3">
                    <p>{user?.name}</p>
                  </td>
                  <td className="p-3">
                    <p>{user?.email}</p>
                  </td>

                  <td className="p-3 ">
                    {user?.roll === "admin" ? (
                      <button disabled className="px-3 py-1 font-semibold rounded-md bg-rose-300 ">
                        Already Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRole(user?._id)}
                        className="px-3 py-1 font-semibold rounded-md bg-rose-400 "
                      >
                        MakeAdmin
                      </button>
                    )}
                  </td>
                  <td className="p-3 ">
                    {user?.role === "premium" ? (
                      <button
                      disabled
                        className="px-3 py-1 font-semibold rounded-md bg-rose-300 "
                      >
                        Premium User
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePremium(user?._id)}
                        className="px-3 py-1 font-semibold rounded-md bg-rose-400 "
                      >
                        MakePremium
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
