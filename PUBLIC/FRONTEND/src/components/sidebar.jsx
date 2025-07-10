import React, { useEffect } from "react";
import { FaBars, FaHome } from "react-icons/fa";

const Sidebar = ({ sidebarToggle, setsidebarToggle }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setsidebarToggle(false);
      } else {
        setsidebarToggle(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setsidebarToggle]);

  return (
    <div
      className={`bg-black text-white h-screen fixed p-4 transition-all duration-300 
        ${sidebarToggle ? "w-64" : "w-16"} flex flex-col items-center`}
    >
      <div className="flex items-center mb-6 self-start">
        <FaBars
          className="text-white text-xl cursor-pointer"
          onClick={() => setsidebarToggle(!sidebarToggle)}
        />
      </div>

      <ul className="space-y-4 w-full flex flex-col items-center">
        <li className="w-full">
          <a
            href="/"
            className={`flex ${
              sidebarToggle ? "flex-row justify-start" : "flex-col justify-center"
            } items-center w-full py-2 rounded hover:bg-gray-600`}
            title="Home"
          >
            <FaHome className="text-2xl" />
            <span
              className={`text-sm mt-1 ${
                sidebarToggle ? "ml-3 mt-0" : "text-center"
              }`}
            >
              HOME
            </span>
          </a>
        </li>
        <li className="w-full">
          <a
            href="/liked"
            className={`flex ${
              sidebarToggle ? "flex-row justify-start" : "flex-col justify-center"
            } items-center w-full py-2 rounded hover:bg-gray-600`}
            title="LIKED VIDEOS"
          >
            <h2>❤️</h2>
            <span
              className={`text-sm mt-1 ${
                sidebarToggle ? "ml-3 mt-0" : "text-center"
              }`}
            >
              LIKED VIDEOS
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
