import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Videoplayer from "./Videoplayer";
import { getUserInfo } from "../services/fetchvideos";

const Profilepage = () => {
  const [sidebarToggle, setsidebarToggle] = useState(false);

  const isAuthenticated = !!localStorage.getItem("access");
  
  console.log(query);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarToggle ? "w-64" : "w-16"
        } transition-all duration-300`}
      >
        <Sidebar
          sidebarToggle={sidebarToggle}
          setsidebarToggle={setsidebarToggle}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} />

        <div className="flex flex-wrap gap-4">
          
          <Videoplayer/>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
