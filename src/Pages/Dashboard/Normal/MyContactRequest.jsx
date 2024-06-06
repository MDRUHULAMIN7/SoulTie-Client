import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Heading from "../Sidebar/Heading";


const MyContactRequest = () => {

    const {user}=UseAuth();
    const axiosPublic = UseAxiosPublic();

    const {data:onedata}=useQuery({
        queryKey:['onedata'],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res = await axiosPublic.get(`/payment/${user?.email}`)
            return res.data
        }
    })

    const mydata=onedata?.filter((datas)=>datas.status !== "pending")
    // const biodataId=mydata?.biodataId;

    console.log(mydata);
  

    const handledelete=(id)=>{
        console.log(id);
    }
    return (
        <div>
      <Heading
        heading={"My Contact Request"}
        subheading={"approved contact request  data ...."}
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
              <th>MobileNumber</th>
              <th>BiodataId</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mydata?.map((data) => (
              <tr key={data._id} className="bg-rose-50 mt-2">
                <th>{data?.biodtaName}</th>
                <td>{data?.biodataEmail}</td>
                <td>{data?.biodataMobile}</td>
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
                 
                 
                    <button
                      onClick={() => handledelete(data?._id)}
                      className="bg-green-500 p-2 w-fit  px-3 py-2 txt-lg rounded-xl"
                    >
                     Delete
                    </button>
                 
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

export default MyContactRequest;