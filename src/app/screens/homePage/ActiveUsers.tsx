import React from "react";
import { Container, Box, Stack } from "@mui/material";
import {
  CssVarsProvider,
  Card,
  CardOverflow,
  AspectRatio,
  Typography,
} from "@mui/joy";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { Height } from "@mui/icons-material";

/** REDUX SELECTOR */

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  //Retriever
  const { topUsers } = useSelector(topUsersRetriever);
  console.log("topUsers:", topUsers);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="au-main">
          {/* ── Section Header ──────────────────────────────────── */}
          <Stack className="au-section-header">
            <Box className="au-section-label">Master Crafters</Box>
            <Box className="au-category-title">Meet Our Top Customers</Box>
          </Stack>

          {/* ── Cards Frame ─────────────────────────────────────── */}
          <Stack className="au-cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = member.memberImage
                    ? `${serverApi}/${member.memberImage}`
                    : "/img/default-user.png";

                  return (
                    <Card
                      key={member._id}
                      variant="outlined"
                      className="au-card"
                      style={{
                        flex: "0 1 300px",
                        maxWidth: "300px",
                        minWidth: "220px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #ebebeb",
                        borderRadius: "16px",
                        padding: "28px 24px 24px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                        cursor: "pointer",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        transition:
                          "box-shadow 0.25s ease, transform 0.25s ease",
                      }}
                    >
                      {/* ── Avatar + badge ─────────────────────── */}
                      <CardOverflow
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0",
                          margin: "0 0 12px 0",
                          backgroundColor: "transparent",
                          border: "none",
                          width: "100%",
                        }}
                      >
                        <Box
                          style={{
                            position: "relative",
                            width: "138px",
                            height: "138px",
                          }}
                        >
                          <AspectRatio
                            ratio="1"
                            style={{
                              width: "150px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              border: "3px solid #ffffff",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                            }}
                          >
                            <img
                              src={imagePath}
                              alt={member.memberNick}
                              style={{ objectFit: "cover" }}
                            />
                          </AspectRatio>

                          {/* Green verified badge */}
                          <Box
                            style={{
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              width: "26px",
                              height: "26px",
                              backgroundColor: "#ffffff",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CheckCircleRoundedIcon
                              style={{ fontSize: "24px", color: "#3d6b4f" }}
                            />
                          </Box>
                        </Box>
                      </CardOverflow>

                      {/* ── Name ───────────────────────────────── */}
                      <Typography className="au-member-nickname">
                        {member.memberNick}
                      </Typography>

                      {/* ── Specialty ──────────────────────────── */}
                      <Typography className="au-member-specialty">
                        {member.memberDesc ?? `"no description"`}
                      </Typography>

                      {/* ── Rating ─────────────────────────────── */}
                      <Stack
                        className="au-rating-row"
                        flexDirection="row"
                        alignItems="center"
                        gap="4px"
                      >
                        <StarRoundedIcon className="au-star-icon" />
                        <Typography className="au-rating-value">
                          {member.memberPoints}
                        </Typography>
                      </Stack>
                    </Card>
                  );
                })
              ) : (
                <Box className="au-no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
