import { useEffect, useState } from "react";
import {
  GetTiersList,
  MapPostionsChartNodes,
} from "../../common/functions/org-chart-functions";
import D3TreeOrgChart from "./d3-tree-org-chart/D3TreeOrgChart";
import { Box } from "@mui/material";
import TierList from "./TierList";
import ZoomControls from "./ZoomControls";
import { GetDivisions } from "../../common/services/divisions-service";
import { GetAllPositions } from "../../common/services/positions-service";
import Notification from "../../common/components/notification/Notification";
import Spinner from "../../common/components/spinner/Spinner";

const OrganizationalChart = () => {
  const initialChartData = {
    name: "New position",
    attributes: {
      employees: "0 employees",
      tier: "tier 1",
    },
    children: [],
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [divisions, setDivisions] = useState();
  const [treeData, setTreeData] = useState(initialChartData);
  const [nodeTiers, setNodeTiers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [selectedDivision, setSelectedDivision] = useState();

  const [updatedChartData, setUpdatedChartData] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const loadChartData = async () => {
      setIsLoading(true);
      try {
        const positions = await GetAllPositions(controller.signal);
        const chartData = MapPostionsChartNodes(positions);
        isMounted &&
          setTreeData((state) => {
            state.children = chartData;
            return state;
          });
        setNodeTiers(GetTiersList(chartData));
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }

      return () => {
        isMounted = false;
        controller.abort();
      };
    };
    loadChartData();
  }, [updatedChartData]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const loadDivisionsData = async () => {
      setIsLoading(true);
      try {
        const divisionData = await GetDivisions(controller.signal);
        isMounted && setDivisions(divisionData);
      } catch (error) {
        error &&
          setErrorMessage(
            "sorry, the request was not processed, please try again."
          );
      } finally {
        setIsLoading(false);
      }
      return () => {
        isMounted = false;
        controller.abort();
      };
    };
    loadDivisionsData();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          position: "relative",
        }}
      >
        <TierList tiers={nodeTiers} />
        <ZoomControls onChangeZoom={(value) => setZoom(value)} />
        {!isLoading && (
          <D3TreeOrgChart
            treeData={treeData}
            zoom={zoom}
            divisions={divisions}
            onSelectDivision={(division) => setSelectedDivision(division)}
            selectedDivision={selectedDivision}
            onUpdatedChartData={() => setUpdatedChartData((state) => !state)}
          />
        )}
      </Box>
      <Notification
        severity={"warning"}
        message={errorMessage}
        setMessage={() => setErrorMessage("")}
      />
      {isLoading && <Spinner open={isLoading} color="inherit" />}
    </>
  );
};

export default OrganizationalChart;
