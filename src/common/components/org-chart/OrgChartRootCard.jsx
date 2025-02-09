import { useEffect, useState } from "react";
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
import OrgChartCard from "./OrgChartCard";
import { DivisionData } from "../../mock/division-data";

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
}) => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisions, setDivisions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const employeesCount = employees?.split(" ")[0].split("/");

  const handleChange = (event) => {
    setSelectedDivision(event.target.value);
  };

  useEffect(() => {
    const loadDivisionsData = async () => {
      setIsLoading(true);
      try {
        const divisionData = await Promise.resolve(DivisionData);
        setDivisions(divisionData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDivisionsData();
  }, []);

  return (
    <OrgChartCard>
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
          {!isLoading &&
            divisions?.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
        </NativeSelect>
      </Stack>
      <OrgChartCard.Footer
        onSaveClick={onSaveClick}
        onDeleteClick={onDeleteClick}
      />
    </OrgChartCard>
  );
};
