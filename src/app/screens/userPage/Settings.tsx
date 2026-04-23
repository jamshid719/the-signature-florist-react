import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";

export function Settings() {
  return (
    <Box className={"settings"}>
      {/* ── Image Upload ── */}
      <Box className={"member-media-frame"}>
        <img src={"/img/default-user.png"} className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <div className={"up-del-box"}>
            <Button component="label" className={"upload-btn"}>
              <CloudDownloadIcon />
              <input
                type="file"
                hidden
                accept="image/jpg,image/jpeg,image/png"
              />
            </Button>
            <p>JPG, JPEG, PNG formats only!</p>
          </div>
        </div>
      </Box>

      {/* ── Username ── */}
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={"Martin"}
            defaultValue={"Martin"}
            name="memberNick"
          />
        </div>
      </Box>

      {/* ── Phone + Address ── */}
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={"no phone"}
            defaultValue={"821024694424"}
            name="memberPhone"
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input mb-address"}
            type="text"
            placeholder={"no address"}
            defaultValue={"no address"}
            name="memberAddress"
          />
        </div>
      </Box>

      {/* ── Description ── */}
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={"no description"}
            defaultValue={"no description"}
            name="memberDesc"
          />
        </div>
      </Box>

      {/* ── Save ── */}
      <Box className={"save-box"}>
        <Button variant={"contained"} className={"save-btn"}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
