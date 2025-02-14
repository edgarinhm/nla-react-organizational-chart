import { useState } from "react";
import { useD3Drag } from "../../../common/hooks/use-d3-drag";
import OrgChartCard from "../OrgChartCard";
import { OrgChartRootCard } from "../OrgChartRootCard";

const D3TreeNode = ({
  nodeDatum,
  hierarchyPointNode,
  foreignObjectProps,
  x = 0,
  y = 0,
  onSaveClick,
  onDeleteClick,
  onAddClick,
  onCheckCard,
  divisions,
  onSelectDivision,
  onOpenEmployeeDrawer,
}) => {
  let [cacheTransform, setCacheTransform] = useState(`${x} ${y}`);
  let [cursorState, setCursorState] = useState("grab");

  let ref = useD3Drag({
    onDragStart: () => {
      setCursorState("grabbing");
    },
    onDrag: (event) => {
      console.log("onDrag", event);
      setCacheTransform(`${event.x} ${event.y}`);
    },
    onDragEnd: (event) => {
      console.log("onDragEnd", event);
      setCursorState("grab");
    },
  });

  const position = {
    name: nodeDatum?.name,
    id: nodeDatum?.attributes?.id,
    parentId: nodeDatum?.attributes?.parentId,
    employees: nodeDatum?.attributes?.employees,
    department: nodeDatum?.attributes?.department,
    tier: nodeDatum?.attributes?.tier,
  };

  const depth = hierarchyPointNode?.depth;
  if (depth === 0) ref = null;

  return (
    <g
      transform={`translate(${cacheTransform})`}
      ref={ref}
      cursor={cursorState}
    >
      <foreignObject {...foreignObjectProps}>
        {depth === 0 ? (
          <OrgChartRootCard
            position={position}
            level={depth}
            onCheckCard={() => onCheckCard(nodeDatum)}
            onAddClick={(data) => onAddClick(nodeDatum, data)}
            onSaveClick={() => onSaveClick(nodeDatum)}
            onDeleteClick={() => onDeleteClick(nodeDatum)}
            divisions={divisions}
            onSelectDivision={onSelectDivision}
            onOpenEmployeeDrawer={(data) => onOpenEmployeeDrawer(data)}
          />
        ) : (
          <OrgChartCard>
            <OrgChartCard.Header
              title={position?.name}
              level={depth}
              onChange={onCheckCard}
            />
            <OrgChartCard.Body
              position={position}
              parentId={depth}
              onAddClick={() => onAddClick(nodeDatum)}
              onCheckCard={() => onCheckCard(nodeDatum)}
              onOpenEmployeeDrawer={onOpenEmployeeDrawer}
            />
            <OrgChartCard.Footer
              onDeleteClick={() => onDeleteClick(nodeDatum)}
            />
          </OrgChartCard>
        )}
      </foreignObject>
    </g>
  );
};

export default D3TreeNode;
