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

const C = {
  bg: "#14161A",
  surface: "#1C1F24",
  border: "#2C3036",
  accent: "#C9922F",
  text: "#F1F1EE",
  textMuted: "#9BA1A8",
};
const displayFont = `"Oswald", "Arial Narrow", sans-serif`;

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

  return (
    <>
      <AppBar position="sticky" elevation={0}
        sx={{ bgcolor: C.bg, borderBottom: `1px solid ${C.border}` }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Stack
              direction="row" alignItems="center" spacing={1}
              component={Link} to="/"
              sx={{ textDecoration: "none", flexGrow: 1 }}
            >
              <Box sx={{ border: `1px solid ${C.accent}`, borderRadius: "6px", p: 0.7, display: "flex", alignItems: "center" }}>
                <DirectionsCarFilledIcon sx={{ color: C.accent, fontSize: 20 }} />
              </Box>
              <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: 20, letterSpacing: 0.3, color: C.text, textTransform: "uppercase" }}>
                Car<Box component="span" sx={{ color: C.accent }}>Bazaar</Box>
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
                      color: location.pathname === link.path ? C.accent : C.textMuted,
                      fontWeight: location.pathname === link.path ? 600 : 500,
                      fontSize: "0.9rem",
                      px: 2,
                      "&:hover": { color: C.accent, bgcolor: "transparent" },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  component={Link} to="/contact"
                  sx={{
                    ml: 1, px: 3, py: 1, borderRadius: "4px", boxShadow: "none",
                    bgcolor: C.accent, color: "#1A1300", fontWeight: 600,
                    "&:hover": { bgcolor: "#9C701E", boxShadow: "none" },
                  }}
                >
                  Contact Us
                </Button>
                {user ? (
                  <>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
                      <Avatar sx={{ bgcolor: "transparent", border: `1px solid ${C.accent}`, color: C.accent, width: 36, height: 36, fontSize: "0.9rem", fontWeight: 600 }}>
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      PaperProps={{ sx: { bgcolor: C.surface, border: `1px solid ${C.border}`, color: C.text } }}
                    >
                      <MenuItem disabled sx={{ color: C.textMuted, opacity: "1 !important" }}>{user.name}</MenuItem>
                      <MenuItem component={Link} to="/wishlist" onClick={() => setAnchorEl(null)} sx={{ "&:hover": { bgcolor: "rgba(201,146,47,0.08)", color: C.accent } }}>
                        My Wishlist
                      </MenuItem>
                      <MenuItem onClick={handleLogout} sx={{ "&:hover": { bgcolor: "rgba(201,146,47,0.08)", color: C.accent } }}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button component={Link} to="/login" sx={{ ml: 1, color: C.textMuted, "&:hover": { color: C.accent } }}>
                    Login
                  </Button>
                )}
              </Stack>
            )}

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: C.text }}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { bgcolor: C.bg, color: C.text } }}
      >
        <Box sx={{ width: 270 }}>
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
            <Typography sx={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", color: C.text }}>
              Car<Box component="span" sx={{ color: C.accent }}>Bazaar</Box>
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: C.textMuted }}>
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
                    color: location.pathname === link.path ? C.accent : C.textMuted,
                    fontWeight: location.pathname === link.path ? 600 : 500,
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
                sx={{ mt: 2, color: C.text, borderColor: C.border, borderRadius: "4px", "&:hover": { borderColor: C.accent, color: C.accent } }}
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
                sx={{ mt: 2, color: C.text, borderColor: C.border, borderRadius: "4px", "&:hover": { borderColor: C.accent, color: C.accent } }}
              >
                Logout ({user.name})
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                fullWidth
                sx={{ mt: 2, color: C.text, borderColor: C.border, borderRadius: "4px", "&:hover": { borderColor: C.accent, color: C.accent } }}
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