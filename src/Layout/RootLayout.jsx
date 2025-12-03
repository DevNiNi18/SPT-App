import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const RootLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
