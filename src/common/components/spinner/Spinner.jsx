import { Backdrop, CircularProgress } from "@mui/material";

const Spinner = ({ open, color }) => {
  return (
    <>
      {open && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress color={color} />
        </Backdrop>
      )}
    </>
  );
};

export default Spinner;
