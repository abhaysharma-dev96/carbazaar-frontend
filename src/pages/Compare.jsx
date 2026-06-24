import { useNavigate } from "react-router-dom";
import {
  Container, Grid, Typography, Box, Button,
  Card, CardMedia, Table, TableBody,
  TableCell, TableRow, Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCompare } from "../context/CompareContext";

const specs = [
  { label: "Price", key: "price", format: (v) => `₹${Number(v).toLocaleString()}` },
  { label: "Year", key: "year" },
  { label: "KM Driven", key: "km", format: (v) => `${Number(v).toLocaleString()} km` },
  { label: "Fuel Type", key: "fuelType" },
  { label: "Transmission", key: "transmission" },
  { label: "Color", key: "color" },
  { label: "Owners", key: "owners", format: (v) => `${v} Owner${v > 1 ? "s" : ""}` },
  { label: "Registration", key: "regState" },
  { label: "Category", key: "category", format: (v) => v.charAt(0).toUpperCase() + v.slice(1) },
];

function Compare() {
  const { compareList, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length < 2) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Select at least 2 cars to compare
        </Typography>
        <Button variant="contained" onClick={() => navigate("/cars")} sx={{ mt: 2 }}>
          Browse Cars
        </Button>
      </Container>
    );
  }

  const getBest = (key) => {
    if (key === "price") return Math.min(...compareList.map((c) => Number(c.price)));
    if (key === "km") return Math.min(...compareList.map((c) => Number(c.km)));
    if (key === "year") return Math.max(...compareList.map((c) => Number(c.year)));
    return null;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5, pb: 12 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/cars")}
            sx={{ mb: 1 }}
          >
            Back to Listings
          </Button>
          <Typography variant="h4" fontWeight={800}>
            Compare Cars
          </Typography>
        </Box>
        <Button variant="outlined" color="error" onClick={() => { clearCompare(); navigate("/cars"); }}>
          Clear All
        </Button>
      </Box>

      {/* Car Images + Names */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {compareList.map((car) => (
          <Grid key={car._id || car.id} size={{ xs: 12, sm: 6, md: 12 / compareList.length }}>
            <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image={car.images?.[0] || car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800"}
                alt={`${car.brand} ${car.model}`}
                sx={{ objectFit: "cover" }}
              />
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={700}>
                  {car.brand} {car.model}
                </Typography>
                <Typography variant="h6" color="primary" fontWeight={800}>
                  ₹{Number(car.price).toLocaleString()}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Specs Table */}
      <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>
          <TableBody>
            {specs.map((spec) => {
              const best = getBest(spec.key);
              return (
                <TableRow
                  key={spec.label}
                  sx={{ "&:nth-of-type(odd)": { bgcolor: "#f8fafc" } }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#64748b",
                      bgcolor: "#f1f5f9",
                      width: 150,
                      borderRight: "1px solid #e2e8f0",
                    }}
                  >
                    {spec.label}
                  </TableCell>
                  {compareList.map((car) => {
                    const value = car[spec.key];
                    const formatted = spec.format ? spec.format(value) : value;
                    const isBest = best !== null && Number(value) === best;
                    return (
                      <TableCell
                        key={car._id || car.id}
                        align="center"
                        sx={{ fontWeight: isBest ? 700 : 400 }}
                      >
                        {isBest ? (
                          <Chip
                            label={formatted}
                            size="small"
                            sx={{ bgcolor: "rgba(78,110,242,0.1)", color: "#4e6ef2", fontWeight: 700 }}
                          />
                        ) : formatted}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* View Details Buttons */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {compareList.map((car) => (
          <Grid key={car._id || car.id} size={{ xs: 12, sm: 6, md: 12 / compareList.length }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate(`/cars/${car._id || car.id}`)}
            >
              View {car.brand} {car.model} Details
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Compare;