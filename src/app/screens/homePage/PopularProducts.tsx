import React, { useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import {
  CssVarsProvider,
  Card,
  CardCover,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutLinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

const list = [
  {
    productName: "Lavash",
    productDesc: "Roses, Lilies, Eucalyptus",
    productPrice: "$85",
    imagePath: "/img/lavash.webp",
  },
  {
    productName: "Cutlet",
    productDesc: "Dahlia, Orchids, Ruscus",
    productPrice: "$120",
    imagePath: "/img/cutlet.webp",
  },
  {
    productName: "Kebab",
    productDesc: "Tulips, Hydrangea, Daisy",
    productPrice: "$65",
    imagePath: "/img/kebab.webp",
  },
  {
    productName: "Kebab",
    productDesc: "Roses, Lilies, Eucalyptus",
    imagePath: "/img/kebab-fresh.webp",
  },
];

export default function PopularProducts() {
  //Like-mantigi:
  const [wishlist, setWishlist] = useState<number[]>([]);
  return (
    <div className="popular-products-frame">
      <Container>
        <Stack className="popular-section">
          <Stack className="section-header">
            <Stack flexDirection={"column"} gap={"6px"}>
              <Box className="section-label">Curated Selection</Box>
              <Box className="category-title">Popular Arrangements</Box>
            </Stack>
            <Box className="view-all-link">
              View All Popular
              <ArrowForwardIcon className="view-all-arrow" />
            </Box>
          </Stack>

          {/* ── Cards Frame ─────────────────────────────────────────── */}
          <Stack className="cards-frame">
            {list.length !== 0 ? (
              list.map((ele, index) => {
                return (
                  <CssVarsProvider key={index}>
                    <Card className="card">
                      {/* Full image */}
                      <CardCover className="card-cover">
                        <img src={ele.imagePath} alt="" />
                      </CardCover>

                      {/* Heart wishlist btn — top right */}
                      <CardContent className="card-content">
                        <Box
                          className={`wishlist-btn${wishlist.includes(index) ? " active" : ""}`}
                          onClick={() =>
                            setWishlist((prev) =>
                              prev.includes(index)
                                ? prev.filter((i) => i !== index)
                                : [...prev, index],
                            )
                          }
                        >
                          {wishlist.includes(index) ? (
                            <FavoriteIcon className="heart-icon filled" />
                          ) : (
                            <FavoriteBorderIcon className="heart-icon" />
                          )}
                        </Box>
                      </CardContent>

                      {/* Name / ingredients / price */}
                      <CardOverflow className="card-overflow">
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"flex-start"}
                        >
                          <Stack flexDirection={"column"} gap={"3px"}>
                            <Typography className="product-name">
                              {ele.productName}
                            </Typography>
                            <Typography className="product-ingredients">
                              {ele.productDesc}
                            </Typography>
                          </Stack>
                          <Typography className="product-price">
                            ${ele.productPrice}
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">
                Popular arrangements are not available!
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
