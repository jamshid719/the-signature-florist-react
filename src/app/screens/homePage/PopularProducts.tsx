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

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SELECTOR */

const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts }),
);

export default function PopularProducts() {
  //Retriever
  const { popularProducts } = useSelector(popularProductsRetriever);
  console.log("popularProducts:", popularProducts);

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
            {popularProducts.length !== 0 ? (
              popularProducts.map((product: Product, index) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className="card">
                      {/* Full image */}
                      <CardCover className="card-cover">
                        <img src={imagePath} alt="" />
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

                        <Typography
                          sx={{
                            fontWeight: "md",
                            color: "rgba(255, 255, 255, 0.9)",
                            alignItems: "center",
                            display: "flex",
                            marginTop: "290px",
                            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                          }}
                        >
                          {product.productViews}
                          <VisibilityIcon
                            sx={{ fontSize: 30, marginLeft: "5px" }}
                          />
                        </Typography>
                      </CardContent>
                      {/* Name / ingredients / price */}
                      <CardOverflow className="card-overflow">
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"flex-start"}
                          sx={{ width: "100%", gap: "8px" }}
                        >
                          <Stack
                            flexDirection={"column"}
                            gap={"3px"}
                            sx={{ minWidth: 0, flex: 1 }}
                          >
                            <Typography className="product-name">
                              {product.productName}
                            </Typography>
                            <span className="product-size">
                              {product.productCollection ===
                              ProductCollection.TREE
                                ? product.productVolume
                                    ?.split(" ")
                                    .map(
                                      (word, index) =>
                                        index === 0
                                          ? word // "3" — o'zgarmaydi
                                          : word.charAt(0).toUpperCase() +
                                            word.slice(1).toLowerCase(), // "YEARS" → "Years"
                                    )
                                    .join(" ")
                                : product.productCollection ===
                                    ProductCollection.OTHER
                                  ? product.productItemSize
                                      ?.charAt(0)
                                      .toUpperCase() +
                                    product.productItemSize
                                      ?.slice(1)
                                      .toLowerCase()
                                  : product.productSize
                                      ?.charAt(0)
                                      .toUpperCase() +
                                    product.productSize?.slice(1).toLowerCase()}
                            </span>
                            <Typography
                              className="product-ingredients"
                              startDecorator={<DescriptionOutLinedIcon />}
                              textColor="neutral.300"
                            >
                              {product.productDesc}
                            </Typography>
                          </Stack>
                          <Typography
                            className="product-price"
                            sx={{ flexShrink: 0 }}
                          >
                            ${product.productPrice}
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
