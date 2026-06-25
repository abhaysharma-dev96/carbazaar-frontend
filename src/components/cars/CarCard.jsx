import { useState } from "react";
import {
  Card, CardMedia, CardContent, Typography,
  Chip, Stack, IconButton, Box, Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToWishlist, removeFromWishlist } from "../../api/wishlistApi";
import { useAuth } from "../../context/AuthContext";
import { useCompare } from "../../context/CompareContext";

function CarCard({ car, wishlistIds = [] }) {
  const { user } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare, compareList } = useCompare();
  const carId = car._id || car.id;
  const [isWishlisted, setIsWishlisted] = useState(wishlistIds.includes(carId));
  const [loading, setLoading] = useState(false);
  const inCompare = isInCompare(carId);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { window.location.href = "/login"; return; }
    try {
      setLoading(true);
      if (isWishlisted) {
        await removeFromWishlist(carId);
        setIsWishlisted(false);
      } else {
        await addToWishlist(carId);
        setIsWishlisted(true);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(carId);
    } else {
      addToCompare(car);
    }
  };

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
        position: "relative",
        border: inCompare ? "2px solid #4e6ef2" : "2px solid transparent",
      }}
    >
      {/* Heart Icon */}
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
       <IconButton
  onClick={handleWishlist}
  onTouchStart={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  disabled={loading}
  sx={{
    bgcolor: "rgba(255,255,255,0.9)",
    "&:hover": { bgcolor: "white" },
    p: 0.8,
  }}
>
        
        </IconButton>
      </Box>

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

        {/* Compare Button */}
        <Button
          onClick={handleCompare}
          variant={inCompare ? "contained" : "outlined"}
          size="small"
          fullWidth
          disabled={!inCompare && compareList.length >= 3}
          sx={{ mt: 1.5, borderRadius: 1.5, fontSize: "0.75rem" }}
        >
          {inCompare ? "✓ Added to Compare" : compareList.length >= 3 ? "Max 3 Cars" : "+ Compare"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default CarCard;