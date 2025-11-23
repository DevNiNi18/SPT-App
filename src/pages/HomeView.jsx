import React from "react";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();
  const goToAuthPage = () => {
    navigate("/AuthPage");
  }

  return (
    <div className="bg-[#F7F7F7] w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-[#F7F7F7] w-[60%] h-auto shadow-lg border border-black/5 py-3 px-2 rounded-lg flex flex-col justify-center items-center">
        <div className="w-[70%] text-center">
          <header className="flex flex-col items-center justify-center pb-3 mt-5">
            <div className="bg-[#48A9A6]/10 text-[#333333] text-4xl font-extrabold rounded-4xl flex items-center px-8">
              <img
                src="/flowtrack-logo.png"
                alt="logo"
                className="w-[50px] h-[50px]"
              />
              <h1>FlowTrack</h1>
            </div>
          </header>
          
          <div className="font-bold text-2xl  mt-3">
            <h4 className="text-[#333333]">
              From <span className="text-[#48A9A6]">Cluttered</span> to <span className="text-[#40C4FF]">Clear</span>.
              Master Your Deadlines.
            </h4>
          </div>

          <div className="text-[#333333] text-[15px]  mt-3">
            <p>Effortlessly track projects, manage tasks, and stay organized to achieve your academic goals within real-time.</p>
          </div>

          <button onClick={goToAuthPage} className="bg-[#48A9A6] text-white text-sm font-semibold rounded-4xl px-5 py-2.5 mt-7 mb-7 cursor-pointer hover:bg-teal-600 ease-linear">
            Let's Get Organized!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
