import { CircularProgress } from "@mui/material";

const Loader = ({ fullHeight = true }) => {
  const height = fullHeight ? "100vh" : "100%";
  return (
    <div className="loader" style={{ height }}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
