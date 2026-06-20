import { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, Stack,
  IconButton, Drawer, List, ListItem, ListItemButton,
  ListItemText, useMediaQuery, Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Browse Cars", path: "/cars" },
  { label: "Sell Your Car", path: "/sell" },
  { label: "Contact Us", path: "/contact" },
];

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

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
                {navLinks.slice(0, 3).map((link) => (
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
            <Button component={Link} to="/sell" variant="contained" fullWidth onClick={() => setDrawerOpen(false)}>
              Sell Your Car
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;