import PropTypes from "prop-types";
import { memo, forwardRef } from "react";

import Box from "@mui/material/Box";

import { StyledScrollbar, StyledRootScrollbar } from "./styles";
import { CSSObject } from "@emotion/react";

type Height = CSSObject["height"];
// ----------------------------------------------------------------------

interface ScrollbarProps {
  children: React.ReactNode;
  sx?: { height?: Height | { xs: Height; sm: Height } }; // Ajustamos el tipo de datos para height
}

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>((props, ref) => {
  const { children, sx = {}, ...other } = props; // Asignamos un valor por defecto para 'sx'

  const userAgent = typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (mobile) {
    return (
      <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

Scrollbar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

Scrollbar.displayName = "Scrollbar";

export default memo(Scrollbar);
