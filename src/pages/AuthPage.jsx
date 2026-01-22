import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const registerSchema = z
    .object({
      email: z.string().min(1, "Email is required").email("Invalid Email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    setAuthError("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signIn(data.email, data.password);
        navigate("/dashboard");
      } else {
        const { data: signUpData, error: signUpError } = await signUp(
          data.email,
          data.password
        );

        if (signUpError) throw signUpError;

        // If user is created and session is available, log them in automatically
        if (signUpData.user && signUpData.session) {
          navigate("/dashboard");
        } else {
          // If no session, try to sign in immediately
          await signIn(data.email, data.password);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setAuthError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F7F7] shadow-lg w-full min-h-screen flex flex-col justify-center items-center px-4 text-[#333333]">
      <div className="flex items-center gap-2 mb-4">
        <img src="/flowtrack-logo.png" alt="logo" className="w-10 h-10" />
        <h2 className="text-2xl sm:text-3xl font-bold">FlowTrack</h2>
      </div>

      <div className="bg-white w-full max-w-md sm:max-w-lg flex flex-col items-center rounded-2xl px-4 sm:px-6 py-4">
        <div className="w-full max-w-xs sm:max-w-sm font-semibold relative flex h-9 mb-6 border-gray-300 rounded-md overflow-hidden bg-[#F7F7F7] mt-2">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 font-semibold transition-all z-10 ${
              isLogin ? "text-[#4ECDC4]" : "text-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
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

        <h4 className="text-lg sm:text-xl font-semibold mb-2">
          {isLogin ? "Login to Your Account" : "Create Your Account"}
        </h4>

        {authError && (
          <div
            className={`w-full max-w-sm mb-4 p-3 rounded-md text-sm ${
              authError.includes("created")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {authError}
          </div>
        )}

        <form className="flex flex-col w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="text-sm font-semibold">Email</label>
          <input
            {...register("email")}
            className="border border-[gainsboro] focus:outline-[#4ECDC4] py-2 px-3 rounded-md placeholder:text-sm w-full"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}

          {/* Password */}
          <label className="text-sm font-semibold mt-3">Password</label>
          <div className="border border-[gainsboro] focus-within:border-[#4ECDC4] flex justify-between items-center rounded-md px-2 w-full">
            <input
              {...register("password")}
              className="focus:outline-none py-2 px-1 rounded-md placeholder:text-sm w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <Icon
              icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
              className="w-5 h-5 text-[#aca8a8] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password.message}</div>
          )}

          {/* Register only */}
          {!isLogin && (
            <>
              <label className="text-sm font-semibold mt-4">
                Confirm Password
              </label>
              <div className="border border-[gainsboro] flex justify-between items-center rounded-md px-2 w-full">
                <input
                  {...register("confirmPassword")}
                  className="focus:outline-none py-2 px-1 rounded-md placeholder:text-sm w-full"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                />
                <Icon
                  icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                  className="w-5 h-5 text-[#aca8a8] cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              </div>
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </div>
              )}
            </>
          )}

          {/* Forgot password */}
          {isLogin && (
            <p className="flex justify-end text-sm font-semibold text-[#4ECDC4] hover:text-[#3C9D97] mt-2 cursor-pointer">
              Forgot password?
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#4ECDC4] mt-5 py-2.5 text-white rounded-md hover:bg-[#3C9D97] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>

          {/* Switch link */}
          <p className="mt-3 flex gap-1 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link
              to="#"
              onClick={() => setIsLogin(!isLogin)}
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
