import React from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ChosenProduct() {
  const product = {
    title: "Bright bouquet of beauty peonies",
    oldPrice: 50,
    newPrice: 45,
    desc: "Letius ultricies sociosqu lectus praesent ut. Magnis accumsan justo turpis nascetur consectetur feugiat hac. Tortor efficitur non aenean lacus vivamus habitant class platea conubia scelerisque laoreet.",
  };

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {["/img/cutlet.webp", "/img/kebab-fresh.webp"].map(
              (ele: string, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <img className="slider-image" src={ele} />
                  </SwiperSlide>
                );
              },
            )}
          </Swiper>
        </Stack>
        <div className={"product-detail"}>
          <Container>
            <Stack alignItems={"flex-start"}>
              <div className={"product-detail-card"}>
                {/* Title */}
                <Typography className={"product-detail-title"}>
                  {product.title}
                </Typography>

                {/* Price */}
                <Stack
                  className={"product-detail-price"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <span className={"product-detail-new-price"}>
                    ${product.newPrice}.00
                  </span>
                </Stack>

                {/* Divider */}
                <div className={"product-detail-divider"} />

                {/* Description */}
                <Typography className={"product-detail-desc"}>
                  {product.desc}
                </Typography>

                {/* Actions */}
                <Stack
                  className={"product-detail-actions"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  {/* Add to cart */}
                  <button className={"product-detail-cart-btn"}>
                    Add to cart
                  </button>
                  {/* Add to wishlist */}
                  <button
                    className={"product-detail-cart-btn"}
                    style={{
                      backgroundColor: "#eb7661",
                      marginRight: "100px",
                      padding: "0 20px",
                    }}
                  >
                    Add to Wishlist
                  </button>
                  {/* View icon button */}
                  <Box
                    className={"product-detail-view-btn"}
                    component={"button"}
                  >
                    <RemoveRedEyeIcon sx={{ fontSize: 20 }} />
                  </Box>
                </Stack>
              </div>
            </Stack>
          </Container>
        </div>
      </Container>
    </div>
  );
}
