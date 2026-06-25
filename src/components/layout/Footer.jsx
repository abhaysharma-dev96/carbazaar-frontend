import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#0f172a",
        color: "white",
        mt: 6,
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5} sx={{ py: 5 }}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box
                sx={{
                  bgcolor: "#4e6ef2",
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DirectionsCarFilledIcon />
              </Box>

              <Typography variant="h6" fontWeight={800}>
                CarBazaar
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                lineHeight: 1.8,
                maxWidth: 400,
              }}
            >
              Buy and sell verified used cars across India with confidence.
              Compare vehicles, save favourites, and connect directly with
              trusted sellers through a seamless marketplace experience.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Quick Links
            </Typography>

            <Stack spacing={1.5}>
              <Typography
                component={Link}
                to="/"
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "0.2s",
                  "&:hover": {
                    color: "#fff",
                    transform: "translateX(4px)",
                  },
                }}
              >
                Home
              </Typography>

              <Typography
                component={Link}
                to="/cars"
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "0.2s",
                  "&:hover": {
                    color: "#fff",
                    transform: "translateX(4px)",
                  },
                }}
              >
                Browse Cars
              </Typography>

              <Typography
                component={Link}
                to="/sell"
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "0.2s",
                  "&:hover": {
                    color: "#fff",
                    transform: "translateX(4px)",
                  },
                }}
              >
                Sell Your Car
              </Typography>

              <Typography
                component={Link}
                to="/contact"
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "0.2s",
                  "&:hover": {
                    color: "#fff",
                    transform: "translateX(4px)",
                  },
                }}
              >
                Contact Us
              </Typography>
            </Stack>
          </Grid>

          {/* Social */}
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Follow Us
            </Typography>

            <Stack direction="row" spacing={1.5}>
              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                  color: "#cbd5e1",
                  "&:hover": {
                    bgcolor: "#4e6ef2",
                    color: "#fff",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                  color: "#cbd5e1",
                  "&:hover": {
                    bgcolor: "#4e6ef2",
                    color: "#fff",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                  color: "#cbd5e1",
                  "&:hover": {
                    bgcolor: "#4e6ef2",
                    color: "#fff",
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                mt: 2,
                lineHeight: 1.8,
              }}
            >
              Stay updated with the latest car listings, buying tips, and
              marketplace updates.
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.08)",
          }}
        />

        <Box
          sx={{
            py: 2.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontSize: "0.85rem",
            }}
          >
            © {new Date().getFullYear()} CarBazaar. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;