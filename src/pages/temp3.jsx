import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Paper, Typography, Grid, TextField,
  MenuItem, Button, Box, IconButton, Alert, CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchCarById, updateCar } from "../api/carApi";

const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const transmissions = ["Manual", "Automatic"];
const categories = ["suv", "sedan", "hatchback"];
const indianStates = [
  "DL - Delhi", "MH - Maharashtra", "KA - Karnataka", "TN - Tamil Nadu",
  "RJ - Rajasthan", "GJ - Gujarat", "UP - Uttar Pradesh", "HR - Haryana",
  "PB - Punjab", "WB - West Bengal", "MP - Madhya Pradesh", "AP - Andhra Pradesh",
];

function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const res = await fetchCarById(id);
        const car = res.data;
        setForm({
          brand: car.brand, model: car.model, year: car.year,
          price: car.price, km: car.km, fuelType: car.fuelType,
          transmission: car.transmission, color: car.color,
          owners: car.owners, regState: car.regState,
          phone: car.phone, description: car.description,
          category: car.category,
        });
        setExistingImages(car.images || []);
      } catch (err) {
        setServerError("Failed to load car data.");
      } finally {
        setLoading(false);
      }
    };
    loadCar();
  }, [id]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewPhotos((prev) => [...prev, ...files].slice(0, 10));
  };

  const removeNewPhoto = (index) => {
    setNewPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key].toString().trim()) newErrors[key] = "Required";
    });

    const currentYear = new Date().getFullYear();
    if (form.year && (form.year < 1990 || form.year > currentYear)) {
      newErrors.year = `Enter a year between 1990 and ${currentYear}`;
    }
    if (form.price && (form.price < 10000 || form.price > 100000000)) {
      newErrors.price = "Enter a realistic price (₹10,000 – ₹10 Crore)";
    }
    if (form.km && (form.km < 0 || form.km > 500000)) {
      newErrors.km = "Enter a realistic KM value (0 – 5,00,000)";
    }
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (existingImages.length + newPhotos.length < 1) {
      newErrors.photos = "At least 1 photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      setServerError("");

      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append("existingImages", JSON.stringify(existingImages));
      newPhotos.forEach((photo) => formData.append("images", photo));

      await updateCar(id, formData);
      setSubmitted(true);
      setTimeout(() => navigate(`/cars/${id}`), 1200);
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to update listing. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!form) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Alert severity="error">{serverError || "Car not found."}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Car Listing
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Update the details of your car listing.
      </Typography>

      {submitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Listing updated successfully! Redirecting...
        </Alert>
      )}
      {serverError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setServerError("")}>
          {serverError}
        </Alert>
      )}

      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Brand" value={form.brand}
                onChange={handleChange("brand")}
                error={!!errors.brand} helperText={errors.brand}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Model" value={form.model}
                onChange={handleChange("model")}
                error={!!errors.model} helperText={errors.model}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Manufacturing Year" type="number" value={form.year}
                onChange={handleChange("year")}
                error={!!errors.year} helperText={errors.year}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Price (₹)" type="number" value={form.price}
                onChange={handleChange("price")}
                error={!!errors.price} helperText={errors.price}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="KM Driven" type="number" value={form.km}
                onChange={handleChange("km")}
                error={!!errors.km} helperText={errors.km}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select fullWidth label="Fuel Type" value={form.fuelType}
                onChange={handleChange("fuelType")}
                error={!!errors.fuelType} helperText={errors.fuelType}
              >
                {fuelTypes.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select fullWidth label="Transmission" value={form.transmission}
                onChange={handleChange("transmission")}
                error={!!errors.transmission} helperText={errors.transmission}
              >
                {transmissions.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Color" value={form.color}
                onChange={handleChange("color")}
                error={!!errors.color} helperText={errors.color}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Number of Owners" type="number" value={form.owners}
                onChange={handleChange("owners")}
                error={!!errors.owners} helperText={errors.owners}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select fullWidth label="Registration State" value={form.regState}
                onChange={handleChange("regState")}
                error={!!errors.regState} helperText={errors.regState}
              >
                {indianStates.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select fullWidth label="Category" value={form.category}
                onChange={handleChange("category")}
                error={!!errors.category} helperText={errors.category}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Seller Contact Number" value={form.phone}
                onChange={handleChange("phone")}
                error={!!errors.phone} helperText={errors.phone || "10-digit mobile number"}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField fullWidth multiline rows={4} label="Description" value={form.description}
                onChange={handleChange("description")}
                error={!!errors.description} helperText={errors.description}
              />
            </Grid>

            {/* Existing Photos */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Current Photos
              </Typography>
              <Grid container spacing={1}>
                {existingImages.map((img, index) => (
                  <Grid key={index} size={{ xs: 3, sm: 2 }}>
                    <Box sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        src={img}
                        alt={`existing-${index}`}
                        sx={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 1 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeExistingImage(index)}
                        sx={{
                          position: "absolute", top: -8, right: -8,
                          bgcolor: "white", boxShadow: 1,
                          "&:hover": { bgcolor: "error.light" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* New Photo Upload */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Add New Photos
              </Typography>
              <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                Choose Photos
                <input type="file" hidden multiple accept="image/*" onChange={handlePhotoUpload} />
              </Button>
              {errors.photos && (
                <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                  {errors.photos}
                </Typography>
              )}

              <Grid container spacing={1} sx={{ mt: 2 }}>
                {newPhotos.map((file, index) => (
                  <Grid key={index} size={{ xs: 3, sm: 2 }}>
                    <Box sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        src={URL.createObjectURL(file)}
                        alt={`new-${index}`}
                        sx={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 1 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeNewPhoto(index)}
                        sx={{
                          position: "absolute", top: -8, right: -8,
                          bgcolor: "white", boxShadow: 1,
                          "&:hover": { bgcolor: "error.light" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit" variant="contained" size="large" fullWidth
                disabled={saving}
                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {saving ? "Updating..." : "Update Listing"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditCar;