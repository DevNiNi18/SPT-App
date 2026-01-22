import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-[#F7F7F7]">
      <Sidebar />
      <div className="flex-1 w-full p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
