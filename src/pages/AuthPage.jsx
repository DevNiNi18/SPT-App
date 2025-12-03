import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const AuthPage = () => {
  // for handling the login and register switching
  const [isLogin, setIsLogin] = useState(true);

  // for handling the eye icon for showing pswd
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // zod schema for register and login
  const loginSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid Email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const registerSchema = z.object({
      email: z.string().nonempty("Email is required").email("Invalid Email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().nonempty("Please confirm your password"),
  }) .refine(data => data.password === data.confirmPassword, {
        path:["confirmPassword"],
        message: "Passwords do not match",
      });

  // for form validation
  const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = (data) => {
    console.log(data);

    reset();
  }

  return (
    <div className="bg-[#F7F7F7] w-full h-screen flex flex-col justify-center items-center px-4 text-[#333333]">
      <div className="flex">
        <img
          src="/flowtrack-logo.png"
          alt="logo"
          className="w-[50px] h-[50px]"
        />
        <h2 className="text-3xl font-bold mb-5 ">FlowTrack</h2>
      </div>

      <div className="bg-white w-[30%] h-auto flex flex-col justify-center items-center rounded-2xl min-w-3/10 max-w-3/10">
        <div className="w-[70%] font-semibold relative flex h-9 mb-6 border-gray-300 rounded-md overflow-hidden bg-[#F7F7F7] mt-5">
          <button
            onClick={() => {
              setIsLogin(true);
            }}
            className={`w-1/2 font-semibold transition-all z-10 ${
              isLogin ? "text-[#4ECDC4]" : "text-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
            }}
            className={`w-1/2 font-semibold transition-all z-10 ${
              !isLogin ? "text-[#4ECDC4]" : "text-black"
            }`}
          >
            Register
          </button>
          <div
            className={`flex justify-center items-center absolute top-0.5 h-[90%] w-1/2 shadow-lg rounded-md bg-white border-[#F7F7F7] ${
              isLogin ? "left-1" : "right-1"
            }`}
          ></div>
        </div>

        <h4 className="text-[20px] font-semibold">
          {isLogin ? "Login to Your Account" : "Create Your Account"}
        </h4>
        <form className="flex flex-col m-3" onSubmit={handleSubmit(onSubmit)}>

          {/* shared input field */}
          <label className="text-[14px] font-semibold">Email</label>
          <input
            {...register("email")}
            className="border border-[gainsboro] focus:outline-[#4ECDC4] py-1 px-2 rounded-md placeholder:text-[13px]"
            type="email"
            placeholder="Enter your email"
          />

          {errors.email && <div className="text-red-500 text-[13px]">{errors.email.message}</div>}

          <label className="text-[14px] font-semibold mt-2">Password</label>
          <div className="border border-[gainsboro] focus:border-2 focus:border-[#4ECDC4] flex justify-between items-center rounded-md  px-1">
            <input
            {...register("password")}
              className="focus:outline-none py-1 px-2 rounded-md placeholder:text-[13px]"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <Icon
              icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
              className="w-5 h-5 text-[#aca8a8]"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          </div>
          
          {errors.password && <div className="text-red-500 text-[13px]">{errors.password.message}</div>}

          {/* for register only */}
          {!isLogin && (
            <>
              <label className="text-[14px] font-semibold mt-5">
                Confirm Password
              </label>
              <div className="border border-[gainsboro] flex justify-between items-center rounded-md  px-1">
                <input
                {...register("confirmPassword")}
                  className="  focus:outline-none py-1 px-2 rounded-md placeholder:text-[13px]"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                />
                <Icon
                  icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                  className="w-5 h-5 text-[#aca8a8]"
                  onClick={() => {
                    setShowConfirmPassword((prev) => !prev);
                  }}
                />
              </div>
            </>
          )}

          {errors.confirmPassword && <div className="text-red-500 text-[13px]">{errors.confirmPassword.message}</div>}

          {/* forget password for login */}
          {isLogin && (
            <div>
              <p className="flex justify-end text-[14px] font-semibold text-[#4ECDC4] hover:text-[#3C9D97] mt-2">
                Forgot password?
              </p>
            </div>
          )}

          {/* shared input */}
          <button className="bg-[#4ECDC4] mt-5 py-2 text-white rounded-md hover:bg-[#3C9D97]">
            {isLogin ? "Login" : "Register"}
          </button>

          {/* switch link */}
          <p className="mt-3 flex gap-1">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link
              to="#"
              onClick={(e) => setIsLogin(!isLogin)}
              className="text-[#4ECDC4] hover:text-[#3C9D97]"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
