import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentSection = ({ slug, token }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${slug}/`);
      const data = res.data;

      // Ensure comments is an array
      if (Array.isArray(data)) {
        setComments(data);
      } else if (Array.isArray(data.comments)) {
        setComments(data.comments);
      } else {
        setComments([]); // fallback to empty
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setComments([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `/comments/${slug}/add/`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      fetchComments(); // refresh comments after posting
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>

      <form onSubmit={handleSubmit} className="mt-2 mb-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post
        </button>
      </form>

      <div>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4 border-b pb-2">
              <p className="font-medium">{comment.user}</p>
              <p className="text-sm text-gray-600">{comment.text}</p>
              <p className="text-xs text-gray-400">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
