import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

export const ChartNode = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundColor: "#fff",
  stroke: "none",
  "& .node-card-header": {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  "& .node-card-header-actions": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  "& .node-card-body": {
    padding: theme.spacing(1),
  },
  "& .node-card-body-description": {
    display: "flex",
    flexDirection: "column",
    textAlign: "start",
    marginBottom: "0.5rem",
    paddingLeft: "0.5rem",
  },
  "& .node-card-body-division": {
    textTransform: "uppercase",
  },
  "& .node-level": {
    padding: theme.spacing(0.5),
    width: 12,
    height: 12,
    fontSize: "0.625rem",
    backgroundColor: "rgba(236,236,236,255)",
    color: "rgba(180,180,180,255)",
  },
  h6: {
    textAlign: "center",
    padding: theme.spacing(0.5),
    textTransform: "uppercase",
  },
  "& .node-card-checkbox": {
    padding: 0,
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

export const AddButton = styled(IconButton)({
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

const OrgChartCard = ({ children }) => {
  return <ChartNode elevation={3}>{children}</ChartNode>;
};

const OrgChartCardHeader = ({ title, level, onChange }) => {
  return (
    <Box className="node-card-header">
      <Box className="node-card-header-actions">
        <Checkbox
          color="default"
          className="node-card-checkbox"
          onChange={onChange}
        />
        <Avatar className="node-level">{level}</Avatar>
      </Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

const OrgChartCardBody = ({ employees, department, onAddClick }) => {
  const employeesCount = employees?.split(" ")[0].split("/");
  return (
    <Stack className="node-card-body">
      <Box className="node-card-body-description">
        <Typography variant="caption" fontSize="0.5rem">
          {"Openings"}
        </Typography>
        <Typography
          variant="caption"
          color={employeesCount[0] !== employeesCount[1] ? "error" : "inherit"}
          sx={{ textDecoration: "underline" }}
        >
          {employees}
        </Typography>
      </Box>
      <Typography
        className="node-card-body-division"
        variant="caption"
        textAlign="center"
      >
        {department}
      </Typography>
      <AddButton size="small" onClick={() => onAddClick()}>
        <AddIcon />
      </AddButton>
    </Stack>
  );
};

const OrgChartCardFooter = ({ onSaveClick, onDeleteClick }) => {
  return (
    <Box className="node-card-actions">
      {onSaveClick && (
        <IconButton size="small" onClick={() => onSaveClick()}>
          <SaveIcon fontSize="small" />
        </IconButton>
      )}
      <IconButton size="small" onClick={() => onDeleteClick()}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

OrgChartCard.Header = OrgChartCardHeader;
OrgChartCard.Body = OrgChartCardBody;
OrgChartCard.Footer = OrgChartCardFooter;

export default OrgChartCard;
