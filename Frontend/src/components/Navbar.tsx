// /src/components/Navbar.tsx

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useUser } from "../contexts/UserContext";

const Navbar: React.FC<{
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onSearchChange }) => {
  const { user, logout } = useUser();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">Home</Link>
          {user && <Link to="/my-posts">My Posts</Link>}
        </Box>
        <Box>
          <input
            type="text"
            placeholder="Search posts"
            onChange={onSearchChange}
          />
          {!user ? (
            <>
              <Button component={Link} to="/login">
                Login
              </Button>
              <Button component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
