import React, { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './Sidebar';
import Videos from './Videos';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from '../services/fetchvideos';

const Dashboard = ({ isAuthenticated }) => {
  const [sidebarToggle, setsidebarToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: videos, isLoading, isError } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  if (isLoading) return <div className="text-center mt-10">Loading videos...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Failed to load videos.</div>;

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Sidebar sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle} />
      <Navbar
        isAuthenticated={isAuthenticated}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Videos sidebarToggle={sidebarToggle} videos={filteredVideos} />
    </div>
  );
};

export default Dashboard;
