import { Box, Container, Grid, Typography, Stack, IconButton, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", mt: 8, pt: 6, pb: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <DirectionsCarFilledIcon />
              <Typography variant="h6" fontWeight="bold">
                CarBazaar
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
              India's trusted platform to buy and sell verified second-hand cars at the best prices.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Typography component={Link} to="/" variant="body2" sx={{ color: "#cbd5e1", textDecoration: "none" }}>
                Home
              </Typography>
              <Typography component={Link} to="/cars" variant="body2" sx={{ color: "#cbd5e1", textDecoration: "none" }}>
                Browse Cars
              </Typography>
              <Typography component={Link} to="/sell" variant="body2" sx={{ color: "#cbd5e1", textDecoration: "none" }}>
                Sell Your Car
              </Typography>
              <Typography component={Link} to="/contact" variant="body2" sx={{ color: "#cbd5e1", textDecoration: "none" }}>
                Contact Us
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: "white" }} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }} aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }} aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <Typography variant="body2" align="center" sx={{ color: "#94a3b8" }}>
          © {new Date().getFullYear()} CarBazaar. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;