import { Alert, Snackbar } from "@mui/material";

const Notification = ({ severity, message, setMessage }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={!!message}
      autoHideDuration={6000}
      onClose={setMessage}
    >
      <Alert
        onClose={setMessage}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
