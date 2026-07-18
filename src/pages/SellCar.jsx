import { useState } from "react";
import {
  Container, Paper, Typography, Grid, TextField,
  MenuItem, Button, Box, IconButton, Alert, CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { createCar } from "../api/carApi";

const C = {
  bg: "#14161A",
  surface: "#1C1F24",
  surface2: "#23262C",
  border: "#2C3036",
  accent: "#C9922F",
  accentDark: "#9C701E",
  text: "#F1F1EE",
  textMuted: "#9BA1A8",
};
const displayFont = `"Oswald", "Arial Narrow", sans-serif`;
const monoFont = `"IBM Plex Mono", "Roboto Mono", monospace`;

/* shared dark-field styling, reused on every TextField */
const fieldSx = {
  "& .MuiInputBase-root": { color: C.text, bgcolor: C.surface2, borderRadius: "4px" },
  "& .MuiInputLabel-root": { color: C.textMuted },
  "& .MuiInputLabel-root.Mui-focused": { color: C.accent },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: C.border },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: C.accent },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: C.accent },
  "& .MuiFormHelperText-root": { color: C.textMuted },
  "& .MuiSvgIcon-root": { color: C.textMuted },
};

const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const transmissions = ["Manual", "Automatic"];
const indianStates = [
  "DL - Delhi", "MH - Maharashtra", "KA - Karnataka", "TN - Tamil Nadu",
  "RJ - Rajasthan", "GJ - Gujarat", "UP - Uttar Pradesh", "HR - Haryana",
  "PB - Punjab", "WB - West Bengal", "MP - Madhya Pradesh", "AP - Andhra Pradesh",
];

const initialForm = {
  vehicleType: "car",
  brand: "", model: "", year: "", price: "", km: "", fuelType: "",
  transmission: "", color: "", owners: "",
  regState: "", phone: "", description: "", category: "",
};

