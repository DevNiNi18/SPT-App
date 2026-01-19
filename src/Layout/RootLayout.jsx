import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <Sidebar />
      <div className="w-full p-4 sm:p-10 bg-[#F7F7F7]">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
