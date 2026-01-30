import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Search, Bell, HelpCircle } from "lucide-react";
import DropdownProfile from "../DropdownProfile";
import LogoutModal from "../../partial/auth/LogoutModal";
import { clearLoginState } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Header({ sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutOverlay(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutOverlay(false);
    dispatch(clearLoginState());
  };

  return (
    <>
      <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
        <div className="px-4 sm:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 -mb-px">
            {/* Header: Left side */}
            <div className="flex">
              <button
                className="text-slate-500 hover:text-slate-600 xl:hidden"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Header: Right side */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <button
                className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full ml-3`}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <Search className="w-4 h-4 text-slate-500" />
              </button>

              {/* Notifications */}
              <button onClick={() => navigate('/notifications')} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full ml-2">
                <span className="sr-only">Notifications</span>
                <Bell className="w-4 h-4 text-slate-500" />
              </button>

              {/* Divider */}
              <hr className="w-px h-6 bg-slate-200 border-none" />

              {/* Profile Dropdown */}
              <DropdownProfile
                align="right"
                onLogoutClick={handleLogoutClick}
              />
            </div>
          </div>
        </div>
      </header>

      <LogoutModal
        isOpen={showLogoutOverlay}
        onClose={() => setShowLogoutOverlay(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}

export default Header;
