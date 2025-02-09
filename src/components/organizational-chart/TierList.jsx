import { Box, IconButton, styled, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useMemo, useState } from "react";

const TierContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: "80px",
  backgroundColor: "rgba(153,153,169,255)",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  "& .tier-label": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #ddd",
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    p: {
      height: "33.33%",
    },
    button: {
      marginBottom: "1rem",
    },
  },
}));

const TierList = ({ tiers }) => {
  const [tiersItems, setTiersItems] = useState([]);

  useEffect(() => {
    setTiersItems(Array(tiers).fill(tiers));
  }, [tiers]);

  return (
    <TierContainer>
      <TierItem tier={"tier 1"} />
      {tiersItems.map((tier, index) => {
        console.log("index", index);
        return <TierItem key={index} tier={`tier ${index + 2}`} />;
      })}
    </TierContainer>
  );
};

const TierItem = ({ tier, onChangeTierLabel }) => {
  const [tierLabel, setTierLabel] = useState(tier);
  const [isEditTierActive, setIsEditTierActive] = useState(false);
  return (
    <Box className="tier-label">
      {isEditTierActive ? (
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          value={tierLabel}
          onChange={(value) => setTierLabel(value)}
          slotProps={{
            input: {
              textOrientation: "sideways",
              writingMode: "sideways-lr",
              textTransform: "uppercase",
            },
          }}
        />
      ) : (
        <Typography
          sx={{
            textOrientation: "sideways",
            writingMode: "sideways-lr",
            textTransform: "uppercase",
          }}
        >
          {tierLabel}
          <IconButton
            onClick={() => setIsEditTierActive((open) => !open)}
            size="small"
          >
            <EditIcon />
          </IconButton>
        </Typography>
      )}
    </Box>
  );
};

export default TierList;
