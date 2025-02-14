import { Drawer } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { EmployeesData } from "../../common/mock/employees-data";
import { GetPositionEmployees } from "../../common/services/employees-service";

const EmployeeDrawer = ({ open, onClose, positionId }) => {
  const [data, setData] = useState(EmployeesData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //should be memoized or stable
  const columns = useMemo(
    () => [
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

  const table = useMaterialReactTable({
    columns,
    data,
  });

  const handleClose = () => {
    onClose();
    setData([]);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const loadEmployeesData = async () => {
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
        isMounted = false;
        controller.abort();
      };
    };
    if (open) loadEmployeesData();
  }, [open, positionId]);

  return (
    <Drawer open={open} onClose={handleClose} anchor={"right"}>
      <MaterialReactTable table={table} />;
    </Drawer>
  );
};

export default EmployeeDrawer;
