import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();
  const goToAuthPage = () => {
    navigate("/authpage");
  };

  return (
    <div className="bg-[#F7F7F7] w-full min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#F7F7F7] w-full max-w-2xl shadow-lg border border-black/5 py-6 px-4 sm:px-6 rounded-lg flex flex-col items-center">
        <div className="w-full text-center">
          <header className="flex flex-col items-center justify-center pb-4 mt-4">
            <div className="bg-[#48A9A6]/10 text-[#333333] text-2xl sm:text-3xl md:text-4xl font-extrabold rounded-4xl flex items-center gap-2 px-6 py-2">
              <img
                src="/flowtrack-logo.png"
                alt="logo"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <h1>FlowTrack</h1>
            </div>
          </header>

          <div className="font-bold text-lg sm:text-xl md:text-2xl mt-4">
            <h4 className="text-[#333333]">
              From <span className="text-[#48A9A6]">Cluttered</span> to{" "}
              <span className="text-[#40C4FF]">Clear</span>. Master Your Deadlines.
            </h4>
          </div>

          <div className="text-[#333333] text-sm sm:text-base mt-3">
            <p>
              Effortlessly track projects, manage tasks, and stay organized to
              achieve your academic goals within real-time.
            </p>
          </div>

          <button
            onClick={goToAuthPage}
            className="bg-[#48A9A6] text-white text-sm sm:text-base font-semibold rounded-4xl px-6 py-3 mt-7 mb-6 cursor-pointer hover:bg-teal-600 transition"
          >
            Let's Get Organized!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
