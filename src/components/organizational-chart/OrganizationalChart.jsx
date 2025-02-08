import { useCallback, useState } from "react";
import Tree from "react-d3-tree";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChartCard from "./ChartCard";

import { OrganizationalData } from "../../common/mock/organizational-data";

const ChartContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
});

const TierContainer = styled(Box)({
  display: "flex",
  gap: "40px",
  position: "relative",
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-40px",
    left: "50%",
    height: "40px",
    width: "2px",
    backgroundColor: "#999",
  },
});


const TierLabel = styled(Box)({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  color: "#666",
  paddingLeft: "20px",
});

const OrganizationalChart = () => {
  // Sample tree data structure
  const [treeData] = useState(OrganizationalData);

  const handleAddClick = useCallback((node) => {
    console.log("Add clicked for node:", node);
  }, []);

  const handleCloseClick = useCallback((node) => {
    console.log("Close clicked for node:", node);
  }, []);

  const renderCustomNode = useCallback(
    (props) => (
      <ChartCard
        {...props}
        onAddClick={handleAddClick}
        onCloseClick={handleCloseClick}
      />
    ),
    [handleAddClick, handleCloseClick]
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        renderCustomNodeElement={renderCustomNode}
        separation={{ siblings: 1.5, nonSiblings: 2.5 }}
        translate={{ x: window.innerWidth / 2, y: 100 }}
        nodeSize={{ x: 200, y: 300 }}
        zoomable={true}
        collapsible={false}
      />
    </Box>
  );
};

export default OrganizationalChart;
