import { useForm } from "react-hook-form";
import { Eye, EyeOff, User, Mail, Lock, Camera } from "lucide-react";
import UseAuth from "../../Hooks/UseAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const Signup= ({ navigate, from, axiosPublic }) => {
  const { createUser, updateuserprofile } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const image_host_key = import.meta.env.VITE_IMAGE_API;
  const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

  const onSubmit = async (data) => {
    setIsLoading(true);
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

      const userInfo = { 
        name: data.name, 
        email: data.email, 
        roll: "normal", 
        role: "normal",
        photo: photoUrl,
        createdAt: new Date()
      };
      
      const userRes = await axiosPublic.post("/users", userInfo);

      if (userRes.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Welcome to SoulTie!",
          text: "Your account has been created successfully",
          showConfirmButton: false,
          timer: 2000,
          background: '#fdf2f8',
          color: '#be185d'
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Registration Failed",
        text: "Something went wrong. Please try again.",
        showConfirmButton: true,
        background: '#fdf2f8',
        color: '#be185d'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="animate-fadeIn">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name  */}
        <div className="space-y-2">
          <label >
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 w-5 h-5" />
            <input
              type="text"
              {...register("name", { 
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              })}
              placeholder="Enter your full name"
              className="custom-input"
            />
          </div>
          {errors.name && (
            <p className="text-rose-500 text-sm font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Profile Photo */}
        <div className="space-y-2">
          <label >
            Profile Photo
          </label>
          <div className="relative">
            <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 w-5 h-5" />
            <input
              type="file"
              {...register("photo", { 
                required: "Profile photo is required",
                validate: {
                  fileSize: (files) => 
                    !files[0] || files[0]?.size <= 5000000 || "File size must be less than 5MB",
                  fileType: (files) =>
                    !files[0] || ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) || 
                    "Only JPEG, PNG, and JPG files are allowed"
                }
              })}
              accept="image/jpeg,image/png,image/jpg"
              className="custom-input"
            />
          </div>
          {photo && (
            <p className="text-rose-600 text-sm font-medium truncate">
              Photo uploaded successfully
            </p>
          )}
          {errors.photo && (
            <p className="text-rose-500 text-sm font-medium">
              {errors.photo.message}
            </p>
          )}
        </div>

        {/* Email  */}
        <div className="space-y-2">
          <label >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 w-5 h-5" />
            <input
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Enter your email"
              className="custom-input"
            />
          </div>
          {errors.email && (
            <p className="text-rose-500 text-sm font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                },
                maxLength: {
                  value: 12,
                  message: "Password must be less than 12 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Must include uppercase, lowercase, and number"
                }
              })}
              placeholder="Create a strong password"
              className="custom-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rose-400 hover:text-rose-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-rose-500 text-sm font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                    password.length >= i * 3
                      ? 'bg-gradient-to-r from-rose-400 to-rose-500'
                      : 'bg-rose-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Password strength: {password.length >= 8 ? 'Strong' : password.length >= 6 ? 'Medium' : 'Weak'}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;