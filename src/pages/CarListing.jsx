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

const C = {
  bg: "#14161A", surface: "#1C1F24", border: "#2C3036",
  accent: "#C9922F", accentDark: "#9C701E",
  text: "#F1F1EE", textMuted: "#9BA1A8",
};
const displayFont = `"Oswald", "Arial Narrow", sans-serif`;
const monoFont = `"IBM Plex Mono", "Roboto Mono", monospace`;

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

        const res = await fetchCars({ ...params });
        setCars(res.data);
      } catch (err) {
        setError("Failed to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [filters, search]);

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
    <Box sx={{ minHeight: "100vh", bgcolor: C.bg }}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography sx={{ fontFamily: monoFont, fontSize: 12, letterSpacing: 1.5, color: C.accent, mb: 1 }}>
          INVENTORY
        </Typography>
        <Typography
          sx={{
            fontFamily: displayFont,
            fontWeight: 600,
            fontSize: { xs: 30, sm: 38 },
            textTransform: "uppercase",
            letterSpacing: 0.5,
            color: C.text,
            mb: 3,
          }}
        >
          Browse Vehicles
        </Typography>

        <TextField
          fullWidth
          placeholder="Search by brand, model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 3,
            maxWidth: 500,
            "& .MuiOutlinedInput-root": {
              bgcolor: C.surface,
              color: C.text,
              borderRadius: "4px",
              "& fieldset": { borderColor: C.border },
              "&:hover fieldset": { borderColor: C.accent },
              "&.Mui-focused fieldset": { borderColor: C.accent },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: C.textMuted }} />
              </InputAdornment>
            ),
          }}
        />

        {isMobile && (
          <Button
            startIcon={<FilterListIcon />}
            variant="outlined"
            onClick={() => setDrawerOpen(true)}
            sx={{
              mb: 3,
              color: C.text,
              borderColor: C.border,
              "&:hover": { borderColor: C.accent, color: C.accent },
            }}
          >
            Filters
          </Button>
        )}

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px", p: 2 }}>
                {filterPanel}
              </Box>
            </Grid>
          )}

          <Grid size={{ xs: 12, md: isMobile ? 12 : 9 }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress sx={{ color: C.accent }} />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ bgcolor: "#3A1F1F", color: "#F1B4B4" }}>{error}</Alert>
            ) : cars.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  border: `1px dashed ${C.border}`,
                  borderRadius: "6px",
                }}
              >
                <Typography sx={{ color: C.textMuted, fontFamily: monoFont, fontSize: 13, letterSpacing: 1 }}>
                  NO MATCHES
                </Typography>
                <Typography sx={{ color: C.text, mt: 1 }}>
                  No cars found matching your filters.
                </Typography>
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  sx={{
                    mt: 2,
                    color: C.accent,
                    borderColor: C.accent,
                    "&:hover": { borderColor: C.accentDark, bgcolor: "rgba(201,146,47,0.08)" },
                  }}
                >
                  Reset filters
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

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { bgcolor: C.surface, color: C.text } }}
        >
          <Box sx={{ width: 300, p: 2 }}>{filterPanel}</Box>
        </Drawer>
      </Container>
    </Box>
  );
}

export default CarListing;