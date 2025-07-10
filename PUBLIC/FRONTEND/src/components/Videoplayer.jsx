import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api";
import { formatDistanceToNow } from "date-fns";

const Videoplayer = ({ video, sidebarToggle }) => {
  if (!video) return null;

  const timeAgo = video?.published_date
    ? formatDistanceToNow(new Date(video.published_date), { addSuffix: true })
    : "Unknown";

  const widthClass = sidebarToggle ? "w-[320px]" : "w-[280px]";

  const channelUsername = video?.about?.username || "unknown";
  const channelName = video?.about?.channel_name || channelUsername;
  const profilePic = video?.about?.profile_picture
    ? `${BASE_URL}${video.about.profile_picture}`
    : "https://placehold.co/40x40";

  return (
    <div className={`${widthClass} sm:w-[45%] lg:w-[30%]`}>
      <div className="py-3 rounded-md h-auto flex flex-col border shadow-lg">
        <div className="w-full h-[200px] border rounded-md overflow-hidden">
          <Link to={`video/${video.slug}`} state={{ video }}>
            <img
              src={
                video.thumbnail
                  ? video.thumbnail.startsWith("http")
                    ? video.thumbnail
                    : `${BASE_URL}${video.thumbnail}`
                  : "https://via.placeholder.com/300x200"
              }
              alt="thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        </div>

        <h3 className="font-semibold leading-normal text-[#181A2A] mb-0">
          {video.title}
        </h3>

        <div className="flex items-center gap-4 mt-2 ml-1">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              src={profilePic}
              alt="profile_pic"
              className="w-full h-full object-cover"
            />
          </div>
          <small className="text-[#97989F] text-[12px] font-semibold">
            {channelName}
          </small>
        </div>

        <small className="text-[#97989F] text-[12px] font-semibold ml-3 mt-1">
          {timeAgo}
        </small>
      </div>
    </div>
  );
};

export default Videoplayer;
