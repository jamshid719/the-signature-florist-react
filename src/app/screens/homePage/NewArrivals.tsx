import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";

const newDishes = [
  {
    productName: "Autumn Solace",
    productPrice: 42,
    imagePath:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500&q=85",
  },
  {
    productName: "Morning Dew",
    productPrice: 38,
    imagePath:
      "https://images.unsplash.com/photo-1487530811015-780780b6c2c1?w=500&q=85",
  },
  {
    productName: "Sunset Bloom",
    productPrice: 55,
    imagePath:
      "https://images.unsplash.com/photo-1470509037663-253d25da7e80?w=500&q=85",
  },
  {
    productName: "Silk Sakura",
    productPrice: 48,
    imagePath:
      "https://images.unsplash.com/photo-1606041011872-596597976b25?w=500&q=85",
  },
];

export default function NewArrivals() {
  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">New Arrivals</Box>
          <Box className="category-desc">
            Fresh from the fields this week. Our latest curation of rare
            seasonal blooms designed to elevate your living space.
          </Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((ele, index) => {
                  return (
                    <Card
                      key={index}
                      variant="outlined"
                      className="card"
                      sx={{
                        flex: "1 1 0 !important",
                        minWidth: "0 !important",
                        p: "0 !important",
                        background: "#ffffff !important",
                        border: "1px solid #e8e4e0 !important",
                        borderRadius: "16px !important",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06) !important",
                        overflow: "hidden !important",
                        cursor: "pointer",
                        display: "flex !important",
                        flexDirection: "column !important",
                        transition:
                          "box-shadow 0.25s ease, transform 0.25s ease",
                        "&:hover": {
                          boxShadow: "0 8px 28px rgba(0,0,0,0.1) !important",
                          transform: "translateY(-4px)",
                          border: "1px solid #e8e4e0 !important",
                        },
                      }}
                    >
                      {/* ── Image + NEW badge ───────────────────── */}
                      <CardOverflow
                        sx={{
                          position: "relative !important",
                          p: "12px 12px 0px !important",
                          m: "0 !important",
                          background: "#ffffff !important",
                          border: "none !important",
                          "--CardOverflow-radius": "0px",
                          "--CardOverflow-offset": "0px",
                        }}
                      >
                        <div className="product-sale">NEW</div>

                        <AspectRatio
                          ratio="1"
                          className="card-aspect"
                          sx={{
                            borderRadius: "10px !important",
                            overflow: "hidden !important",
                            "--AspectRatio-radius": "10px",
                          }}
                        >
                          <img src={ele.imagePath} alt={ele.productName} />
                        </AspectRatio>
                      </CardOverflow>

                      {/* ── Product info ────────────────────────── */}
                      <CardOverflow
                        variant="soft"
                        className="product-detail"
                        sx={{
                          p: "14px 16px 16px !important",
                          m: "0 !important",
                          background: "#ffffff !important",
                          border: "none !important",
                          flex: "1 !important",
                          "--CardOverflow-radius": "0px",
                          "--CardOverflow-offset": "0px",
                        }}
                      >
                        <Stack className="info">
                          <Typography className="title">
                            {ele.productName}
                          </Typography>
                          <Typography className="price">
                            ${ele.productPrice.toFixed(2)}
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
