import React from "react";
import { Container, Box, Stack } from "@mui/material";

export default function Advertisement() {
  return (
    <div className="ads-frame">
      <Container>
        <Stack className="ads-section">
          {/* ── Header ─────────────────────────────────────────── */}
          <Stack className="ads-header">
            <Box className="ads-label">Our Craft</Box>
            <Box className="ads-title">The Art of Botanical Storytelling</Box>
          </Stack>

          {/* ── Video wrapper ───────────────────────────────────── */}
          <Box className="ads-video-wrap">
            <video
              className="ads-video"
              autoPlay={true}
              loop
              muted
              playsInline
              data-video-media=""
            >
              <source type="video/mp4" src="video/Florist-ads.mp4" />
            </video>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
