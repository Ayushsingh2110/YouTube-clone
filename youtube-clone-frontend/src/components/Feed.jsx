import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./"; // './' means parent folder
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = ({ videos, selectedCategory, setShowSidebar }) => {
  //setShowSidebar(true);
  return (
    <Box py={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Videos videos={videos} />
    </Box>
  );
};

export default Feed;
