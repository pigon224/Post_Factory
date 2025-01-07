// /src/pages/MyPosts.tsx

import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import PostList from "../components/PostList";

const MyPosts: React.FC = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/posts/user/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching user posts", error);
        }
      };
      fetchUserPosts();
    }
  }, [user]);

  return (
    <div>
      <h1>My Posts</h1>
      <PostList posts={posts} onDeletePost={() => {}} onRatePost={() => {}} />
    </div>
  );
};

export default MyPosts;