function SellCar() {
  const [form, setForm] = useState(initialForm);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const combined = [...photos, ...files].slice(0, 10);
    setPhotos(combined);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(initialForm).forEach((key) => {
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
    if (form.owners && (form.owners < 1 || form.owners > 10)) {
      newErrors.owners = "Enter a valid number of owners (1–10)";
    }
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (form.description && form.description.trim().length < 20) {
      newErrors.description = "Description should be at least 20 characters";
    }
    if (photos.length < 3) {
      newErrors.photos = "Upload at least 3 photos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setServerError("");

      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      photos.forEach((photo) => formData.append("images", photo));

      await createCar(formData);
      setSubmitted(true);
      setForm(initialForm);
      setPhotos([]);
    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: C.bg, py: 5 }}>
      <Container maxWidth="md">
        <Typography sx={{ fontFamily: monoFont, fontSize: 12, letterSpacing: 1.5, color: C.accent, mb: 1 }}>
          LIST YOUR VEHICLE
        </Typography>
        <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 28, sm: 34 }, textTransform: "uppercase", color: C.text, mb: 1 }}>
          Sell your car and bike
        </Typography>
        <Typography sx={{ color: C.textMuted, mb: 4 }}>
          Fill in the details below to list your car and bike for sale.
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 3, bgcolor: "#1C3324", color: "#8FD6A5", border: "1px solid #2E5C3C" }} onClose={() => setSubmitted(false)}>
            Your car listing has been submitted successfully. It will appear in Browse Cars shortly.
          </Alert>
        )}

        {serverError && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: "#3A1F1F", color: "#F1B4B4", border: "1px solid #5C2E2E" }} onClose={() => setServerError("")}>
            {serverError}
          </Alert>
        )}

        <Paper sx={{ p: 4, bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px" }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Vehicle type" value={form.vehicleType}
                  onChange={handleChange("vehicleType")} sx={fieldSx}
                >
                  <MenuItem value="car">Car</MenuItem>
                  <MenuItem value="bike">Bike</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Brand" value={form.brand}
                  onChange={handleChange("brand")}
                  error={!!errors.brand} helperText={errors.brand} sx={fieldSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Model" value={form.model}
                  onChange={handleChange("model")}
                  error={!!errors.model} helperText={errors.model} sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Manufacturing year" type="number" value={form.year}
                  onChange={handleChange("year")}
                  error={!!errors.year} helperText={errors.year} sx={fieldSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Price (₹)" type="number" value={form.price}
                  onChange={handleChange("price")}
                  error={!!errors.price} helperText={errors.price} sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="KM driven" type="number" value={form.km}
                  onChange={handleChange("km")}
                  error={!!errors.km} helperText={errors.km} sx={fieldSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Fuel type" value={form.fuelType}
                  onChange={handleChange("fuelType")}
                  error={!!errors.fuelType} helperText={errors.fuelType} sx={fieldSx}
                >
                  {fuelTypes.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Transmission" value={form.transmission}
                  onChange={handleChange("transmission")}
                  error={!!errors.transmission} helperText={errors.transmission} sx={fieldSx}
                >
                  {transmissions.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Color" value={form.color}
                  onChange={handleChange("color")}
                  error={!!errors.color} helperText={errors.color} sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Number of owners" type="number" value={form.owners}
                  onChange={handleChange("owners")}
                  error={!!errors.owners} helperText={errors.owners} sx={fieldSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Registration state" value={form.regState}
                  onChange={handleChange("regState")}
                  error={!!errors.regState} helperText={errors.regState} sx={fieldSx}
                >
                  {indianStates.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Category" value={form.category}
                  onChange={handleChange("category")}
                  error={!!errors.category} helperText={errors.category} sx={fieldSx}
                >
                  {(
                    form.vehicleType === "car"
                      ? ["suv", "sedan", "hatchback"]
                      : ["sports-bike", "cruiser", "scooter", "commuter"]
                  ).map((c) => (
                    <MenuItem key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Seller contact number" value={form.phone}
                  onChange={handleChange("phone")}
                  error={!!errors.phone} helperText={errors.phone || "10-digit mobile number"} sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField fullWidth multiline rows={4} label="Description" value={form.description}
                  onChange={handleChange("description")}
                  error={!!errors.description} helperText={errors.description} sx={fieldSx}
                />
              </Grid>

              {/* Photo Upload */}
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ fontFamily: monoFont, fontSize: 12, letterSpacing: 1, color: C.accent, mb: 1 }}>
                  UPLOAD PHOTOS (3–10 REQUIRED)
                </Typography>
                <Button
                  component="label" variant="outlined" startIcon={<CloudUploadIcon />}
                  sx={{ color: C.text, borderColor: C.border, borderRadius: "4px", "&:hover": { borderColor: C.accent, color: C.accent } }}
                >
                  Choose photos
                  <input type="file" hidden multiple accept="image/*" onChange={handlePhotoUpload} />
                </Button>
                <Typography sx={{ fontSize: 12, color: C.textMuted, mt: 0.5 }}>
                  {photos.length}/10 photos selected
                </Typography>
                {errors.photos && (
                  <Typography sx={{ color: "#E28080", fontSize: 12, mt: 0.5 }}>
                    {errors.photos}
                  </Typography>
                )}

                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {photos.map((file, index) => (
                    <Grid key={index} size={{ xs: 3, sm: 2 }}>
                      <Box sx={{ position: "relative" }}>
                        <Box
                          component="img"
                          src={URL.createObjectURL(file)}
                          alt={`upload-${index}`}
                          sx={{ width: "100%", height: 80, objectFit: "cover", borderRadius: "4px", border: `1px solid ${C.border}` }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => removePhoto(index)}
                          sx={{
                            position: "absolute", top: -8, right: -8,
                            bgcolor: C.surface2, border: `1px solid ${C.border}`,
                            "&:hover": { bgcolor: "#3A1F1F", borderColor: "#E28080" },
                          }}
                        >
                          <DeleteIcon fontSize="small" sx={{ color: "#E28080" }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={16} sx={{ color: "#1A1300" }} /> : null}
                  sx={{
                    px: 4, py: 1.2, borderRadius: "4px", boxShadow: "none",
                    bgcolor: C.accent, color: "#1A1300", fontWeight: 600,
                    "&:hover": { bgcolor: C.accentDark, boxShadow: "none" },
                    "&.Mui-disabled": { bgcolor: C.surface2, color: C.textMuted },
                  }}
                >
                  {loading ? "Submitting..." : "Submit listing"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SellCar;
