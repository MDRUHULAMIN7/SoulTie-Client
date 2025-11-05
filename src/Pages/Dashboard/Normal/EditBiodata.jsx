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

  // Check if user already has a biodata
  const { data: existingBiodata, isLoading: checkingBiodata } = useQuery({
    queryKey: ["user-biodata", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/biodatas/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const isBiodata = !!existingBiodata;

  const image_host_key = import.meta.env.VITE_IMAGE_API;
  const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Upload image if it's a new file
      let photoUrl = existingBiodata?.photo; // Use existing photo if available
      
      if (data.photo && data.photo[0]) {
        const imagefile = { image: data.photo[0] };
        const res = await axiosPublic.post(image_host_api, imagefile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        photoUrl = res.data.data.url;
      }

      const biodataInfo = {
        name: data.name,
        photo: photoUrl,
        biodataType: data.biodatatype,
        birthDate: new Date(data.birthdate),
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
      };

      const result = await axiosPublic.put("/biodatas", biodataInfo);

      if (result.data.success) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: isBiodata
            ? "Biodata Updated Successfully!"
            : "Biodata Created Successfully!",
          text: `Your biodata ID is: ${result.data.biodataId}`,
          showConfirmButton: false,
          timer: 2000,
          background: "#fdf2f8",
          iconColor: "#ec4899",
        });
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

  // Set default values for edit mode
  const setDefaultValues = () => {
    if (existingBiodata) {
      return {
        name: existingBiodata.name,
        biodatatype: existingBiodata.biodataType,
        birthdate: existingBiodata.birthDate?.slice(0, 10),
        hieght: existingBiodata.Height,
        wieght: existingBiodata.Weight,
        age: existingBiodata.Age,
        occupation: existingBiodata.Occupation,
        race: existingBiodata.Race,
        fathersname: existingBiodata.FatherName,
        mothersname: existingBiodata.MotherName,
        parmanentdivison: existingBiodata.ParmanentDivison,
        presentdivison: existingBiodata.PresentDivison,
        partenerage: existingBiodata.PartnerAge,
        partnerhieght: existingBiodata.PartnerHeight,
        partnerwieght: existingBiodata.PartnerWeight,
        phonenumber: existingBiodata.MobileNumber,
      };
    }
    return {};
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
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
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
            {...register(name, { required: !isBiodata })}
            className="w-full px-4 py-3 border-2 border-rose-100 rounded-xl bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
            {...rest}
          />
          {isBiodata && (
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to keep current photo
            </p>
          )}
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

  if (checkingBiodata) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Heading
            heading={isBiodata ? "Edit Your Biodata" : "Create Your Biodata"}
            subheading={
              isBiodata
                ? "Update your personal information"
                : "Complete your biodata to find your perfect match"
            }
          />
          
          {existingBiodata && (
            <div className="bg-rose-100 border border-rose-300 rounded-lg p-4 mt-4">
              <p className="text-rose-700 font-semibold">
                Biodata ID: <span className="text-rose-900">{existingBiodata.biodataId}</span>
              </p>
              <p className="text-sm text-rose-600 mt-1">
                Your existing biodata will be updated with the new information.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden">
          {/* Form Section */}
          <div className="p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" key={JSON.stringify(setDefaultValues())}>
              {/* Personal Information Section */}
              <Section title="Personal Information" icon={FaUser}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormInput
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    icon={FaUser}
                    defaultValue={setDefaultValues().name}
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
                    defaultValue={setDefaultValues().biodatatype}
                    options={
                      <>
                        <option disabled value="">
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
                    defaultValue={setDefaultValues().birthdate}
                  />

                  <FormInput
                    label="Height"
                    name="hieght"
                    type="select"
                    icon={FaRulerVertical}
                    defaultValue={setDefaultValues().hieght}
                    options={
                      <>
                        <option disabled value="">
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
                    defaultValue={setDefaultValues().wieght}
                    options={
                      <>
                        <option disabled value="">
                          Select Weight
                        </option>
                        <option value="50">50 kg</option>
                        <option value="55">55 kg</option>
                        <option value="60">60 kg</option>
                        <option value="65">65 kg</option>
                        <option value="70">70 kg</option>
                        <option value="75">75 kg</option>
                        <option value="80">80 kg</option>
                        <option value="85">85 kg</option>
                      </>
                    }
                  />

                  <FormInput
                    label="Age"
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    icon={FaCalendarAlt}
                    defaultValue={setDefaultValues().age}
                  />

                  <FormInput
                    label="Occupation"
                    name="occupation"
                    type="select"
                    icon={FaBriefcase}
                    defaultValue={setDefaultValues().occupation}
                    options={
                      <>
                        <option disabled value="">
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
                    defaultValue={setDefaultValues().race}
                    options={
                      <>
                        <option disabled value="">
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

              {/* Family Information Section */}
              <Section title="Family Information" icon={FaUserFriends}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Father's Name"
                    name="fathersname"
                    placeholder="Enter father's name"
                    icon={FaUserFriends}
                    defaultValue={setDefaultValues().fathersname}
                  />

                  <FormInput
                    label="Mother's Name"
                    name="mothersname"
                    placeholder="Enter mother's name"
                    icon={FaUserFriends}
                    defaultValue={setDefaultValues().mothersname}
                  />
                </div>
              </Section>

              {/* Location Information Section */}
              <Section title="Location Information" icon={FaMapMarkerAlt}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Permanent Division"
                    name="parmanentdivison"
                    type="select"
                    icon={FaMapMarkerAlt}
                    defaultValue={setDefaultValues().parmanentdivison}
                    options={
                      <>
                        <option disabled value="">
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
                    defaultValue={setDefaultValues().presentdivison}
                    options={
                      <>
                        <option disabled value="">
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

              {/* Partner Expectations Section */}
              <Section title="Partner Expectations" icon={FaHeart}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput
                    label="Expected Partner Age"
                    name="partenerage"
                    type="number"
                    placeholder="Expected age"
                    icon={FaCalendarAlt}
                    defaultValue={setDefaultValues().partenerage}
                  />

                  <FormInput
                    label="Expected Partner Height"
                    name="partnerhieght"
                    type="select"
                    icon={FaRulerVertical}
                    defaultValue={setDefaultValues().partnerhieght}
                    options={
                      <>
                        <option disabled value="">
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
                    defaultValue={setDefaultValues().partnerwieght}
                    options={
                      <>
                        <option disabled value="">
                          Select Weight
                        </option>
                        <option value="50">50 kg</option>
                        <option value="55">55 kg</option>
                        <option value="60">60 kg</option>
                        <option value="65">65 kg</option>
                        <option value="70">70 kg</option>
                        <option value="75">75 kg</option>
                        <option value="80">80 kg</option>
                        <option value="85">85 kg</option>
                      </>
                    }
                  />
                </div>
              </Section>

              {/* Contact Information Section */}
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
                    defaultValue={setDefaultValues().phonenumber}
                  />
                </div>
              </Section>

              {/* Submit Button */}
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
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
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