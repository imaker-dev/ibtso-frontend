import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";
import { navConfig } from "../config/NavConfig";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  sidebarExpanded,
  setSidebarExpanded,
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const effectiveExpanded = isMobile ? true : sidebarExpanded;

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Helper function to determine if an item is active
  const isItemActive = (item) => {
    if (item.path) {
      return pathname === item.path || pathname.startsWith(`${item.path}/`);
    } else if (item.children) {
      return item.children.some(
        (child) =>
          pathname === child.path || pathname.startsWith(`${child.path}/`)
      );
    }
    return false;
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 xl:hidden xl:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
         onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 xl:static xl:left-auto xl:top-auto xl:translate-x-0 h-[100dvh] overflow-y-scroll xl:overflow-y-auto no-scrollbar shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${effectiveExpanded ? "w-64 p-4" : "xl:w-20 p-2"}`}
      >
        {/* Sidebar header */}
        <div
          className={`flex justify-between mb-8 ${
            effectiveExpanded ? "pr-3 sm:px-2" : "justify-center"
          }`}
        >


          {/* Logo */}
          {/* <NavLink end to="/" className="w-full flex justify-center bg-primary-50 rounded-lg p-2">
            <img
              src="/Images/logo.png"
              alt="logo"
              className="w-28 xl:w-40"
            />
          </NavLink> */}
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Asset Manager</h1>
          </div>
        </div>

        {/* Links */}
        <div className={`space-y-6 ${effectiveExpanded ? "" : "space-y-4"}`}>
          {navConfig.map((group) => (
            <div key={group.title}>
              {/* Group title */}
              <h3
                className={`text-xs uppercase text-gray-500 font-semibold mb-3 transition-all duration-200 ${
                  effectiveExpanded
                    ? "pl-3 opacity-100"
                    : "text-center opacity-60 px-0"
                }`}
              >
                {effectiveExpanded ? (
                  group.title
                ) : (
                  <span className="block w-full text-center">•••</span>
                )}
              </h3>

              <ul
                className={`${effectiveExpanded ? "space-y-1" : "space-y-2"}`}
              >
                {group.items.map((item) => {
                  const isActive = isItemActive(item);
                  const iconClass = isActive
                    ? "text-secondary-500"
                    : "text-gray-500";

                  if (item.children) {
                    return (
                      <SidebarLinkGroup
                        key={item.name}
                        activecondition={isActive}
                        sidebarExpanded={effectiveExpanded}
                        itemName={item.name}
                      >
                        {(handleClick, open) => (
                          <div className="group relative">
                            <a
                              href="#0"
                              className={`block text-gray-800 truncate transition-all duration-150 ${
                                isActive
                                  ? "hover:text-gray-800"
                                  : "hover:text-gray-900"
                              } ${
                                effectiveExpanded
                                  ? ""
                                  : "flex items-center justify-center"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                if (!effectiveExpanded && !isMobile) {
                                  setSidebarExpanded(true);
                                }
                                handleClick();
                              }}
                            >
                              <div
                                className={`flex items-center ${
                                  effectiveExpanded
                                    ? "justify-between"
                                    : "justify-center"
                                }`}
                              >
                                <div
                                  className={`flex items-center ${
                                    effectiveExpanded
                                      ? ""
                                      : "justify-center w-full"
                                  }`}
                                >
                                  <item.icon className={`shrink-0 h-6 w-6 ${iconClass} transition-colors duration-200`} />

                                  {effectiveExpanded && (
                                    <span className="text-sm font-medium ml-3 transition-opacity duration-200">
                                      {item.name}
                                    </span>
                                  )}
                                </div>
                                {effectiveExpanded && (
                                  <div className="flex shrink-0 ml-2">
                                    <svg
                                      className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 transition-transform duration-200 ${
                                        open && "rotate-180"
                                      }`}
                                      viewBox="0 0 12 12"
                                    >
                                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </a>

                            {/* Tooltip for collapsed state */}
                            {!effectiveExpanded && !isMobile && (
                              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
                                {item.name}
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                              </div>
                            )}

                            {/* Submenu */}
                            {effectiveExpanded && (
                              <ul
                                className={`pl-9 mt-1 space-y-1 transition-all duration-200 ${
                                  !open && "hidden"
                                }`}
                              >
                                {item.children.map((child) => {
                                  const isChildActive = pathname === child.path;
                                  //  || pathname.startsWith(`${child.path}/`);
                                  return (
                                    <li key={child.name}>
                                      <NavLink
                                        end
                                        to={child.path}
                                        className={`block py-1 transition duration-150 truncate text-sm font-medium ${
                                          isChildActive
                                            ? "text-secondary-500"
                                            : "text-gray-600 hover:text-gray-900"
                                        }`}
                                      >
                                        {child.name}
                                      </NavLink>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        )}
                      </SidebarLinkGroup>
                    );
                  } else {
                    return (
                      <li
                        key={item.name}
                        className={`mb-0.5 last:mb-0 transition-all duration-200 ${
                          isActive ? "bg-secondary-50" : ""
                        } ${
                          effectiveExpanded
                            ? "px-3 py-2 rounded-sm"
                            : "px-2 py-2 rounded-lg mx-1 hover:bg-gray-100"
                        }`}
                      >
                        <NavLink
                          end
                          to={item.path}
                          className={`group relative block text-gray-800 truncate transition duration-150 ${
                            isActive
                              ? "text-secondary-500 hover:text-secondary-600"
                              : "hover:text-gray-900"
                          } ${
                            effectiveExpanded
                              ? ""
                              : "flex items-center justify-center"
                          }`}
                        >
                          <div
                            className={`flex items-center ${
                              effectiveExpanded
                                ? "justify-between"
                                : "justify-center"
                            }`}
                          >
                            <div
                              className={`flex items-center ${
                                effectiveExpanded
                                  ? "grow"
                                  : "justify-center w-full"
                              }`}
                            >
                              <item.icon className={`shrink-0 h-6 w-6 ${iconClass} transition-colors duration-200`} />

                              {effectiveExpanded && (
                                <span className="text-sm font-medium ml-3 transition-opacity duration-200">
                                  {item.name}
                                </span>
                              )}
                            </div>
                            {effectiveExpanded && item.badge && (
                              <div className="flex flex-shrink-0 ml-2">
                                <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-secondary-500 px-2 rounded transition-all duration-200">
                                  {item.badge}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Tooltip for collapsed state */}
                          {!effectiveExpanded && !isMobile && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[60] shadow-lg flex items-center">
                              {item.name}
                              {item.badge && (
                                <span className="inline-flex items-center justify-center h-4 text-xs font-medium text-white bg-primary px-1.5 rounded ml-2">
                                  {item.badge}
                                </span>
                              )}
                              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                            </div>
                          )}
                        </NavLink>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Expand / collapse button - only show on desktop */}
        <div
          className={`pt-6 hidden lg:inline-flex justify-end mt-auto ${
            effectiveExpanded ? "" : "justify-center"
          }`}
        >
          <div className={`${effectiveExpanded ? "px-3 py-2" : "px-2 py-2"}`}>
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="group relative p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className={`w-6 h-6 fill-current transition-transform duration-300 ${
                  sidebarExpanded ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
              >
                <path
                  className="text-gray-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-gray-600" d="M3 23H1V1h2z" />
              </svg>

              {/* Tooltip for collapse button */}
              {!sidebarExpanded && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[60] shadow-lg">
                  Expand sidebar
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
