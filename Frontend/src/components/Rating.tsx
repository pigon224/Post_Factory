// /src/components/Rating.tsx

import React from "react";
import { Rating as MuiRating } from "@mui/material";

interface RatingProps {
  value: number;
  onChange: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, onChange }) => {
  return (
    <MuiRating
      value={value}
      onChange={(_, newValue) => onChange(newValue ?? 0)}
    />
  );
};

export default Rating;
