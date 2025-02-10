import { useEffect, useState } from "react";
import { GetTiersList } from "../../common/functions/org-chart-functions";
import D3TreeOrgChart from "./d3-tree-org-chart/D3TreeOrgChart";
import { OrganizationalData } from "../../common/mock/organizational-data";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import TierList from "./TierList";
import ZoomControls from "../../common/components/org-chart/ZoomControls";
import { GetDivisions } from "../../common/components/divisions-service";

const OrganizationalChart = () => {
  const chartData = {
    name: "New position",
    attributes: {
      employees: "0 employees",
      tier: "tier 1",
    },
    children: [],
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [divisions, setDivisions] = useState();
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
            "sorry, the request was not proccesed, please try again."
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
          />
        )}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert
          onClose={() => setErrorMessage("")}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default OrganizationalChart;
