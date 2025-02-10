import { CreatePosition } from "../../common/components/positions-service";

export const useChartApi = () => {
  const onAddClick = async (position) => {
    console.log('position', position);
    
    //return await CreatePosition(position);
  };

  const onDeleteClick = (node) => {};

  const onSaveClick = (node) => {};

  const onSelectDivision = (node) => {};

  const onCheckCard = (node) => {};

  return {
    onAddClick,
    onDeleteClick,
    onSaveClick,
    onSelectDivision,
    onCheckCard,
  };
};
