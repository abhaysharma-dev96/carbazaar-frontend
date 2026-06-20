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
import { fetchCarById, deleteCar } from "../api/carApi";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadCar = async () => {
      try {
        setLoading(true);
        const res = await fetchCarById(id);
        setCar(res.data);
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !car) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button component={Link} to="/cars" variant="outlined">
          Back to Listings
        </Button>
      </Container>
    );
  }

  const specs = [
    { icon: <SpeedIcon />, label: "KM Driven", value: `${Number(car.km).toLocaleString()} km` },
    { icon: <LocalGasStationIcon />, label: "Fuel Type", value: car.fuelType },
    { icon: <SettingsIcon />, label: "Transmission", value: car.transmission },
    { icon: <PersonIcon />, label: "Owners", value: `${car.owners} Owner${car.owners > 1 ? "s" : ""}` },
    { icon: <PaletteIcon />, label: "Color", value: car.color },
    { icon: <BadgeIcon />, label: "Registration", value: car.regState },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        {/* Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={car.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800"}
            alt={`${car.brand} ${car.model}`}
            sx={{
              width: "100%",
              height: { xs: 260, sm: 320, md: 360 },
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          />

          {car.images?.length > 1 && (
            <Grid container spacing={1.5} sx={{ mt: 1.5 }}>
              {car.images.slice(1).map((img, i) => (
                <Grid key={i} size={{ xs: 6, sm: 4 }}>
                  <Box
                    component="img"
                    src={img}
                    alt={`${car.brand} ${i + 2}`}
                    sx={{
                      width: "100%",
                      height: { xs: 140, sm: 160 },
                      objectFit: "cover",
                      borderRadius: 2,
                      cursor: "pointer",
                      border: "2px solid transparent",
                      transition: "border-color 0.2s",
                      "&:hover": { borderColor: "primary.main" },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Chip label={car.year} sx={{ mb: 1 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {car.brand} {car.model}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
            ₹{Number(car.price).toLocaleString()}
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<PhoneIcon />}
            href={`tel:${car.phone}`}
            sx={{ mb: 2 }}
          >
            Call Seller: {car.phone}
          </Button>

          <Button component={Link} to="/cars" variant="outlined" fullWidth sx={{ mb: 2 }}>
            Back to Listings
          </Button>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              component={Link}
              to={`/cars/${id}/edit`}
              variant="outlined"
              startIcon={<EditIcon />}
              fullWidth
            >
              Edit
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              fullWidth
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </Stack>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {specs.map((spec) => (
                <Grid key={spec.label} size={{ xs: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
                    {spec.icon}
                    <Box>
                      <Typography variant="caption" display="block">
                        {spec.label}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="text.primary">
                        {spec.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Description
      </Typography>
      <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
        {car.description}
      </Typography>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete this listing?</DialogTitle>
        <DialogContent>
          <Typography>
            This action cannot be undone. Are you sure you want to delete this car listing?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CarDetails;