import { Box, Drawer, Avatar, Typography } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";
import { Account } from "@/app/_mock/account";
import { alpha } from "@mui/material/styles";
import { NAV } from "@/app/layout/config-layout";
import { useResponsive } from "@/hooks/use-responsive";

//-----------------------------------------------------------
interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }: ItemType) => {
  //const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const account = Account();

  const upLg = useResponsive("up", "lg");

  const sidebarWidth = NAV.WIDTH;

  if (upLg) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: "border-box",
              border: "0",
              boxShadow: "rgba(113, 122, 131, 0.11) 0px 7px 30px 0px",
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
            py={2}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={2} p={3}>
              <Logo />
            </Box>

            {/* ------------------------------------------- */}
            {/* Avatar */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: "flex",
                borderRadius: 3,
                alignItems: "center",
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <Avatar src={account.photoURL} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">{account.displayName}</Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {account.role}
                </Typography>
              </Box>
            </Box>

            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <Box mt={3} ml={1}>
                <SidebarItems />
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2} py={2}>
        <Logo />
      </Box>

      {/* ------------------------------------------- */}
      {/* Avatar */}
      {/* ------------------------------------------- */}
      <Box
        sx={{
          my: 3,
          mx: 2.5,
          py: 2,
          px: 2.5,
          display: "flex",
          borderRadius: 1.5,
          alignItems: "center",
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />

        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">{account.displayName}</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {account.role}
          </Typography>
        </Box>
      </Box>

      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
