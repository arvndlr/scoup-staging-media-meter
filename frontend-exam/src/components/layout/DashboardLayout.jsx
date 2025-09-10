import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/icons/dashboard-sidebar/logo.svg?react";
import LogoHover from "../../assets/icons/scoup-logo.svg?react"; // Assuming you have a full logo SVG
import Newsletter from "../../assets/icons/dashboard-sidebar/newsletter.svg?react";
import Publisher from "../../assets/icons/dashboard-sidebar/publisher.svg?react";
import Sources from "../../assets/icons/dashboard-sidebar/sources.svg?react";
import Persona from "../../assets/icons/dashboard-sidebar/persona.svg?react";
import Sidebar from "../../assets/icons/dashboard-sidebar/sidebar.svg?react";
import Rocket from "../../assets/icons/dashboard-sidebar/rocket.svg?react";
import Avatar from "../../assets/icons/dashboard-sidebar/avatar.svg?react";

const DashboardLayout = ({ children }) => {
  // Define your sidebar links here
  const navLinks = [
    { name: "Newsletters", path: "/newsletters", icon: Newsletter },
    { name: "Publishers", path: "/publishers", icon: Publisher },
    { name: "Sources", path: "/sources", icon: Sources },
    { name: "Persona", path: "/persona", icon: Persona },
  ];

  const bottomLinks = [
    { name: "", path: "/sidebar", icon: Sidebar },
    { name: "Release notes", path: "/rocket", icon: Rocket },
    { name: "Maricel Alonzo", path: "/avatar", icon: Avatar },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <div className="group fixed top-0 left-0 bottom-0 z-10 transition-all duration-300 hover:w-44 w-17">
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col justify-between bg-white min-h-screen p-4 hover:w-44 w-17">
          {/* Top Section */}
          <div className="flex flex-col flex-grow">
            <div className="flex items-center space-x-2 mb-2 group">
              <Logo className="h-8 w-8 group-hover:hidden" />
              <LogoHover className="h-8 w-auto hidden group-hover:block" />
            </div>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="p-2 flex items-center space-x-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <link.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">
                      {link.name}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Section */}
          <ul className="flex flex-col">
            {bottomLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className="p-2 flex items-end space-x-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <link.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden group-hover:inline transition-all duration-300 text-sm font-semibold">
                    {link.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 px-8 ml-1 group-hover:ml-44 transition-all duration-300 bg-[#faf9f5]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
