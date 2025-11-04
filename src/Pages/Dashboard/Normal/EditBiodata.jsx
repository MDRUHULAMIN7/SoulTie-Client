import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Heading from "../Sidebar/Heading";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCamera,
  FaVenusMars,
  FaBirthdayCake,
  FaRulerVertical,
  FaWeight,
  FaCalendarAlt,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaMapMarkerAlt,
  FaHeart,
  FaEnvelope,
  FaMobileAlt,
  FaEdit,
  FaPlus,
} from "react-icons/fa";

const EditBiodata = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = UseAxiosPublic();

  const { data: iddata = [], refetch } = useQuery({
    queryKey: ["iddata"],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodatas");
      return res.data;
    },
  });

  const idbio = iddata[0]?.length;
  const news = iddata[0];
  const isBiodata = news?.find((fdata) => fdata.ContactEmail == user?.email);

  const image_host_key = import.meta.env.VITE_IMAGE_API;
  const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const imagefile = { image: data.photo[0] };
      const res = await axiosPublic.post(image_host_api, imagefile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const biodataInfo = {
        name: data.name,
        photo: res.data.data.url,
        biodataType: data.biodatatype,
        birthDate: new Date(data.birthdate),
        role: "normal",
        Height: data.hieght,
        Weight: data.wieght,
        Age: data.age,
        Occupation: data.occupation,
        Race: data.race,
        FatherName: data.fathersname,
        MotherName: data.mothersname,
        ParmanentDivison: data.parmanentdivison,
        PresentDivison: data.presentdivison,
        PartnerAge: data.partenerage,
        ParnerHeight: data.partnerhieght,
        PartnerWeight: data.partnerwieght,
        ContactEmail: data.contactemail,
        MobileNumber: data.phonenumber,
        biodataId: idbio + 1,
      };

      const result = await axiosPublic.put("/biodatas", biodataInfo);

      if (result.data.modifiedCount > 0 || result.data.upsertedCount > 0) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: isBiodata
            ? "Biodata Updated Successfully!"
            : "Biodata Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
          background: "#fdf2f8",
          iconColor: "#ec4899",
        });
        refetch();
        navigate("/dashboard/viewbiodata");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#ec4899",
        background: "#fdf2f8",
      });
    } finally {
      setLoading(false);
    }
  };

  // Form Input Component
  const FormInput = ({
    label,
    name,
    type = "text",
    placeholder,
    required = true,
    icon: Icon,
    options,
    ...rest
  }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 ">
        {Icon && <Icon className="text-rose-500" size={16} />}
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      {type === "select" ? (
        <select
          {...register(name, { required })}
          className="w-full px-4 py-3 border-2 border-rose-100 rounded-xl bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
          {...rest}
        >
          {options}
        </select>
      ) : type === "file" ? (
        <div className="relative">
          <input
            type="file"
            {...register(name, { required })}
            className="custom-input"
            {...rest}
          />
        </div>
      ) : (
        <input
          type={type}
          {...register(name, { required })}
          placeholder={placeholder}
          className="w-full px-4 py-3 border-2 border-rose-100 rounded-xl bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
          {...rest}
        />
      )}

      {errors[name] && (
        <span className="text-rose-500 text-sm flex items-center gap-1">
          {label} is required
        </span>
      )}
    </div>
  );

  return (
    <div className="">
      <div className="mb-8">
        <Heading
          heading={isBiodata ? "Edit Your Biodata" : "Create Your Biodata"}
          subheading={
            isBiodata
              ? "Update your personal information"
              : "Complete your biodata to find your perfect match"
          }
        />
      </div>

      <div className=" overflow-hidden bg-rose-50 shadow-xl rounded-xl p-2 md:p-4 lg:p-6">
        {/* Form Section */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Section title="Personal Information" icon={FaUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormInput
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                icon={FaUser}
              />

              <FormInput
                label="Profile Photo"
                name="photo"
                type="file"
                icon={FaCamera}
              />

              <FormInput
                label="Biodata Type"
                name="biodatatype"
                type="select"
                icon={FaVenusMars}
                options={
                  <>
                    <option disabled value="default">
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </>
                }
              />

              <FormInput
                label="Date of Birth"
                name="birthdate"
                type="date"
                icon={FaBirthdayCake}
              />

              <FormInput
                label="Height"
                name="hieght"
                type="select"
                icon={FaRulerVertical}
                options={
                  <>
                    <option disabled value="default">
                      Select Height
                    </option>
                    <option value="4">4 feet</option>
                    <option value="5">5 feet</option>
                    <option value="6">6 feet</option>
                    <option value="7">7 feet</option>
                  </>
                }
              />

              <FormInput
                label="Weight"
                name="wieght"
                type="select"
                icon={FaWeight}
                options={
                  <>
                    <option disabled value="default">
                      Select Weight
                    </option>
                    <option value="50">50 kg</option>
                    <option value="55">55 kg</option>
                    <option value="60">60 kg</option>
                    <option value="65">65 kg</option>
                    <option value="70">70 kg</option>
                    <option value="75">75 kg</option>
                  </>
                }
              />

              <FormInput
                label="Age"
                name="age"
                type="number"
                placeholder="Enter your age"
                icon={FaCalendarAlt}
              />

              <FormInput
                label="Occupation"
                name="occupation"
                type="select"
                icon={FaBriefcase}
                options={
                  <>
                    <option disabled value="default">
                      Select Occupation
                    </option>
                    <option value="Doctor">Doctor</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="Business">Business</option>
                    <option value="Government Service">
                      Government Service
                    </option>
                    <option value="Private Service">Private Service</option>
                    <option value="Housewife">Housewife</option>
                    <option value="Other">Other</option>
                  </>
                }
              />

              <FormInput
                label="Race/Religion"
                name="race"
                type="select"
                icon={FaUsers}
                options={
                  <>
                    <option disabled value="default">
                      Select Race/Religion
                    </option>
                    <option value="Muslim">Muslim</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Christian">Christian</option>
                    <option value="Other">Other</option>
                  </>
                }
              />
            </div>
          </Section>

          <Section title="Family Information" icon={FaUserFriends}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Father's Name"
                name="fathersname"
                placeholder="Enter father's name"
                icon={FaUserFriends}
              />

              <FormInput
                label="Mother's Name"
                name="mothersname"
                placeholder="Enter mother's name"
                icon={FaUserFriends}
              />
            </div>
          </Section>

          <Section title="Location Information" icon={FaMapMarkerAlt}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Permanent Division"
                name="parmanentdivison"
                type="select"
                icon={FaMapMarkerAlt}
                options={
                  <>
                    <option disabled value="default">
                      Select Division
                    </option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </>
                }
              />

              <FormInput
                label="Present Division"
                name="presentdivison"
                type="select"
                icon={FaMapMarkerAlt}
                options={
                  <>
                    <option disabled value="default">
                      Select Division
                    </option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </>
                }
              />
            </div>
          </Section>

          <Section title="Partner Expectations" icon={FaHeart}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label="Expected Partner Age"
                name="partenerage"
                type="number"
                placeholder="Expected age"
                icon={FaCalendarAlt}
              />

              <FormInput
                label="Expected Partner Height"
                name="partnerhieght"
                type="select"
                icon={FaRulerVertical}
                options={
                  <>
                    <option disabled value="default">
                      Select Height
                    </option>
                    <option value="4">4 feet</option>
                    <option value="5">5 feet</option>
                    <option value="6">6 feet</option>
                    <option value="7">7 feet</option>
                  </>
                }
              />

              <FormInput
                label="Expected Partner Weight"
                name="partnerwieght"
                type="select"
                icon={FaWeight}
                options={
                  <>
                    <option disabled value="default">
                      Select Weight
                    </option>
                    <option value="50">50 kg</option>
                    <option value="55">55 kg</option>
                    <option value="60">60 kg</option>
                    <option value="65">65 kg</option>
                    <option value="70">70 kg</option>
                    <option value="75">75 kg</option>
                  </>
                }
              />
            </div>
          </Section>

          <Section title="Contact Information" icon={FaEnvelope}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Contact Email"
                name="contactemail"
                type="email"
                defaultValue={user?.email}
                readOnly
                icon={FaEnvelope}
              />

              <FormInput
                label="Mobile Number"
                name="phonenumber"
                type="text"
                placeholder="Enter mobile number"
                icon={FaMobileAlt}
              />
            </div>
          </Section>

          <div className="flex justify-center pt-6">
            <button
              disabled={loading}
              type="submit"
              className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-12 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  {isBiodata ? <FaEdit /> : <FaPlus />}
                  {isBiodata ? "Update Biodata" : "Create Biodata"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

//  Section Component
const Section = ({ title, icon: Icon, children }) => (
  <div className=" rounded-2xl p-6  ">
    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
      <div className="bg-rose-100 p-2 rounded-lg">
        <Icon className="text-rose-500" size={20} />
      </div>
      {title}
    </h3>
    {children}
  </div>
);

export default EditBiodata;
