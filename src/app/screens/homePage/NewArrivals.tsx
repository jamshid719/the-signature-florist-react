import React from "react";
import { Box, Container, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutLinedIcon from "@mui/icons-material/DescriptionOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import { retrieveNewProducts, retrievePopularProducts } from "./selector";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SELECTOR */

const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({ newProducts }),
);

export default function NewArrivals() {
  //Retriever
  const { newProducts } = useSelector(newProductsRetriever);
  console.log("newProducts:", newProducts);

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
              {newProducts.length !== 0 ? (
                newProducts.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Card
                      key={product._id}
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
                        <div className="product-sale">
                          {product.productCollection === ProductCollection.TREE
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
                                product.productItemSize?.slice(1).toLowerCase()
                              : product.productSize?.charAt(0).toUpperCase() +
                                product.productSize?.slice(1).toLowerCase()}
                        </div>

                        <AspectRatio
                          ratio="1"
                          className="card-aspect"
                          sx={{
                            borderRadius: "10px !important",
                            overflow: "hidden !important",
                            "--AspectRatio-radius": "10px",
                          }}
                        >
                          <img src={imagePath} alt="" />
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: "8px",
                              right: "8px",
                              display: "flex",
                              alignItems: "center",
                              color: "rgba(255,255,255,0.9)",
                              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                              fontWeight: "bold",
                              fontSize: "14px",
                              gap: "4px",
                            }}
                          >
                            {product.productViews}
                            <VisibilityIcon
                              sx={{ fontSize: 30, marginLeft: "5px" }}
                            />
                          </Box>
                        </AspectRatio>
                      </CardOverflow>

                      {/* ── Product info ────────────────────────── */}
                      <div className="product-detail">
                        <Stack className="info">
                          <Typography className="title">
                            {product.productName}
                          </Typography>
                          <Typography className="price">
                            ${product.productPrice}
                          </Typography>
                        </Stack>
                        <Typography
                          className="product-ingredients"
                          startDecorator={<DescriptionOutLinedIcon />}
                          textColor="neutral.300"
                          mt={1}
                        >
                          {product.productDesc}
                        </Typography>
                      </div>
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
