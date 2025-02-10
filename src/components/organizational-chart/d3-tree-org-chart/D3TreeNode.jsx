import { useState } from "react";
import { useD3Drag } from "../../../common/hooks/use-d3-drag";
import OrgChartCard from "../../../common/components/org-chart/OrgChartCard";
import { OrgChartRootCard } from "../../../common/components/org-chart/OrgChartRootCard";

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

  const { employees, department, tier } = nodeDatum?.attributes;
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
            title={nodeDatum?.name}
            employees={employees}
            level={depth}
            onCheckCard={()=>onCheckCard(nodeDatum)}
            onAddClick={()=>onAddClick(nodeDatum)}
            onSaveClick={()=>onSaveClick(nodeDatum)}
            onDeleteClick={()=>onDeleteClick(nodeDatum)}
            divisions={divisions}
            onSelectDivision={onSelectDivision}
          />
        ) : (
          <OrgChartCard>
            <OrgChartCard.Header
              title={nodeDatum?.name}
              level={depth}
              onChange={onCheckCard}
            />
            <OrgChartCard.Body
              employees={employees}
              department={department}
              onAddClick={onAddClick}
            />
            <OrgChartCard.Footer onDeleteClick={onDeleteClick} />
          </OrgChartCard>
        )}
      </foreignObject>
    </g>
  );
};

export default D3TreeNode;
