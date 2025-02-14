import {
  Box,
  Button,
  FormControl,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AddEmployeeForm = ({ positionId, handleAddEmployee }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <Stack padding={2}>
      <Box paddingY={1}>
        <Typography variant="h6" fontWeight={"bold"}>
          {"Asign Employee"}
        </Typography>
      </Box>
      <Paper component={"form"} elevation={2}>
        <Grid2>
          <Grid2 container spacing={1} padding={2}>
            <FormControl>
              <TextField
                placeholder="Jhon"
                label={"Firstname"}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <TextField
                placeholder="Doe"
                label={"Lastname"}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </FormControl>
          </Grid2>
          <Box padding={2} display="flex" justifyContent={"flex-end"}>
            <Button
              variant="contained"
              onClick={() =>
                handleAddEmployee({ firstName, lastName, positionId })
              }
            >
              {"Add"}
            </Button>
          </Box>
        </Grid2>
      </Paper>
    </Stack>
  );
};

export default AddEmployeeForm;
