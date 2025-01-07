// /src/App.tsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyPosts from "./pages/MyPosts";
import Login from "./components/Login";
import Signup from "./components/Singup";
import { UserProvider } from "./contexts/UserContext";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <UserProvider>
      <Router>
        <Navbar onSearchChange={handleSearchChange} />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
