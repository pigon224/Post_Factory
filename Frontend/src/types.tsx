// src/types.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  rating: number; // Rating between 0 to 5
  comments: string[]; // Array of comments
  userId: number;
}
