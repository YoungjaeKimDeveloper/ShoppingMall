import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
// Pages
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
const App = () => {
  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
