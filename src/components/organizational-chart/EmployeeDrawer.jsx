import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  Grid2,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { EmployeesData } from "../../common/mock/employees-data";
import { GetPositionEmployees } from "../../common/services/employees-service";
import { useChartApi } from "./use-chart-api";
import Spinner from "../../common/components/spinner/Spinner";
import AddEmployeeForm from "./AddEmployeeForm";
import { Delete } from "@mui/icons-material";

const EmployeeDrawer = ({ open, onClose, positionId, setErrorMessage }) => {
  const [data, setData] = useState(EmployeesData);
  const [isLoading, setIsLoading] = useState(false);
  const [updateTableData, setUpdateTableData] = useState(false);

  const { onAddEmployeeClick, onDeleteEmployeeClick } = useChartApi();

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
      },
      {
        accessorKey: "firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
    ],
    []
  );

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await onDeleteEmployeeClick(employeeId);
      setUpdateTableData((state) => !state);
    } catch (error) {
      error &&
        setErrorMessage(
          "sorry, we could not delete the employee, please try again."
        );
    }
  };

  const table = useMaterialReactTable({
    initialState: { columnVisibility: { id: false } },
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton
          color="error"
          size="small"
          onClick={() => {
            handleDeleteEmployee(row.original.id);
          }}
        >
          <Delete />
        </IconButton>
      </Box>
    ),
  });

  const handleClose = () => {
    onClose();
    setData([]);
  };

  const handleAddEmployee = async (employee) => {
    try {
      await onAddEmployeeClick(employee);
      setUpdateTableData((state) => !state);
    } catch (error) {
      error &&
        setErrorMessage(
          "sorry, we could not save the employee, please try again."
        );
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const loadEmployeesData = async (updateTableData) => {
      setIsLoading(true);
      try {
        const employeeData = await GetPositionEmployees(
          positionId,
          controller.signal
        );
        isMounted && setData(employeeData);
      } catch (error) {
        error &&
          setErrorMessage(
            "sorry, the request was not processed, please try again."
          );
      } finally {
        setIsLoading(false);
      }
      return () => {
        isMounted = updateTableData;
        controller.abort();
      };
    };
    if (open) loadEmployeesData(updateTableData);
  }, [open, positionId, setErrorMessage, updateTableData]);

  return (
    <Drawer open={open} onClose={handleClose} anchor={"right"}>
      <AddEmployeeForm
        positionId={positionId}
        handleAddEmployee={handleAddEmployee}
      />
      <Divider />
      <Stack padding={2}>
        <Box paddingY={1}>
          <Typography variant="h6" fontWeight={"bold"}>
            {"Employee List"}
          </Typography>
        </Box>
        <MaterialReactTable table={table} />
        {isLoading && <Spinner open={isLoading} color="inherit" />}
      </Stack>
    </Drawer>
  );
};

export default EmployeeDrawer;
