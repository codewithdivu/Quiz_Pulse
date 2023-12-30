import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const settings = [
  "Profile",
  "Dashboard",
  "Leaderboard",
  "Profile Dashboard",
  "Logout",
];

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (val) => {
    setAnchorElUser(null);
    if (val === "Logout") {
      await logout();
      navigate("/auth/login");
    } else if (val === "Profile") {
      navigate("/dashboard/profile");
    } else if (val === "Dashboard") {
      navigate("/dashboard");
    } else if (val === "Leaderboard") {
      navigate("/dashboard/leaderboard");
    } else if (val === "Profile Dashboard") {
      navigate("/dashboard/profileDashboard");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <img
            src="/logo/normalLogo.png"
            alt="LOGO"
            onClick={() => navigate("/dashboard")}
            style={{
              height: "2rem",
              width: "9rem",
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.username} src={user?.profile_pic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
