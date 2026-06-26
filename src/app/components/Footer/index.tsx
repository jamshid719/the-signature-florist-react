import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  const authMember = null;

  return (
    <div className="footer-wrapper">
      <Container>
        <Stack
          flexDirection={{ xs: "column", md: "row" }}
          sx={{ mt: { xs: "40px", md: "94px" } }}
        >
          {/* Brand */}
          <Stack flexDirection={"column"} sx={{ width: { xs: "100%", md: "300px" } }}>
            <div className="footer-logo">The Signature Florist</div>
            <div className="footer-desc-txt">
              Daegu, Buk-gu, <br />
              Flower District, 엑스코로 10
              <br />
              <br />
              hello@signatureflorist.com
              <br />
              +82 (053) 012-3456
            </div>
            <div className="sns-context">
              <a href="#" aria-label="Share">
                <svg viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Website">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            </div>
          </Stack>

          {/* Nav columns */}
          <Stack
            sx={{ ml: { xs: 0, md: "120px" }, mt: { xs: "32px", md: 0 } }}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: "32px", md: "100px" }}
          >
            {/* Explore */}
            <Stack>
              <Box>
                <div className="foot-category-title">Explore</div>
                <div className="foot-category-link">
                  <Link to="/" className="active">
                    Home
                  </Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                  <Link to="/cart">Cart</Link>
                </div>
              </Box>
            </Stack>

            {/* Legal */}
            <Stack>
              <Box>
                <div className="foot-category-title">Legal</div>
                <div className="foot-category-link">
                  <Link to="/privacy">Privacy Policy</Link>
                  <Link to="/terms">Terms of Service</Link>
                </div>
              </Box>
            </Stack>

            {/* Follow Us */}
            <Stack>
              <Box>
                <div className="foot-category-title">Follow Us</div>
                <p className="newsletter-text">
                  Sign up for our newsletter to receive seasonal bloom updates
                  and care tips.
                </p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Email" />
                  <button aria-label="Subscribe">
                    <svg viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        {/* Divider */}
        <div className="footer-divider" />

        <div className="copyright-txt">
          © 2024 The Signature Florist. All rights reserved.
        </div>
      </Container>
    </div>
  );
}
