import {
  Avatar,
  Checkbox,
  IconButton,
  InputBase,
  NativeSelect,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { DivisionData } from "../../common/mock/division-data";

// Styled components for the org chart
const ChartNode = styled(Paper)(({ theme }) => ({
  border: "0.125rem solid rgba(66,83,241,255)",
  position: "relative",
  backgroundColor: "#fff",
  stroke: "none",
  "& .node-card-body": {
    padding: theme.spacing(1),
  },
  "& .node-level": {
    position: "absolute",
    right: 8,
    padding: 4,
    width: 12,
    height: 12,
    fontSize: "0.625rem",
    backgroundColor: "rgba(236,236,236,255)",
    color: "rgba(180,180,180,255)",
  },
  h6: {
    textAlign: "center",
    padding: "1rem",
  },
  "& .node-card-checkbox": {
    position: "absolute",
    top: 2,
    left: 2,
    padding: 4,
  },

  "& .node-card-actions": {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "rgb(243, 244, 254)",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  "& .node-card-actions:last-child": {
    paddingRight: theme.spacing(1),
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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const ChartRootCard = ({
  nodeDatum,
  onAddClick,
  onDeleteClick,
  onSaveClick,
  hierarchyPointNode,
  foreignObjectProps,
}) => {
  const employees = nodeDatum.attributes?.employees?.split(" ")[0].split("/");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisions, setDivisions] = useState(DivisionData);
  const handleChange = (event) => {
    setSelectedDivision(event.target.value);
  };
  return (
    <g>
      <foreignObject {...foreignObjectProps}>
        <ChartNode elevation={3}>
          <Stack className="node-card-body">
            <Checkbox color="default" className="node-card-checkbox" />
            <Avatar className="node-level">
              {hierarchyPointNode.depth + 1}
            </Avatar>
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
              <NativeSelect
                id="demo-customized-select-native"
                value={selectedDivision}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                {!selectedDivision && (
                  <option aria-label="None" value={""}>
                    {"Division..."}
                  </option>
                )}
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </NativeSelect>
              <AddButton size="small" onClick={() => onAddClick(nodeDatum)}>
                <AddIcon />
              </AddButton>
            </Stack>
          </Stack>
          <Box className="node-card-actions">
            <IconButton size="small" onClick={() => onSaveClick(nodeDatum)}>
              <SaveIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDeleteClick(nodeDatum)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </ChartNode>
      </foreignObject>
    </g>
  );
};

export default ChartRootCard;
