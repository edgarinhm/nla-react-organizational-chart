import { Checkbox, IconButton, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

// Styled components for the org chart
const ChartNode = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  position: "relative",
  backgroundColor: "#fff",
  "& .close-button": {
    position: "absolute",
    top: 2,
    right: 2,
    padding: 4,
  },
  h6: {
    textAlign: "center",
    padding: "0 1rem",
  },
  "& .node-card-checkbox": {
    position: "absolute",
    top: 2,
    left: 2,
    padding: 4,
  },
}));

const AddButton = styled(IconButton)({
  position: "absolute",
  bottom: "-45px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#fff",
  border: "2px solid #999",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

const ChartCard = ({ nodeDatum, onAddClick, onCloseClick }) => {
  const employees = nodeDatum.attributes?.employees?.split(" ")[0].split("/");
  return (
    <g>
      <foreignObject x="-100" y="-50" width="200" height="300">
        <ChartNode elevation={1}>
          <Checkbox color="default" className="node-card-checkbox" />
          <IconButton
            className="close-button"
            size="small"
            onClick={() => onCloseClick(nodeDatum)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Stack marginTop={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              {nodeDatum.name}
            </Typography>
            <Box
              marginTop={0.5}
              display="flex"
              flexDirection="column"
              textAlign="start"
            >
              <Typography variant="caption" fontSize="0.5rem">
                {"Openings"}
              </Typography>

              <Typography
                variant="caption"
                color={employees[0] !== employees[1] ? "error" : "inherit"}
                sx={{ textDecoration: "underline" }}
              >
                {nodeDatum.attributes?.employees}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ mt: 1 }} textAlign="center">
              {nodeDatum.attributes?.department}
            </Typography>
            <AddButton size="small" onClick={() => onAddClick(nodeDatum)}>
              <AddIcon />
            </AddButton>
          </Stack>
        </ChartNode>
      </foreignObject>
    </g>
  );
};

export default ChartCard;
