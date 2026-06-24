import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container, Grid, Typography, Box, Button, CircularProgress, Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getWishlist } from "../api/wishlistApi";
import { useAuth } from "../context/AuthContext";
import CarCard from "../components/cars/CarCard";

function Wishlist() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const loadWishlist = async () => {
      try {
        const res = await getWishlist();
        setCars(res.data);
      } catch (err) {
        setError("Failed to load wishlist.");
      } finally {
        setLoading(false);
      }
    };
    loadWishlist();
  }, [user, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <FavoriteIcon sx={{ color: "#e94560", fontSize: 32 }} />
        <Typography variant="h4" fontWeight={800}>
          My Wishlist
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {cars.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <FavoriteIcon sx={{ fontSize: 64, color: "#e2e8f0", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Browse cars and click the ❤️ to save your favorites
          </Typography>
          <Button component={Link} to="/cars" variant="contained">
            Browse Cars
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid key={car._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <CarCard car={car} wishlistIds={cars.map((c) => c._id)} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Wishlist;