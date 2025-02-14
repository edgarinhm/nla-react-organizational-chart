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

  const onSaveEmployeeClick = (node) => { };
  const onAddEmployeeClick = (node) => { };

  const onSaveClick = (node) => { };

  const onCheckCard = (node) => { };

  return {
    onAddClick,
    onDeleteClick,
    onSaveClick,
    onCheckCard,
    onSaveEmployeeClick,
    onAddEmployeeClick,
  };
};
