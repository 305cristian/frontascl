import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon, width = 20, sx, color, ...other }: { icon: any; width: any; sx: any; color: string }, ref) => (
  <Box ref={ref} component={Icon} className="component-iconify" icon={icon} sx={{ width, height: width, ...sx }} style={{ color: color }} {...other} />
));

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  width: PropTypes.number,
};

export default Iconify;
