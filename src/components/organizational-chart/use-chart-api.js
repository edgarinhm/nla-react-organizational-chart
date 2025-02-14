import { CreateEmployee, DeleteEmployeeById } from "../../common/services/employees-service";
import {
  CreatePosition,
  DeletePositionById,
} from "../../common/services/positions-service";

export const useChartApi = () => {
  const onAddClick = async (position) => {
    return await CreatePosition(position);
  };

  const onDeleteClick = async (positionId) => {
    return await DeletePositionById(positionId);
  };

  const onAddEmployeeClick = async (employee) => {
    return await CreateEmployee(employee);
  };

  const onDeleteEmployeeClick = async (employeeId) => {
    return await DeleteEmployeeById(employeeId);
  };

  const onSaveEmployeeClick = (node) => { };

  const onSaveClick = (node) => { };

  const onCheckCard = (node) => { };

  return {
    onAddClick,
    onDeleteClick,
    onSaveClick,
    onCheckCard,
    onSaveEmployeeClick,
    onAddEmployeeClick,
    onDeleteEmployeeClick,
  };
};
