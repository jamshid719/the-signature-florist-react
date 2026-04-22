import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";

const products = [
  {
    productName: "Bouquet of Red & Yellow Tulips",
    imagePath: "/img/OnSale_florals.jpg",
    price: 62,
    oldPrice: null,
    sale: false,
  },
  {
    productName: "Bouquet of Red Tulips with Green Vase",
    imagePath: "/img/tulip-red.webp",
    price: 62,
    oldPrice: null,
    sale: false,
  },
  {
    productName: "Bright bouquet of beauty peonies",
    imagePath: "/img/peony.webp",
    price: 45,
    oldPrice: 50,
    sale: true,
  },
  {
    productName: "Easter Basket with White Flower",
    imagePath: "/img/OnSale_florals.jpg",
    price: 72,
    oldPrice: 79,
    sale: true,
  },
  {
    productName: "Pink Rose with Glass Vase",
    imagePath: "/img/rose-pink.webp",
    price: 32,
    oldPrice: 50,
    sale: true,
  },
  {
    productName: "Pink Tulips with Classic Vase",
    imagePath: "/img/tulip-classic.webp",
    price: 57,
    oldPrice: 60,
    sale: true,
  },
  {
    productName: "Pink Tulips with Glass Vase",
    imagePath: "/img/tulip-glass.webp",
    price: 55,
    oldPrice: 65,
    sale: true,
  },
  {
    productName: "Pink Tulips with White Vase",
    imagePath: "/img/tulip-white.webp",
    price: 40,
    oldPrice: 42,
    sale: true,
  },
];

const circleCategories = [
  { label: "All Product", imagePath: "/img/OnSale_florals.jpg" },
  { label: "Tulips", imagePath: "/img/OnSale_florals.jpg" },
  { label: "Rose", imagePath: "/img/cat-rose.webp" },
  { label: "Bouquet", imagePath: "/img/cat-bouquet.webp" },
  { label: "Hampers", imagePath: "/img/cat-hampers.webp" },
  { label: "Collections", imagePath: "/img/cat-collections.webp" },
];

export default function Products() {
  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          {/* ── Title + Search ── */}
          <Stack
            className={"avatar-big-box"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography className="top-text">Shop</Typography>
            <Stack className="search-input-btn" flexDirection={"row"}>
              <input
                type="search"
                className="single-search-input"
                name="singleResearch"
                placeholder="Find product"
                value=""
              />
              <button className="search-btn-icon">
                <SearchIcon sx={{ fontSize: 20 }} />
              </button>
            </Stack>
          </Stack>

          {/* ── Circle Category Filter ── */}
          <Stack className={"dishes-filter-section"}>
            <Stack
              className={"dishes-filter-box"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              {circleCategories.map((cat, index) => (
                <button
                  key={index}
                  className={`circle-category-btn${index === 0 ? " active-cat" : ""}`}
                >
                  <div className="circle-img-wrap">
                    <img src={cat.imagePath} alt={cat.label} />
                    <div className="circle-overlay">
                      <span>{cat.label}</span>
                    </div>
                  </div>
                </button>
              ))}
            </Stack>
          </Stack>

          {/* ── Sort + Filter + Products ── */}
          <Stack
            className={"list-category-section"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            {/* Sort + Filter row */}
            <div className="sort-filter-row">
              <button className="filter-btn active-filter">Bouquet</button>
              <button className="filter-btn">Vase</button>
              <button className="filter-btn">Houseplant</button>
              <button className="filter-btn">Tree</button>
              <button className="filter-btn">Other</button>
              <select className="sort-select">
                <option>Default sorting</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
                <option>Sort by newest</option>
              </select>
            </div>

            {/* Product grid */}
            <div className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => (
                  <Stack key={index} className={"product-card"}>
                    <Stack
                      className={"product-img"}
                      sx={{ backgroundImage: `url(${product.imagePath})` }}
                    >
                      {product.sale && (
                        <div className={"product-size"}>Size</div>
                      )}
                      <Button className={"shop-btn"} />
                      <Button className={"view-btn"} sx={{ right: "36px" }} />
                    </Stack>
                    <Box className={"product-desc"}>
                      <span className="product-title">
                        {product.productName}
                      </span>
                      <div className={"product-price"}>
                        <span>${product.price}.00</span>
                      </div>
                      <button className="add-to-cart-btn">Add to cart</button>
                    </Box>
                  </Stack>
                ))
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </div>
          </Stack>

          {/* ── Pagination ── */}
          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      {/* ── Discount Banner ── */}
      <div className={"discount-banner"}>
        <Container>
          <Stack alignItems={"center"}>
            <div className={"discount-banner-inner"}>
              <img
                className={"discount-banner-bg"}
                src={"/img/banner-leaf.jpg"}
                alt="banner"
              />
              <div className={"discount-banner-content"}>
                <Typography className={"discount-title"}>
                  Discount up to 30% for your first purchase.
                </Typography>
                <Typography className={"discount-desc"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar leo.
                </Typography>
                <button className={"discount-shop-btn"}>Shop Now</button>
              </div>
            </div>
          </Stack>
        </Container>
      </div>

      {/* ── Address ── */}

      <Container disableGutters>
        <Stack className={"address-area"}>
          <Box className={"address-title"}>Our address</Box>
          <div className={"map-wrapper"}>
            <iframe
              style={{ marginTop: "0px", marginBottom: "0px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25859.219637661423!2d128.60129279999998!3d35.88815774999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e1aa3b33a607%3A0xca08be7329f6a0ca!2sEXCO!5e0!3m2!1sen!2skr!4v1771668833177!5m2!1sen!2skr"
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="500"
            ></iframe>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
