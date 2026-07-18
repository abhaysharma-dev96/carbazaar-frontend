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

const C = {
  bg: "#14161A",
  surface2: "#23262C",
  border: "#2C3036",
  accent: "#C9922F",
  text: "#F1F1EE",
  textMuted: "#9BA1A8",
};
const displayFont = `"Oswald", "Arial Narrow", sans-serif`;
const monoFont = `"IBM Plex Mono", "Roboto Mono", monospace`;

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Browse vehicles", to: "/cars" },
  { label: "Sell your vehicle", to: "/sell" },
  { label: "Contact us", to: "/contact" },
];

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: C.bg,
        color: C.text,
        mt: 6,
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5} sx={{ py: 5 }}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box
                sx={{
                  border: `1px solid ${C.accent}`,
                  width: 40,
                  height: 40,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DirectionsCarFilledIcon sx={{ color: C.accent, fontSize: 22 }} />
              </Box>

              <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>
                CarBazaar
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: C.textMuted,
                lineHeight: 1.8,
                maxWidth: 400,
                fontSize: 14,
              }}
            >
              Buy and sell verified used vehicles across India with confidence.
              Compare vehicles, save favourites, and connect directly with
              trusted sellers through a seamless marketplace experience.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontFamily: monoFont, fontSize: 12, letterSpacing: 1.5, color: C.accent, mb: 2 }}>
              QUICK LINKS
            </Typography>

            <Stack spacing={1.5}>
              {quickLinks.map((link) => (
                <Typography
                  key={link.to}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: C.textMuted,
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "0.15s",
                    "&:hover": {
                      color: C.accent,
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Social */}
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography sx={{ fontFamily: monoFont, fontSize: 12, letterSpacing: 1.5, color: C.accent, mb: 2 }}>
              FOLLOW US
            </Typography>

            <Stack direction="row" spacing={1.5}>
              {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    border: `1px solid ${C.border}`,
                    borderRadius: "6px",
                    color: C.textMuted,
                    "&:hover": {
                      borderColor: C.accent,
                      color: C.accent,
                      bgcolor: "rgba(201,146,47,0.08)",
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>

            <Typography
              sx={{
                color: C.textMuted,
                mt: 2,
                lineHeight: 1.8,
                fontSize: 14,
              }}
            >
              Stay updated with the latest vehicle listings, buying tips, and
              marketplace updates.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: C.border }} />

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
            sx={{
              fontFamily: monoFont,
              color: C.textMuted,
              fontSize: "0.75rem",
              letterSpacing: 0.5,
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