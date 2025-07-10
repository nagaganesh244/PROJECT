import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';

export function Likedvideos({ video }) {
  const [isLiked, setIsLiked] = useState(video.is_liked);
  const [likeCount, setLikeCount] = useState(video.likes_count);

  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem('access');
      const res = await axios.post(
        `${BASE_URL}video/${video.slug}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLiked(res.data.liked);
      setLikeCount(res.data.likes_count);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      className="text-white px-4 py-2 rounded-lg mt-2 transition-all duration-300"
    >
      <p
        className={`text-black text-lg hover:scale-110 transition-transform duration-200 ${
          isLiked ? 'font-bold' : ''
        }`}
      >
        {isLiked ? '❤️' : '♡'} {likeCount}
      </p>
    </button>
  );
}
