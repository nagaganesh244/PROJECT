import React from "react";
import Videoplayer from "./Videoplayer";

const Videos = ({ sidebarToggle, videos = [] }) => {
  return (
    <div
  className={`transition-all duration-300 
    ${sidebarToggle ? "pl-64" : "pl-16"} 
    flex flex-wrap gap-6 p-4 justify-start`}
>
  {videos.map((video) => (
    <Videoplayer key={video.id} video={video} sidebarToggle={sidebarToggle} />
  ))}
</div>

  );
};

export default Videos;
