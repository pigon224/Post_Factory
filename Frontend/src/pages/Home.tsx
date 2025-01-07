// /src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import PostList from "../components/PostList";
import { useUser } from "../contexts/UserContext";
import AddPostForm from "../components/AddPostForm";

const Home: React.FC<{ search: string }> = ({ search }) => {
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [showAddPostForm, setShowAddPostForm] = useState<boolean>(false);

  // Fetch all posts when the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  // Handle deleting a post
  const handleDeletePost = async (postId: number) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  // Handle rating a post
  const handleRatePost = async (postId: number, rating: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/posts/${postId}`,
        { rating },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, rating: response.data.rating } : post
        )
      );
    } catch (error) {
      console.error("Error rating post", error);
    }
  };

  // Toggle the AddPostForm visibility
  const handleAddPostClick = () => {
    setShowAddPostForm(!showAddPostForm);
  };

  return (
    <div>
      <h1>Welcome to the Blog</h1>
      {user && (
        <div>
          <button onClick={handleAddPostClick}>
            {showAddPostForm ? "Cancel" : "Add Post"}
          </button>
        </div>
      )}

      {showAddPostForm && (
        <AddPostForm
          onPostAdded={() =>
            setPosts([...posts, { title: "", content: "", rating: 0 }])
          }
        />
      )}

      <PostList
        posts={posts}
        onDeletePost={handleDeletePost}
        onRatePost={handleRatePost}
      />
    </div>
  );
};

export default Home;
