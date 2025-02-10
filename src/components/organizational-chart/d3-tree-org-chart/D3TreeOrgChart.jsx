import { useCallback } from "react";
import Tree from "react-d3-tree";
import { Box } from "@mui/material";
import { useCenteredTopTree } from "../../../common/hooks/use-chart";
import D3TreeNode from "./D3TreeNode";
import { useChartApi } from "../use-chart-api";
import { GetDivisionId } from "../../../common/functions/org-chart-functions";

const D3TreeOrgChart = ({
  treeData,
  zoom,
  divisions,
  selectedDivision,
  onSelectDivision,
  onUpdatedChartData,
}) => {
  const nodeSize = { x: 200, y: 280 };
  const separation = { siblings: 1.5, nonSiblings: 2.5 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: 300,
    x: -100,
    y: -50,
  };

  const [translate, containerRef] = useCenteredTopTree({ x: 0, y: 60 });

  const { onAddClick, onDeleteClick } = useChartApi();

  const handleAddClick = useCallback(
    async (node) => {
      try {
        const position = {
          name: node?.name,
          division: node?.attributes?.department
            ? GetDivisionId(node.attributes.department)
            : selectedDivision,
          parentId: node.__rd3t.depth,
          tier: `Tier ${node.__rd3t.depth + 1}`,
        };
        await onAddClick(position);
        onUpdatedChartData();
      } catch (error) {
        console.error(error);
      }
    },
    [onAddClick, selectedDivision, onUpdatedChartData]
  );

  const handleDeleteClick = useCallback(
    async (node) => {
      try {
        const positionId = node?.attributes?.id;
        if (positionId) {
          await onDeleteClick(positionId);
          onUpdatedChartData();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [onDeleteClick, onUpdatedChartData]
  );

  const handleSaveClick = useCallback((node) => {
    console.log("Save clicked for node:", node);
  }, []);

  const handleSelectedDivision = useCallback(
    (node) => {
      onSelectDivision(node);
    },
    [onSelectDivision]
  );

  const handleCheckCard = useCallback((node) => {
    console.log("Check card for node:", node);
  }, []);

  const renderCustomNode = useCallback(
    (props) => {
      const nodeProps = {
        ...props,
        divisions,
        onAddClick: handleAddClick,
        onDeleteClick: handleDeleteClick,
        onSaveClick: handleSaveClick,
        onSelectDivision: handleSelectedDivision,
        onCheckCard: handleCheckCard,
      };
      return <D3TreeNode {...nodeProps} />;
    },
    [
      divisions,
      handleAddClick,
      handleDeleteClick,
      handleSaveClick,
      handleSelectedDivision,
      handleCheckCard,
    ]
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "calc(100% - 80px)",
        height: "100%",
        marginLeft: "80px",
      }}
    >
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        separation={separation}
        nodeSize={nodeSize}
        translate={translate}
        zoom={zoom}
        zoomable={false}
        collapsible={false}
        renderCustomNodeElement={(rd3tProps) =>
          renderCustomNode({ ...rd3tProps, foreignObjectProps })
        }
      />
    </Box>
  );
};

export default D3TreeOrgChart;
