import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container, Grid, Typography, Box, Chip, Button,
  Divider, Paper, CircularProgress, Alert, Stack, Dialog,
  DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import PaletteIcon from "@mui/icons-material/Palette";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import { fetchCarById, deleteCar } from "../api/carApi";
import { useAuth } from "../context/AuthContext";

const C = {
  bg: "#14161A", surface: "#1C1F24", border: "#2C3036",
  accent: "#C9922F", accentDark: "#9C701E",
  text: "#F1F1EE", textMuted: "#9BA1A8",
};
const displayFont = `"Oswald", "Arial Narrow", sans-serif`;
const bodyFont = `"Inter", "Roboto", sans-serif`;
const monoFont = `"IBM Plex Mono", "Roboto Mono", monospace`;

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  useEffect(() => {
    if (!document.getElementById("car-dossier-fonts")) {
      const link = document.createElement("link");
      link.id = "car-dossier-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const loadCar = async () => {
      try {
        setLoading(true);
        const res = await fetchCarById(id);
        setCar(res.data);
        setActiveImg(res.data.images?.[0]);
      } catch (err) {
        setError("Car not found or something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    loadCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteCar(id);
      navigate("/cars");
    } catch (err) {
      setError("Failed to delete car. Please try again.");
      setDeleting(false);
    }
  };

  const pageShell = { minHeight: "100vh", bgcolor: C.bg, color: C.text, fontFamily: bodyFont };

  if (loading) {
    return (
      <Box sx={{ ...pageShell, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress sx={{ color: C.accent }} />
      </Box>
    );
  }

  if (error || !car) {
    return (
      <Box sx={pageShell}>
        <Container sx={{ py: 10, textAlign: "center" }}>
          <Alert severity="error" sx={{ mb: 3, bgcolor: "#3A1F1F", color: "#F1B4B4" }}>{error}</Alert>
          <Button component={Link} to="/cars" variant="outlined"
            sx={{ borderColor: C.border, color: C.text, "&:hover": { borderColor: C.accent, color: C.accent } }}>
            Back to listings
          </Button>
        </Container>
      </Box>
    );
  }

  const specs = [
    { icon: <SpeedIcon fontSize="small" />, label: "KM DRIVEN", value: `${Number(car.km).toLocaleString()} km` },
    { icon: <LocalGasStationIcon fontSize="small" />, label: "FUEL TYPE", value: car.fuelType },
    { icon: <SettingsIcon fontSize="small" />, label: "TRANSMISSION", value: car.transmission },
    { icon: <PersonIcon fontSize="small" />, label: "OWNERS", value: `${car.owners} Owner${car.owners > 1 ? "s" : ""}` },
    { icon: <PaletteIcon fontSize="small" />, label: "COLOR", value: car.color },
    { icon: <BadgeIcon fontSize="small" />, label: "REGISTRATION", value: car.regState },
  ];
  const refCode = `REF-${String(id).slice(-6).toUpperCase()}`;

  return (
    <Box sx={pageShell}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography component={Link} to="/cars" sx={{ display: "inline-block", mb: 3, fontFamily: monoFont, fontSize: 12, letterSpacing: 1.5, color: C.textMuted, textDecoration: "none", "&:hover": { color: C.accent } }}>
          ← BACK TO LISTINGS
        </Typography>

        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ position: "relative", borderRadius: "6px", overflow: "hidden", border: `1px solid ${C.border}` }}>
              <Box component="img" src={activeImg || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800"} alt={`${car.brand} ${car.model}`}
                sx={{ width: "100%", height: { xs: 260, sm: 340, md: 440 }, objectFit: "cover", display: "block" }} />
              <Chip icon={<VerifiedIcon sx={{ color: `${C.accent} !important`, fontSize: 16 }} />} label="INSPECTED LISTING"
                sx={{ position: "absolute", top: 16, left: 16, bgcolor: "rgba(20,22,26,0.85)", color: C.accent, fontFamily: monoFont, fontSize: 11, letterSpacing: 1, border: `1px solid ${C.accent}`, borderRadius: "4px", height: 26 }} />
            </Box>

            {car.images?.length > 1 && (
              <Grid container spacing={1.25} sx={{ mt: 1.25 }}>
                {car.images.map((img, i) => (
                  <Grid key={i} size={{ xs: 3 }}>
                    <Box component="img" src={img} alt={`${car.brand} ${i + 1}`} onClick={() => setActiveImg(img)}
                      sx={{ width: "100%", height: { xs: 64, sm: 84 }, objectFit: "cover", borderRadius: "4px", cursor: "pointer", border: activeImg === img ? `2px solid ${C.accent}` : `2px solid ${C.border}`, opacity: activeImg === img ? 1 : 0.55, transition: "all 0.15s ease", "&:hover": { opacity: 1, borderColor: C.accent } }} />
                  </Grid>
                ))}
              </Grid>
            )}

            <Divider sx={{ my: 4, borderColor: C.border }} />
            <Typography sx={{ fontFamily: monoFont, fontSize: 12, letterSpacing: 1.5, color: C.accent, mb: 1.5 }}>DESCRIPTION</Typography>
            <Typography sx={{ color: C.textMuted, lineHeight: 1.85, fontSize: 15 }}>{car.description}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: "relative", bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px", p: { xs: 2.5, sm: 3.5 } }}>
              {[
                { top: 8, left: 8, borderWidth: "2px 0 0 2px" },
                { top: 8, right: 8, borderWidth: "2px 2px 0 0" },
                { bottom: 8, left: 8, borderWidth: "0 0 2px 2px" },
                { bottom: 8, right: 8, borderWidth: "0 2px 2px 0" },
              ].map((pos, i) => (
                <Box key={i} sx={{ position: "absolute", width: 14, height: 14, borderColor: C.accent, borderStyle: "solid", ...pos }} />
              ))}

              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                <Chip label={car.year} size="small" sx={{ bgcolor: "transparent", border: `1px solid ${C.accent}`, color: C.accent, fontFamily: monoFont, fontWeight: 600, borderRadius: "4px" }} />
                <Typography sx={{ fontFamily: monoFont, fontSize: 11, letterSpacing: 1, color: C.textMuted }}>{refCode}</Typography>
              </Stack>

              <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 28, sm: 32 }, lineHeight: 1.15, textTransform: "uppercase", letterSpacing: 0.5, color: C.text }}>
                {car.brand} {car.model}
              </Typography>

              <Typography sx={{ fontFamily: monoFont, fontWeight: 600, fontSize: { xs: 26, sm: 30 }, color: C.accent, mt: 1.5, mb: 3 }}>
                ₹{Number(car.price).toLocaleString()}
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
                <Button variant="contained" startIcon={<PhoneIcon />} href={`tel:${car.phone}`}
                  sx={{ flex: 1, py: 1.1, bgcolor: C.accent, color: "#1A1300", fontWeight: 600, borderRadius: "4px", boxShadow: "none", "&:hover": { bgcolor: C.accentDark, boxShadow: "none" } }}>
                  Call seller
                </Button>
              </Stack>

              {user && car.owner === user._id && (
                <Stack direction="row" spacing={1.25} sx={{ mb: 3 }}>
                  <Button component={Link} to={`/cars/${id}/edit`} startIcon={<EditIcon fontSize="small" />}
                    sx={{ flex: 1, color: C.text, border: `1px solid ${C.border}`, borderRadius: "4px", "&:hover": { borderColor: C.accent, color: C.accent } }}>
                    Edit
                  </Button>
                  <Button startIcon={<DeleteIcon fontSize="small" />} onClick={() => setDeleteDialogOpen(true)}
                    sx={{ flex: 1, color: "#E28080", border: "1px solid #4A2626", borderRadius: "4px", "&:hover": { borderColor: "#E28080", bgcolor: "rgba(226,128,128,0.08)" } }}>
                    Delete
                  </Button>
                </Stack>
              )}

              <Box sx={{ borderTop: `1px solid ${C.border}`, pt: 2.5 }}>
                <Grid container rowSpacing={2} columnSpacing={2}>
                  {specs.map((spec) => (
                    <Grid key={spec.label} size={{ xs: 6 }}>
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <Box sx={{ color: C.accent, mt: "2px" }}>{spec.icon}</Box>
                        <Box>
                          <Typography sx={{ fontFamily: monoFont, fontSize: 10.5, letterSpacing: 1, color: C.textMuted }}>{spec.label}</Typography>
                          <Typography sx={{ fontSize: 14, fontWeight: 600, color: C.text }}>{spec.value}</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} PaperProps={{ sx: { bgcolor: C.surface, color: C.text, border: `1px solid ${C.border}` } }}>
        <DialogTitle sx={{ fontFamily: displayFont }}>Delete this listing?</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: C.textMuted }}>This action cannot be undone. Are you sure you want to delete this car listing?</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting} sx={{ color: C.textMuted }}>Cancel</Button>
          <Button onClick={handleDelete} disabled={deleting} variant="contained" sx={{ bgcolor: "#B23A3A", "&:hover": { bgcolor: "#8F2E2E" } }}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CarDetails;