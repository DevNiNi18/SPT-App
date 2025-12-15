import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-[20%] min-h-screen bg-white rounded-r-md text-[#333333] shadow-lg">
      <div className="flex items-center mx-auto relative">
        <img
          src="/flowtrack-logo.png"
          alt="logo"
          className="w-[50px] h-[50px]"
        />
        <h2 className="text-2xl font-bold">FlowTrack</h2>
      </div>

      <div>
        <nav>
          <NavLink
            to="/dashboard"
            className={({isActive}) => `flex items-center gap-3 w-[90%] mx-auto rounded-lg ${isActive ? "text-[#4ECDC4] bg-[#327E78]/10" : ""} px-4 py-2.5 mt-7`}
          end>
            <Icon icon="mdi:view-dashboard" className="w-5 h-5" />
            <h4 className="font-bold">Dashboard</h4>
          </NavLink>
          <NavLink
            to="/settings"
            className={({isActive}) => `flex items-center gap-3 w-[90%] mx-auto rounded-lg ${isActive ? 'text-[#4ECDC4] bg-[#327E78]/10' : ""} px-4 py-2.5`}
          >
            <Icon icon="mdi:settings" className="w-5 h-5" />
            <h4 className="font-bold">Settings</h4>
          </NavLink>
        </nav>
        
        <footer className="flex flex-col gap-5 mt-96 fixed">
          <div className="flex gap-2 mx-auto">
            <Icon icon="mdi:user" className="w-10 h-10 bg-gray-600 rounded-4xl py-1" />
            <div className="flex flex-col items-center text-[15px]">
              <h4>Alex Johnson</h4>
              <p>alex.j@school.edu</p>
            </div>
          </div>

          <Link className="flex justify-center gap-3 hover:text-[#4ECDC4]">
            <Icon icon="mdi:logout" className="w-7 h-7" />
            <h4 className="font-bold">Logout</h4>
          </Link>
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;


