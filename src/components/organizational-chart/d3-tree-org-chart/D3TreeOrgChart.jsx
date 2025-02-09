import { useCallback, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChartRootCard from "../ChartRootCard";
import ChartCard from "../ChartCard";
import { GetTiersList } from "../../../common/functions/org-chart-functions";
import { useCenteredTopTree } from "../../../common/hooks/use-chart";

import { OrganizationalData } from "../../../common/mock/organizational-data";
import TierList from "../TierList";
import D3TreeNode from "./D3TreeNode";

const ZoomControls = styled(Box)(({ theme }) => ({
    position: "absolute",
    right: 20,
    top: 20,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    button: {
      borderRadius: "4px",
      backgroundColor: "white",
      padding: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
  }));

const D3TreeOrgChart = () => {
    const chartData = {
        name: "New position",
        attributes: {
          employees: "0 employees",
          tier: "tier 1",
        },
        children: [],
      };
    
      const [treeData, setTreeData] = useState(chartData);
    
      const [isLoading, setIsLoading] = useState(false);
    
      const [zoom, setZoom] = useState(1);
      const nodeSize = { x: 200, y: 280 };
      const separation = { siblings: 1.5, nonSiblings: 2.5 };
      const foreignObjectProps = {
        width: nodeSize.x,
        height: 300,
        x: -100,
        y: -50,
      };
    
      const [nodeTiers, setNodeTiers] = useState(0);
    
      const [translate, containerRef] = useCenteredTopTree({ x: 0, y: 60 });
    
      const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.2, 2));
      };
    
      const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.2, 0.4));
      };
    
      const handleAddClick = useCallback((node) => {
        console.log("Add clicked for node:", node);
      }, []);
    
      const handleDeleteClick = useCallback((node) => {
        console.log("Delete clicked for node:", node);
      }, []);
    
      const handleSaveClick = useCallback((node) => {
        console.log("Save clicked for node:", node);
      }, []);
    
      const renderCustomNode = useCallback(
        (props) => {
          const depth = props.hierarchyPointNode?.depth;
          const nodeProps = {
            ...props,
            onAddClick: handleAddClick,
            onDeleteClick: handleDeleteClick,
          };
          return depth === 0 ? (
            <ChartRootCard {...nodeProps} />
          ) : (
            <D3TreeNode {...nodeProps} />
          );
        },
        [handleAddClick, handleDeleteClick]
      );
    
      useEffect(() => {
        const loadChartData = async () => {
          setIsLoading(true);
          try {
            const chartData = await Promise.resolve(OrganizationalData);
            setTreeData((state) => {
              state.children = [chartData];
              return state;
            });
            setNodeTiers(GetTiersList(chartData));
          } catch (error) {
            console.error("error", error);
          } finally {
            setIsLoading(false);
          }
        };
        loadChartData();
      }, []);
    
      return (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#f5f5f5",
            position: "relative",
          }}
        >
          {!isLoading && (
            <>
              <TierList tiers={nodeTiers} />
              <ZoomControls>
                <IconButton onClick={handleZoomIn} size="small">
                  <AddBoxIcon />
                </IconButton>
                <IconButton onClick={handleZoomOut} size="small">
                  <RemoveIcon />
                </IconButton>
              </ZoomControls>
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
            </>
          )}
        </Box>
      );
}

export default D3TreeOrgChart