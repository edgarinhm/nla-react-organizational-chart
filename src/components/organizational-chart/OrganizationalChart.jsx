import { useEffect, useState } from "react";
import { GetTiersList } from "../../common/functions/org-chart-functions";
import D3TreeOrgChart from "./d3-tree-org-chart/D3TreeOrgChart";
import { OrganizationalData } from "../../common/mock/organizational-data";
import { Box } from "@mui/material";
import TierList from "./TierList";
import ZoomControls from "../../common/components/org-chart/ZoomControls";

const OrganizationalChart = () => {
  const chartData = {
    name: "New position",
    attributes: {
      employees: "0 employees",
      tier: "tier 1",
    },
    children: [],
  };

  const [treeData, setTreeData] = useState(chartData);
  const [nodeTiers, setNodeTiers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(1);

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
      <TierList tiers={nodeTiers} />
      <ZoomControls  onChangeZoom={(value) => setZoom(value)} />
      {!isLoading && <D3TreeOrgChart treeData={treeData}  zoom={zoom}/>}
    </Box>
  );
};

export default OrganizationalChart;
