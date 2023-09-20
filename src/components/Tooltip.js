import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const colors = {
  featured: "#daa520",
  onsite: "#000000",
  hybrid: "#090070",
  remote: "#17bd81",
  urgent: "#f40606",
};

const CustomTooltip = styled(({ className, type, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme,type }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: colors[type],
    fontSize:13,
    fontWeight:300
  },
}));

export default CustomTooltip;
