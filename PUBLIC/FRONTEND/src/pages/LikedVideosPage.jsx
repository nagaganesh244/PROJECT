import React, { useEffect, useState } from "react";
import { getLikedVideos } from "./../services/fetchvideos"

const LikedVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLiked() {
      try {
        const data = await getLikedVideos();
        setVideos(data);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load liked videos");
      }
    }

    fetchLiked();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Liked Videos</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border p-2 rounded shadow">
            <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
            <h3 className="mt-2 font-semibold">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.channel_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedVideosPage;
