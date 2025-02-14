import { Box, IconButton, styled } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ZoomActions = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: 20,
  top: 20,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  button: {
    borderRadius: "4px",
    backgroundColor: "white",
    padding: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
}));

const ZoomControls = ({ onChangeZoom }) => {
  const handleZoomIn = () => {
    onChangeZoom((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    onChangeZoom((prev) => Math.max(prev - 0.2, 0.4));
  };

  return (
    <ZoomActions>
      <IconButton onClick={handleZoomIn} size="small">
        <AddBoxIcon />
      </IconButton>
      <IconButton onClick={handleZoomOut} size="small">
        <RemoveIcon />
      </IconButton>
    </ZoomActions>
  );
};

export default ZoomControls;
