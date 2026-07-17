import { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, Stack,
  IconButton, Drawer, List, ListItem, ListItemButton,
  ListItemText, useMediaQuery, Container, Avatar, Menu, MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Browse Vehicles", path: "/vehicles" },
  { label: "Sell Vehicle", path: "/sell" },
];
function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
const { user, logout } = useAuth();
const [anchorEl, setAnchorEl] = useState(null);

const handleLogout = () => {
  logout();
  setAnchorEl(null);
  navigate("/");
};
// console.log("Current user:", user);

  return (
    <>
      <AppBar position="sticky" elevation={0}
        sx={{ bgcolor: "white", borderBottom: "1px solid #f0f0f0" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Stack
              direction="row" alignItems="center" spacing={1}
              component={Link} to="/"
              sx={{ textDecoration: "none", flexGrow: 1 }}
            >
              <Box sx={{ bgcolor: "#4e6ef2", borderRadius: 2, p: 0.7, display: "flex", alignItems: "center" }}>
                <DirectionsCarFilledIcon sx={{ color: "white", fontSize: 22 }} />
              </Box>
              <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: 800, letterSpacing: "-0.5px" }}>
                Car<Box component="span" sx={{ color: "#4e6ef2" }}>Bazaar</Box>
              </Typography>
            </Stack>

            {!isMobile && (
              <Stack direction="row" alignItems="center" spacing={1}>
                {navLinks.slice(0, 4).map((link) => (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: location.pathname === link.path ? "#4e6ef2" : "#1e293b",
                      fontWeight: location.pathname === link.path ? 700 : 500,
                      fontSize: "0.9rem",
                      px: 2,
                      "&:hover": { color: "#4e6ef2", bgcolor: "transparent" },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  component={Link} to="/contact"
                  variant="contained" sx={{ ml: 1, px: 3, py: 1 }}
                >
                  Contact Us
                </Button>
                {user ? (
  <>
    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
      <Avatar sx={{ bgcolor: "#4e6ef2", width: 36, height: 36, fontSize: "0.9rem" }}>
        {user.name.charAt(0).toUpperCase()}
      </Avatar>
    </IconButton>
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
      <MenuItem disabled>{user.name}</MenuItem>
       <MenuItem component={Link} to="/wishlist" onClick={() => setAnchorEl(null)}>
  My Wishlist
</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  </>
) : (
  <Button component={Link} to="/login" sx={{ ml: 1, color: "#1e293b" }}>
    Login
  </Button>
)}
              </Stack>
            )}

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#1e293b" }}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 270 }}>
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>
            <Typography fontWeight={800} color="#1e293b">
              Car<Box component="span" sx={{ color: "#4e6ef2" }}>Bazaar</Box>
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  component={Link} to={link.path}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    color: location.pathname === link.path ? "#4e6ef2" : "#1e293b",
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    py: 1.5, px: 3,
                  }}
                >
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: "inherit" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ px: 3, mt: 2 }}>
  {user && (
    <Button
      component={Link}
      to="/wishlist"
      variant="outlined"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => setDrawerOpen(false)}
    >
      My Wishlist
    </Button>
  )}

  {user ? (
    <Button
      onClick={() => {
        handleLogout();
        setDrawerOpen(false);
      }}
      variant="outlined"
      fullWidth
      sx={{ mt: 2 }}
    >
      Logout ({user.name})
    </Button>
  ) : (
    <Button
      component={Link}
      to="/login"
      variant="outlined"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => setDrawerOpen(false)}
    >
      Login
    </Button>
  )}
</Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;