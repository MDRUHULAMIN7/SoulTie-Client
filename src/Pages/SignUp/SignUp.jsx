import { Link, useNavigate } from "react-router-dom";
import login from "../../images/Login.jpg";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import { useState } from "react";
import Swal from "sweetalert2";


const SignUp = () => {
  const {reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [photo,setPhoto]=useState('')
  const axiosPublic = UseAxiosPublic();
  const { createUser,updateuserprofile,logout} =UseAuth()
  const navigate = useNavigate()
  const image_host_key = import.meta.env.VITE_IMAGE_API;
  const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

  const onSubmit = async (data,refetch) => {
    const imagefile = { image: data.photo[0] };

    const res = await axiosPublic.post(image_host_api, imagefile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const photo = res.data.data.url;
    setPhoto(photo)
   

    createUser(email,password)
    .then(result=>{
        console.log(result);
       updateuserprofile(name,photo)
       .then(result=>{
        console.log(result);
        reset()
        refetch()


       })
       .then(err=>{
        console.log(err);
       
       })
       const userInfo={
        name:data.name,
        email:data.email,
        roll: 'normal',
        role: 'normal'
       }
       axiosPublic.post('/users',userInfo)
       .then(res=>{
        if(res.data.insertedId){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "SignUp Successfully Login Now",
            showConfirmButton: false,
            timer: 2000
          });
        
          logout()
          navigate('/login')
          refetch()
          reset()
        }
       })
    })
 

  };

  return (
    <div
      className="flex mt-10 text-white flex-col max-w-screen-sm p-6 rounded-md sm:p-10 bg-cover bg-no-repeat mx-auto  dark:text-gray-800"
      style={{
        backgroundImage: `url(${login})`,
      }}
    >
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        <p className=" dark:text-black text-lg">
          Sign up to access your account
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate=""
        action=""
        className="space-y-6"
      >
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block text-black text-lg">
            Name
          </label>
          <input
            type="name"
            {...register("name", { required: true })}
            name="name"
            id="username"
            required
            placeholder="Username"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
          />
          {errors.name && (
            <span className="text-red-600">Name is required</span>
          )}
        </div>

        <div className=" text-sm">
          <label htmlFor="username" className="block text-black text-lg">
            Photo
          </label>

          <div className="flex bg-white w-full rounded-lg ">
            <input
              type="file"
              {...register("photo", { required: true })}
              required
              name="photo"
              id="files"
              className="px-8 py-2 dark:text-black text-lg dark:bg-gray-100"
            />
            <p className={photo ? "text-black" : 'text-white'}>{photo ? photo.slice(0,19) : ""}</p>
          </div>
          {errors.photo && (
            <span className=" text-red-600 bg-slate-200 p-2">
              photoURL is required
            </span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block text-black text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="username"
            required
            {...register("email", { required: true, minLength: 6 })}
            placeholder="email"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
          />
          {errors.email && (
            <span className="text-red-600  bg-slate-200 p-2">
              Email is required
            </span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-black text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
              pattern: /([A-Z][a-z][0-9])/,
            })}
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
          />
          {errors.password?.tupe === "required" && (
            <span className="text-red-600  bg-slate-200 p-2">
              Password is required
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-600  bg-slate-200 p-2">
              Password is must 6 character
            </span>
          )}

          {errors.password?.type === "maxLength" && (
            <span className="text-red-600  bg-slate-200 p-2">
              Password is must under 12 character
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-600  bg-slate-200 p-2">
              Password is invalid
            </span>
          )}
        </div>

        <input
          className="block  w-full p-3 text-center disabled:bg-black text-lg rounded-sm text-gray-50 bg-violet-600"
          type="submit"
          value="Sign Up"
        />
      </form>
      <p className="px-6 text-lg text-center dark:text-black ">
        Already have an account yet?
        <Link
          to={"/login"}
          rel="noopener noreferrer"
          href="#"
          className="hover:underline text-black"
        >
          Login
        </Link>
        .
      </p>
    </div>
  );
};

export default SignUp;
