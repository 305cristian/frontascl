import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  title,
  legend,
  icon,
  color = "primary",
  sx,
  ...other
}: {
  title: string;
  legend: string;
  icon: ReactNode;
  color: string;
  sx: any;
}) {
  return (
    <Card
      border={1}
      borderColor="#F4F6F6"
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        "&:hover": {
          /* backgroundColor: "#F4F6F6", */
          fontSize: "37px",
          borderColor: "#EBEDEF",
        },
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="h4"> {title}</Typography>

        <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
          {legend}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
