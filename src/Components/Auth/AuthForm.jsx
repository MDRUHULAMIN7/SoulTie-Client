import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import AuthSidebar from "./AuthSidebar";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/SignUp/SignUp";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = UseAxiosPublic();

  const toggleAuthMode = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  return (
    <div className=" md:min-h-[90vh] bg-gradient-to-br from-rose-50 via-white to-rose-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100">
        <div className="flex flex-col md:flex-row  md:min-h-[600px]">
          {/* Left Side  */}
          <div className="hidden md:block md:w-1/2">
            <AuthSidebar isLogin={isLogin} onToggle={toggleAuthMode} />
          </div>

          {/* Right Side  */}
          <div className="w-full md:w-1/2 relative overflow-hidden">
            <div className="relative w-full h-full">
              {/* Login  */}
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
                  isLogin
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
                }`}
              >
                <div className="p-8 h-full flex items-center">
                  <div className="w-full max-w-md mx-auto">
                    <Login
                      navigate={navigate}
                      from={from}
                      axiosPublic={axiosPublic}
                    />
                  </div>
                </div>
              </div>

              {/* Signup */}
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
                  isLogin
                    ? "translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <div className="p-8 h-full flex items-center">
                  <div className="w-full max-w-md mx-auto">
                    <Signup
                      navigate={navigate}
                      from={from}
                      axiosPublic={axiosPublic}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  visible on mobile */}
          <div className="md:hidden">
            <div className="  p-6">
              <div className="mb-4">
                <h2 className="text-4xl text-gray-700 font-bold mb-2">
                  {isLogin ? "Welcome Back!" : "Join SoulTie"}
                </h2>
                <p className="text-rose-300 text-lg">
                  {isLogin
                    ? "Continue your journey to find your perfect match"
                    : "Begin your journey to find your perfect match"}
                </p>
              </div>
              {isLogin ? (
                <>
                  <div>
                    <Login
                      navigate={navigate}
                      from={from}
                      axiosPublic={axiosPublic}
                    />
                  </div>
                  <button
                    onClick={toggleAuthMode}
                    className="text-white bg-rose-400 px-4 py-2 rounded-lg font-semibold flex mt-3 items-center gap-2 transform  z-10"
                  >
                    Create Account
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <Signup
                    navigate={navigate}
                    from={from}
                    axiosPublic={axiosPublic}
                  />
                  <button
                    onClick={toggleAuthMode}
                    className="text-white bg-rose-400 font-semibold flex items-center gap-2 transform px-4 py-2 rounded-lg  mt-3 z-10"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
