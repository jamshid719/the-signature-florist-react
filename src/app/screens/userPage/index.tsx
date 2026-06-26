import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import "../../../css/userPage.css";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobal";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) {
    history.push("/");
    return null;
  }

  return (
    <div className={"user-page"}>
      <Container>
        <Stack
          className={"my-page-frame"}
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={"flex-start"}
          gap={"24px"}
        >
          {/* ── LEFT ── */}
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          {/* ── RIGHT ── */}
          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <div className={"order-user-img"}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember?.memberImage}`
                        : "/img/default-user.png"
                    }
                    className={"order-user-avatar"}
                    alt="avatar"
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={
                        authMember?.memberType === MemberType.SHOP
                          ? "/img/florist_badge.png"
                          : "/icons/user-badge.svg"
                      }
                      alt="badge"
                    />
                  </div>
                </div>
                <span className={"order-user-name"}>
                  {authMember?.memberNick}
                </span>
                <span className={"order-user-prof"}>
                  {authMember?.memberType}
                </span>
                <span className={"order-user-address"}>
                  {authMember?.memberAddress
                    ? authMember?.memberAddress
                    : "no address"}
                </span>
              </Box>

              <Box className={"user-media-box"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>

              <p className={"user-desc"}>
                {authMember?.memberDesc
                  ? authMember?.memberDesc
                  : "no description"}
              </p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
