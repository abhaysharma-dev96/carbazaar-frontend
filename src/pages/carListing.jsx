import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container, Grid, Typography, Box, TextField,
  InputAdornment, Drawer, Button, useMediaQuery,
  CircularProgress, Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CarCard from "../components/cars/CarCard";
import FilterSidebar from "../components/cars/FilterSidebar";
import { fetchCars } from "../api/carApi";

function CarListing() {
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({
    brand: "all",
    fuelType: "all",
    year: "all",
    priceRange: [0, 3000000],
    category: searchParams.get("category") || "all",
  });

  // Real API se data fetch karo
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError("");
        const params = {};
        if (filters.brand !== "all") params.brand = filters.brand;
        if (filters.fuelType !== "all") params.fuelType = filters.fuelType;
        if (filters.category !== "all") params.category = filters.category;
        if (filters.priceRange[0] > 0) params.minPrice = filters.priceRange[0];
        if (filters.priceRange[1] < 3000000) params.maxPrice = filters.priceRange[1];
        if (search) params.q = search;

        const res = await fetchCars(params);
        setCars(res.data);
      } catch (err) {
        setError("Failed to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [filters, search]);

  // Unique values for filter dropdowns
  const brands = useMemo(() => [...new Set(cars.map((c) => c.brand))], [cars]);
  const fuelTypes = useMemo(() => [...new Set(cars.map((c) => c.fuelType))], [cars]);
  const years = useMemo(() => [...new Set(cars.map((c) => c.year))].sort((a, b) => b - a), [cars]);

  const handleReset = () => {
    setFilters({
      brand: "all",
      fuelType: "all",
      year: "all",
      priceRange: [0, 3000000],
      category: "all",
    });
    setSearch("");
  };

  const filterPanel = (
    <FilterSidebar
      filters={filters}
      setFilters={setFilters}
      brands={brands}
      fuelTypes={fuelTypes}
      years={years}
      onReset={handleReset}
    />
  );

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Browse Cars
      </Typography>

      <TextField
        fullWidth
        placeholder="Search by brand, model..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3, maxWidth: 500 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {isMobile && (
        <Button
          startIcon={<FilterListIcon />}
          variant="outlined"
          onClick={() => setDrawerOpen(true)}
          sx={{ mb: 3 }}
        >
          Filters
        </Button>
      )}

      <Grid container spacing={3}>
        {!isMobile && (
          <Grid size={{ xs: 12, md: 3 }}>{filterPanel}</Grid>
        )}

        <Grid size={{ xs: 12, md: isMobile ? 12 : 9 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : cars.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No cars found matching your filters.
              </Typography>
              <Button onClick={handleReset} variant="outlined" sx={{ mt: 2 }}>
                Reset Filters
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {cars.map((car) => (
                <Grid key={car._id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <CarCard car={car} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>{filterPanel}</Box>
      </Drawer>
    </Container>
  );
}

export default CarListing;