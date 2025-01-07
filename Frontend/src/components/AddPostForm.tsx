// /src/components/AddPostForm.tsx

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

interface AddPostFormProps {
  onPostAdded: () => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onPostAdded }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      try {
        await axios.post(
          "http://localhost:8000/posts",
          { title, content },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        onPostAdded();
      } catch (error) {
        console.error("Error creating post", error);
      }
    } else {
      alert("Please log in to create a post");
    }
  };

  return (
    <Box sx={{ width: 400, margin: "auto" }}>
      <TextField
        label="Post Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Post Content"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        onClick={handlePostSubmit}
        fullWidth
        disabled={!title || !content}
      >
        Add Post
      </Button>
    </Box>
  );
};

export default AddPostForm;
