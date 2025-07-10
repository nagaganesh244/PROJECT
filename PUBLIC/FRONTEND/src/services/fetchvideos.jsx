import api from "../api";

// Get all videos
export async function getVideos() {
  try {
    const response = await api.get("video_list/");
    return response.data;
  } catch (err) {
    console.error("Error fetching videos:", err);
    throw new Error(err.message);
  }
}

// Register a new user
export async function registerUser(data) {
  try {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("channel_name", data.channel_name);
    formData.append("password", data.password);
    formData.append("profile_picture", data.profile_picture[0]);

    const response = await api.post("register_user/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.log(err.response?.data || err.message);
    if (err.response?.status === 400 && err.response?.data?.username) {
      throw new Error("username already exists");
    }
    throw new Error("Registration failed");
  }
}

// Login user
export async function login(data) {
  try {
    const response = await api.post("token/", data);
    return response.data;
  } catch (err) {
    throw err;
  }
}

// Get username of current user
export async function getUsername() {
  try {
    const response = await api.get("get_username");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Upload a video
export async function uploadVideo(data) {
  try {
    const response = await api.post("create_video/", data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get user info by username
export async function getUserInfo(username) {
  try {
    const response = await api.get(`get_userinfo/${username}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get liked videos
export async function getLikedVideos() {
  try {
    const response = await api.get("liked/");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch liked videos:", err);
    throw err;
  }
}

// ✅ Get comments for a specific video
export async function getComments(videoId) {
  try {
    const response = await api.get(`video/${videoId}/comments/`);
    return response.data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw new Error(err.message);
  }
}

// ✅ Post a new comment (corrected to use `content`)
export async function postComment(videoId, content) {
  try {
    const response = await api.post(
      `video/${videoId}/comments/`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error posting comment:", err);
    throw new Error(err.message);
  }
}
