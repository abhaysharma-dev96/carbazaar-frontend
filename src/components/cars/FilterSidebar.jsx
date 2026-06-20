import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Stack,
  Divider,
} from "@mui/material";

function FilterSidebar({ filters, setFilters, brands, fuelTypes, years, onReset }) {
  const handleChange = (key) => (e) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <FormControl fullWidth size="small">
          <InputLabel>Brand</InputLabel>
          <Select value={filters.brand} label="Brand" onChange={handleChange("brand")}>
            <MenuItem value="all">All Brands</MenuItem>
            {brands.map((b) => (
              <MenuItem key={b} value={b}>{b}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Fuel Type</InputLabel>
          <Select value={filters.fuelType} label="Fuel Type" onChange={handleChange("fuelType")}>
            <MenuItem value="all">All</MenuItem>
            {fuelTypes.map((f) => (
              <MenuItem key={f} value={f}>{f}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Year</InputLabel>
          <Select value={filters.year} label="Year" onChange={handleChange("year")}>
            <MenuItem value="all">All Years</MenuItem>
            {years.map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography gutterBottom>
            Price Range (₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()})
          </Typography>
          <Slider
            value={filters.priceRange}
            onChange={(e, val) => setFilters((prev) => ({ ...prev, priceRange: val }))}
            min={0}
            max={3000000}
            step={50000}
            valueLabelDisplay="auto"
          />
        </Box>

        <Button variant="outlined" onClick={onReset}>
          Reset Filters
        </Button>
      </Stack>
    </Box>
  );
}

export default FilterSidebar;