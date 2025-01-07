import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <TextField
      label="Search Posts"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
      sx={{ marginBottom: 2 }}
    />
  );
};

export default SearchBar;
