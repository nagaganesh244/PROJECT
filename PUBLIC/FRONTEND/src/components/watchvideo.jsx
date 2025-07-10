import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import axios from "axios";
import { BASE_URL } from "../api";
import { Likedvideos } from "./Like";
import CommentSection from "./CommentList"; // ✅ import the reusable component

const Watchvideo = () => {
  const { slug } = useParams();
  const [video, setVideo] = useState(null);
  const [sidebarToggle, setsidebarToggle] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!localStorage.getItem("access");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(`${BASE_URL}video/${slug}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
        setError("Video not found or failed to load.");
      }
    };

    fetchVideo();
  }, [slug]);

  const sidebarWidth = sidebarToggle ? "w-64" : "w-16";
  const marginLeft = sidebarToggle ? "ml-64" : "ml-16";

  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!video) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar
        sidebarToggle={sidebarToggle}
        setsidebarToggle={setsidebarToggle}
      />

      <div
        className={`fixed top-0 left-0 right-0 z-10 ${marginLeft} transition-all duration-300`}
      >
        <Navbar isAuthenticated={isAuthenticated} />
      </div>

      <div className={`pt-20 transition-all duration-300 ${marginLeft}`}>
        <div className="p-4 sm:p-6 max-w-6xl w-full mx-auto mt-4">
          <h1 className="text-2xl font-bold mb-4">{video.title}</h1>

          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-md">
            <video
              className="w-full h-full object-contain"
              src={
                video.upload_video.startsWith("http")
                  ? video.upload_video
                  : `${BASE_URL}${video.upload_video}`
              }
              controls
            />
          </div>

          {video.description && (
            <p className="mt-4 text-gray-700 whitespace-pre-line">
              {video.description}
            </p>
          )}

          <Likedvideos video={video} />

          
          <CommentSection slug={slug} token={localStorage.getItem("access")} />
        </div>
      </div>
    </div>
  );
};

export default Watchvideo;
