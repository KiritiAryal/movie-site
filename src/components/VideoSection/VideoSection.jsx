import { Box, Card, CardMedia } from "@mui/material";
import React from "react";
import "./VideoSection.css";

const VideoSection = ({ videoKey }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ height: "60vh", width: "50vw", display: "flex" }}>
        <iframe
          className="aspect-ratio"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          title="YouTube video"
          allowFullScreen
        ></iframe>
      </Card>
    </Box>
  );
};

export default VideoSection;
