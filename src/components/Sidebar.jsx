import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <img src="/flowtrack-logo.png" alt="logo" className="w-9 h-9" />
          <h2 className="text-lg font-bold text-[#333333]">FlowTrack</h2>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon icon="mdi:menu" className="w-6 h-6 text-[#333333]" />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 z-50 h-full sm:h-screen bg-white shadow-xl border-r border-gray-200 transform transition-all duration-300 ease-in-out
        ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 ${
          collapsed ? "sm:w-20" : "sm:w-64"
        } w-[280px]`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src="/flowtrack-logo.png"
              alt="logo"
              className="w-10 h-10 shrink-0"
            />
            {!collapsed && (
              <h2 className="text-xl font-bold text-[#333333] truncate">
                FlowTrack
              </h2>
            )}
          </div>

          {/* Desktop collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-[#4ECDC4]"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon
              icon={collapsed ? "mdi:chevron-right" : "mdi:chevron-left"}
              className="w-5 h-5"
            />
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="sm:hidden ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon icon="mdi:close" className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-3 py-4 flex-1 overflow-y-auto">
          <NavLink
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#4ECDC4] text-white shadow-md shadow-[#4ECDC4]/20"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#4ECDC4]"
              } ${collapsed ? "justify-center" : ""}`
            }
            title="Dashboard"
          >
            <Icon
              icon="mdi:view-dashboard"
              className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform"
            />
            {!collapsed && (
              <span className="font-semibold whitespace-nowrap">Dashboard</span>
            )}
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#4ECDC4] text-white shadow-md shadow-[#4ECDC4]/20"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#4ECDC4]"
              } ${collapsed ? "justify-center" : ""}`
            }
            title="Settings"
          >
            <Icon
              icon="mdi:settings"
              className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform"
            />
            {!collapsed && (
              <span className="font-semibold whitespace-nowrap">Settings</span>
            )}
          </NavLink>
        </nav>

        {/* Footer - User Info & Logout */}
        <div className="border-t border-gray-200 p-4 space-y-3">
          {/* User Info */}
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#3C9D97] flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-sm">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || ""}
                </p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group ${
              collapsed ? "justify-center" : ""
            }`}
            title="Logout"
          >
            <Icon
              icon="mdi:logout"
              className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform"
            />
            {!collapsed && (
              <span className="font-semibold whitespace-nowrap">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
