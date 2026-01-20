import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-10 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
