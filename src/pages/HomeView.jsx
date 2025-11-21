import React from "react";

const HomeView = () => {
  return (
    <div className="bg-[#F7F7F7] w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-[#F7F7F7] w-[60%] h-auto shadow-lg border border-black/5 py-3 px-2 rounded-lg flex flex-col justify-center items-center">
        <div className="w-[80%] text-center">
          <header className="flex flex-col items-center justify-center pb-3">
            <div className="bg-[#48A9A6]/10 text-[#333333] text-3xl font-extrabold rounded-4xl flex items-center px-8">
              <img
                src="/flowtrack-logo.png"
                alt="logo"
                className="w-[50px] h-[50px]"
              />
              <h1>FlowTrack</h1>
            </div>
          </header>
          
          <div className="font-bold text-3xl ">
            <h4>
              From <span className="">Cluttered</span> to <span className="">Clear</span>.
              Master Your Deadlines.
            </h4>
          </div>

          <div>
            <p>Effortlessly track projects, manage tasks, and stay organized to achieve your academic goals within real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
