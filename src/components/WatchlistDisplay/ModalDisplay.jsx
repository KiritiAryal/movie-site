import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  width: 400,
  bgcolor: "#000000",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function ModalDisplay() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
              border: "10px solid black",
            }}
          >
            <Typography variant="h6" component="h2">
              Clear Watchlist?
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  dispatch(clearList(currentUser?.email));
                  setOpen(false);
                }}
                sx={{ width: "100px" }}
              >
                Submit
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalDisplay;
