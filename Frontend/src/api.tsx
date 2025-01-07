import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// Fetch all posts
export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

// Add a new post
export const addPost = async (postData: {
  title: string;
  content: string;
  username: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData);
  return response.data;
};

// Delete a post
export const deletePost = async (postId: number) => {
  await axios.delete(`${API_BASE_URL}/posts/${postId}`);
};

// Rate a post
export const ratePost = async (postId: number, rating: number) => {
  const response = await axios.post(`${API_BASE_URL}/posts/${postId}/rate`, {
    rating,
  });
  return response.data;
};

// Fetch comments for a post
export const fetchComments = async (postId: number) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
  return response.data;
};

// Add a comment
export const addComment = async (
  postId: number,
  commentData: { content: string; username: string }
) => {
  const response = await axios.post(
    `${API_BASE_URL}/posts/${postId}/comments`,
    commentData
  );
  return response.data;
};
