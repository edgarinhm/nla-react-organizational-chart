import {
  CreatePosition,
  DeletePositionById,
} from "../../common/components/positions-service";

export const useChartApi = () => {
  const onAddClick = async (position) => {
    return await CreatePosition(position);
  };

  const onDeleteClick = async (positionId) => {
    return await DeletePositionById(positionId);
  };

  const onSaveClick = (node) => {};

  const onCheckCard = (node) => {};

  return {
    onAddClick,
    onDeleteClick,
    onSaveClick,
    onCheckCard,
  };
};
