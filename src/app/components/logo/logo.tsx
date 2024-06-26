import PropTypes from "prop-types";
import { forwardRef } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }: { disabledLink: any; sx: any }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 45,
        height: 50,
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      <Image src="/imgclp/logo.png" alt="Banner clp" width={70} height={40} />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link href="/dashboard" sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

Logo.displayName = "Logo";

export default Logo;
