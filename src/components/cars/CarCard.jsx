import { Card, CardMedia, CardContent, Typography, Chip, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";

function CarCard({ car }) {
  const carId = car._id || car.id; // dono support karo

  return (
    <Card
      component={Link}
      to={`/cars/${carId}`}
      sx={{
        textDecoration: "none",
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 24px rgba(0,0,0,0.15)" },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={car.images?.[0] || car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800"}
        alt={`${car.brand} ${car.model}`}
        loading="lazy"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="text.primary" noWrap>
          {car.brand} {car.model}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ my: 1 }} flexWrap="wrap">
          <Chip size="small" label={car.year} />
          <Chip size="small" icon={<SpeedIcon />} label={`${Number(car.km).toLocaleString()} km`} />
          <Chip size="small" icon={<LocalGasStationIcon />} label={car.fuelType} />
        </Stack>
        <Typography variant="subtitle1" fontWeight="bold" color="primary">
          {car.price?.toString().startsWith("₹") ? car.price : `₹${Number(car.price).toLocaleString()}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CarCard;