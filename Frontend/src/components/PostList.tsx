// /src/components/PostList.tsx

import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post } from "../types";

interface PostListProps {
  posts: Post[];
  onDeletePost: (id: number) => void;
  onRatePost: (id: number, rating: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onDeletePost,
  onRatePost,
}) => {
  return (
    <Box>
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {post.content}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <strong>Rating: </strong>
              {post.rating || "No rating yet"}
            </Typography>
            <Button
              onClick={() => onRatePost(post.id, (post.rating || 0) + 1)}
              color="primary"
            >
              Rate Up
            </Button>
            <IconButton onClick={() => onDeletePost(post.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostList;
