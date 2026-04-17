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

interface Member {
  _id: string;
  memberNick: string;
  memberSpecialty: string;
  memberRating: number;
  memberReviews: number;
  memberImage: string;
}

interface ActiveUsersProps {
  topUsers: Member[];
  serverApi: string;
}

const MOCK_USERS: Member[] = [
  {
    _id: "1",
    memberNick: "Julian Vance",
    memberSpecialty: "Orchid Specialist",
    memberRating: 4.9,
    memberReviews: 120,
    memberImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    _id: "2",
    memberNick: "Eleanor Vance",
    memberSpecialty: "Boutique Designer",
    memberRating: 5.0,
    memberReviews: 245,
    memberImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    _id: "3",
    memberNick: "Marcus Thorne",
    memberSpecialty: "Wildflower Expert",
    memberRating: 4.8,
    memberReviews: 89,
    memberImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
  },
  {
    _id: "4",
    memberNick: "Sofia Chen",
    memberSpecialty: "Ikebana Specialist",
    memberRating: 4.9,
    memberReviews: 156,
    memberImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export default function ActiveUsers({
  topUsers = MOCK_USERS,
  serverApi = "",
}: Partial<ActiveUsersProps>) {
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
                  const imagePath = serverApi
                    ? `${serverApi}/${member.memberImage}`
                    : member.memberImage;

                  return (
                    <Card
                      key={member._id}
                      variant="outlined"
                      className="au-card"
                      style={{
                        flex: "1 1 0",
                        minWidth: 0,
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
                            width: "90px",
                            height: "90px",
                          }}
                        >
                          <AspectRatio
                            ratio="1"
                            style={{
                              width: "90px",
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
                        {member.memberSpecialty}
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
                          {member.memberRating.toFixed(1)}
                        </Typography>
                        <Typography className="au-rating-count">
                          ({member.memberReviews} Reviews)
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
