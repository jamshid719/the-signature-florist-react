import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
/>;

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-icon">
              <AcUnitIcon sx={{ color: "#22a366", fontSize: 30 }} />
            </Box>
            <Box className="service-frame">
              <Box className="service-text">Freshness</Box>
              <Box className="service-text-detail">Fresh from Our Fields</Box>
            </Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />
          <Stack className="static-box">
            <Box
              className="static-icon"
              sx={{ color: "#22a366", fontSize: 30 }}
            >
              <i className="fa-solid fa-box"></i>
            </Box>
            <Box className="service-frame">
              <Box className="service-text">Safety Package</Box>
              <Box className="service-text-detail">Quick Flower Delivery</Box>
            </Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />
          <Stack className="static-box">
            <Box className="static-icon">
              <LocalShippingIcon sx={{ color: "#22a366", fontSize: 30 }} />
            </Box>
            <Box className="service-frame">
              <Box className="service-text">Free Delivery</Box>
              <Box className="service-text-detail">
                On all orders above $100
              </Box>
            </Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />
          <Stack className="static-box">
            <Box className="static-icon">
              <SupportAgentIcon sx={{ color: "#22a366", fontSize: 30 }} />
            </Box>
            <Box className="service-frame">
              <Box className="service-text">Support 24/7</Box>
              <Box className="service-text-detail">100% Secure Checkout</Box>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
