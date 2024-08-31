import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [photo, setPhoto] = useState("");
  const axiosPublic = UseAxiosPublic();
  const { createUser, updateuserprofile } = UseAuth();
  const navigate = useNavigate();
  const image_host_key = import.meta.env.VITE_IMAGE_API;
  const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

  const onSubmit = async (data) => {
    const imagefile = { image: data.photo[0] };

    try {
      const res = await axiosPublic.post(image_host_api, imagefile, {
        headers: { "content-type": "multipart/form-data" },
      });
      const { email, password, name } = data;
      const photoUrl = res.data.data.url;
      setPhoto(photoUrl);

      await createUser(email, password);
      await updateuserprofile(name, photoUrl);

      const userInfo = { name: data.name, email: data.email, roll: "normal", role: "normal" };
      const userRes = await axiosPublic.post("/users", userInfo);

      if (userRes.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "SignUp Successfully, Login Now",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex flex-col max-w-screen-sm p-8 mx-auto mt-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
        <p className="text-lg">Create your account to get started</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-lg">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            id="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors"
          />
          {errors.name && <span className="text-red-400">Name is required</span>}
        </div>

        <div className="space-y-1">
          <label htmlFor="photo" className="block text-lg">Profile Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            id="photo"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 file:bg-purple-600 file:text-white file:rounded-md file:px-4 file:py-2 transition-colors"
          />
          {photo && <p className="text-gray-700 mt-2">{photo.slice(0, 30)}</p>}
          {errors.photo && <span className="text-red-400">Photo is required</span>}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-lg">Email</label>
          <input
            type="email"
            {...register("email", { required: true, minLength: 6 })}
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors"
          />
          {errors.email && <span className="text-red-400">Valid email is required</span>}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-lg">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
              pattern: /([A-Z][a-z][0-9])/,
            })}
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors"
          />
          {errors.password?.type === "required" && <span className="text-red-400">Password is required</span>}
          {errors.password?.type === "minLength" && <span className="text-red-400">Password must be at least 6 characters</span>}
          {errors.password?.type === "maxLength" && <span className="text-red-400">Password must be under 12 characters</span>}
          {errors.password?.type === "pattern" && <span className="text-red-400">Password must contain at least one uppercase letter, one lowercase letter, and one number</span>}
        </div>

        <button
          type="submit"
          className="w-full p-3 text-lg bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center mt-6">
        Already have an account? <Link to="/login" className="text-purple-200 underline">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
