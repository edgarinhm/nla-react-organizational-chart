import { useState } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  InputBase,
  NativeSelect,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import OrgChartCard, { AddButton, ChartNode } from "./OrgChartCard";
import AddIcon from "@mui/icons-material/Add";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  margin: "0 auto",
  width: "150px",
  "& .MuiInputBase-input": {
    maxHeight: "3rem",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: "1rem",
    padding: "2px 26px 2px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export const OrgChartRootCard = ({
  level,
  employees,
  onSaveClick,
  onDeleteClick,
  onCheckCard,
  divisions,
  onSelectDivision,
  onAddClick,
}) => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const employeesCount = employees?.split(" ")[0].split("/");

  const handleChange = (event) => {
    setSelectedDivision(event.target.value);
    onSelectDivision(event.target.value);
  };

  return (
    <ChartNode style={{ border: "0.125rem solid rgba(66,83,241,255)" }}>
      <Box className="node-card-header">
        <Box className="node-card-header-actions">
          <Checkbox
            color="default"
            className="node-card-checkbox"
            onChange={onCheckCard}
          />
          <Avatar className="node-level">{level}</Avatar>
        </Box>
        <Typography variant="h5" fontWeight="bold">
          {"New position"}
        </Typography>
      </Box>
      <Stack className="node-card-body">
        <Box className="node-card-body-description">
          <Typography variant="caption" fontSize="0.5rem">
            {"Openings"}
          </Typography>

          <Typography
            variant="caption"
            color={
              employeesCount[0] !== employeesCount[1] ? "error" : "inherit"
            }
            sx={{ textDecoration: "underline" }}
          >
            {employees}
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
          {divisions?.map((division) => (
            <option key={division.id} value={division.id}>
              {division.name}
            </option>
          ))}
        </NativeSelect>
        <AddButton size="small" onClick={() => onAddClick()}>
          <AddIcon />
        </AddButton>
      </Stack>
      <OrgChartCard.Footer
        onSaveClick={onSaveClick}
        onDeleteClick={onDeleteClick}
      />
    </ChartNode>
  );
};
