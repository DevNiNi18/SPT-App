import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-white shadow">
        <div className="flex items-center gap-2">
          <img src="/flowtrack-logo.png" alt="logo" className="w-9 h-9" />
          <h2 className="text-lg font-bold">FlowTrack</h2>
        </div>

        <button onClick={() => setOpen(true)}>
          <Icon icon="mdi:menu" className="w-7 h-7" />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 z-50 h-full sm:h-screen w-[75%] max-w-xs bg-white shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex items-center gap-2 px-4 py-4 border-b">
          <img
            src="/flowtrack-logo.png"
            alt="logo"
            className="w-[45px] h-[45px]"
          />
          <h2 className="text-xl font-bold">FlowTrack</h2>

          <button
            onClick={() => setOpen(false)}
            className="ml-auto sm:hidden"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        <nav>
          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-[90%] mx-auto rounded-lg ${
                isActive ? "text-[#4ECDC4] bg-[#327E78]/10" : ""
              } px-4 py-2.5 mt-7`
            }
          
          >
            <Icon icon="mdi:view-dashboard" className="w-5 h-5" />
            <h4 className="font-bold">Dashboard</h4>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-[90%] mx-auto rounded-lg ${
                isActive ? "text-[#4ECDC4] bg-[#327E78]/10" : ""
              } px-4 py-2.5`
            }
          >
            <Icon icon="mdi:settings" className="w-5 h-5" />
            <h4 className="font-bold">Settings</h4>
          </NavLink>
        </nav>

        <footer className="absolute bottom-6 w-full flex flex-col gap-5">
          <div className="flex gap-2 mx-auto">
            <Icon
              icon="mdi:user"
              className="w-10 h-10 bg-gray-600 rounded-4xl py-1"
            />
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
      </aside>
    </>
  );
};

export default Sidebar;
