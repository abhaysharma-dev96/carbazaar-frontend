import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Button, Container, Typography, Stack, Grid,
  TextField, InputAdornment, Card, Avatar, Chip, CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CarCard from "../components/cars/CarCard";
import { fetchCars } from "../api/carApi";

const categories = [
  { label: "SUV", icon: "🚙", count: "320+" },
  { label: "Sedan", icon: "🚗", count: "210+" },
  { label: "Hatchback", icon: "🚘", count: "180+" },
];

const stats = [
  { value: "10,000+", label: "Cars Listed" },
  { value: "50,000+", label: "Happy Buyers" },
  { value: "100+", label: "Cities Covered" },
  { value: "4.8★", label: "Avg. Rating" },
];

const whyUs = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 36, color: "#4e6ef2" }} />,
    title: "Verified Listings",
    desc: "Every car is manually verified for authenticity before it goes live.",
  },
  {
    icon: <PriceCheckIcon sx={{ fontSize: 36, color: "#4e6ef2" }} />,
    title: "Best Price Guarantee",
    desc: "We ensure you get the most competitive price in the market.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 36, color: "#4e6ef2" }} />,
    title: "24/7 Support",
    desc: "Our team is available round the clock to assist buyers and sellers.",
  },
];

const testimonials = [
  { name: "Rahul Sharma", city: "Delhi", text: "Found my dream car within 2 days. Smooth experience!", avatar: "R" },
  { name: "Priya Mehra", city: "Mumbai", text: "Sold my old Swift in less than a week at a great price.", avatar: "P" },
  { name: "Amit Verma", city: "Jaipur", text: "Trusted platform, genuine sellers, zero hassle.", avatar: "A" },
];

const brands = ["Maruti", "Hyundai", "Honda", "Tata", "Mahindra", "Toyota", "Kia", "Skoda", "Volkswagen", "Ford"];

function Home() {
  const [search, setSearch] = useState("");
const [featuredCars, setFeaturedCars] = useState([]);
const [loadingFeatured, setLoadingFeatured] = useState(true);

useEffect(() => {
  const loadFeatured = async () => {
    try {
      const res = await fetchCars({});
      setFeaturedCars(res.data.slice(0, 3));
    } catch (err) {
      console.error("Failed to load featured cars:", err);
    } finally {
      setLoadingFeatured(false);
    }
  };
  loadFeatured();
}, []);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) navigate(`/cars?q=${encodeURIComponent(search)}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/cars?category=${category.toLowerCase()}`);
  };

  return (
    <Box>
      {/* HERO */}
      <Box
        sx={{
          minHeight: { xs: "65vh", md: "75vh" },
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e2d6e 100%)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            width: 600, height: 600,
            borderRadius: "50%",
            background: "rgba(78,110,242,0.1)",
            top: -200, right: -200, zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: 400, height: 400,
            borderRadius: "50%",
            background: "rgba(30,45,110,0.3)",
            bottom: -100, left: -100, zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                label="🇮🇳 India's Most Trusted Car Marketplace"
                sx={{
                  mb: 3,
                  bgcolor: "rgba(78,110,242,0.15)",
                  color: "#a5b4fc",
                  fontWeight: 600,
                  border: "1px solid rgba(78,110,242,0.3)",
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  lineHeight: 1.2, mb: 2,
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  color: "#ffffff",
                  fontWeight: 800,
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                Find Your Perfect{" "}
                <Box component="span" sx={{ color: "#a5b4fc" }}>
                  Used Car
                </Box>{" "}
                Today
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "#94a3b8", mb: 4, lineHeight: 1.8, fontSize: "1.1rem" }}
              >
                Buy, sell and explore thousands of verified second-hand cars at the best prices — right in your city.
              </Typography>

              <Box
                sx={{
                  bgcolor: "white", borderRadius: 2, p: 0.6,
                  display: "flex", alignItems: "center",
                  mb: 4, boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search by brand, model, city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  variant="standard"
                  sx={{ px: 2, py: 0.5 }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained" onClick={handleSearch} size="large"
                  sx={{ borderRadius: 1.5, px: 4, whiteSpace: "nowrap" }}
                >
                  Search
                </Button>
              </Box>

              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button
                  component={Link} to="/cars"
                  variant="contained" size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Explore Cars
                </Button>
                <Button
                  component={Link} to="/sell"
                  variant="outlined" size="large"
                  sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)", "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" } }}
                >
                  Sell Your Car
                </Button>
              </Stack>
              <Stack
  direction="row"
  spacing={4}
  sx={{ mt: 4 }}
>
  <Box>
    <Typography
      variant="h5"
      fontWeight={800}
      color="white"
    >
      500+
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "#94a3b8" }}
    >
      Cars Listed
    </Typography>
  </Box>

  <Box>
    <Typography
      variant="h5"
      fontWeight={800}
      color="white"
    >
      100+
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "#94a3b8" }}
    >
      Happy Buyers
    </Typography>
  </Box>

  <Box>
    <Typography
      variant="h5"
      fontWeight={800}
      color="white"
    >
      24/7
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "#94a3b8" }}
    >
      Support
    </Typography>
  </Box>
</Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute", inset: -16, borderRadius: 5,
                    background: "linear-gradient(135deg, rgba(78,110,242,0.3), rgba(30,45,110,0.3))",
                    zIndex: 0,
                  }}
                />
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                  alt="Car" loading="lazy"
                  sx={{
                    width: "100%", borderRadius: 4,
                    position: "relative", zIndex: 1,
                    boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
                    transition: "transform 0.4s ease",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

     

      {/* BRANDS MARQUEE */}
      <Box sx={{ bgcolor: "#f8fafc", py: 2, overflow: "hidden", borderBottom: "1px solid #f0f0f0" }}>
        <Stack
          direction="row" spacing={4}
          sx={{
            animation: "scroll 20s linear infinite",
            whiteSpace: "nowrap",
            "@keyframes scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <Typography key={i} variant="body2" fontWeight={600}
              sx={{ color: "#94a3b8", flexShrink: 0, px: 2 }}
            >
              {brand} •
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* CATEGORIES */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip label="Categories" sx={{ bgcolor: "rgba(78,110,242,0.1)", color: "#4e6ef2", mb: 2 }} />
          <Typography variant="h4" fontWeight={800} gutterBottom>Browse by Category</Typography>
          <Typography color="text.secondary">Choose the type of car you're looking for</Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid key={cat.label} size={{ xs: 12, sm: 4 }}>
              <Card
                onClick={() => handleCategoryClick(cat.label)}
                sx={{
                  cursor: "pointer", textAlign: "center", py: 5,
                  border: "2px solid #f0f0f0",
                  transition: "all 0.25s",
                  "&:hover": {
                    borderColor: "#4e6ef2",
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(78,110,242,0.12)",
                  },
                }}
              >
                <Typography sx={{ fontSize: 52, mb: 1 }}>{cat.icon}</Typography>
                <Typography variant="h6" fontWeight={700}>{cat.label}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {cat.count} Cars Available
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURED CARS */}
     <Box sx={{ bgcolor: "#f8fafc", py: 6 }}>
  <Container maxWidth="xl">
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} sx={{ mb: 5 }}>
      <Box>
        <Chip label="Featured" sx={{ bgcolor: "rgba(78,110,242,0.1)", color: "#4e6ef2", mb: 1 }} />
        <Typography variant="h4" fontWeight={800}>Featured Cars</Typography>
        <Typography color="text.secondary">Handpicked quality cars just for you</Typography>
      </Box>
      <Button
        component={Link} to="/cars" variant="outlined"
        endIcon={<ArrowForwardIcon />}
        sx={{ mt: { xs: 2, sm: 0 }, borderColor: "#4e6ef2", color: "#4e6ef2", "&:hover": { bgcolor: "rgba(78,110,242,0.05)", borderColor: "#4e6ef2" } }}
      >
        View All Cars
      </Button>
    </Stack>

    <Grid container spacing={3}>
      {loadingFeatured ? (
        <Grid size={{ xs: 12 }} sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Grid>
      ) : featuredCars.length === 0 ? (
        <Grid size={{ xs: 12 }}>
          <Typography color="text.secondary" textAlign="center">
            No cars listed yet. Be the first to{" "}
            <Box component={Link} to="/sell" sx={{ color: "#4e6ef2", fontWeight: 600 }}>
              sell your car
            </Box>
            !
          </Typography>
        </Grid>
      ) : (
        featuredCars.map((car) => (
          <Grid key={car._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CarCard car={car} />
          </Grid>
        ))
      )}
    </Grid>
  </Container>
</Box>

      {/* WHY CHOOSE US */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip label="Why Us" sx={{ bgcolor: "rgba(78,110,242,0.1)", color: "#4e6ef2", mb: 2 }} />
          <Typography variant="h4" fontWeight={800} gutterBottom>Why Choose CarBazaar?</Typography>
          <Typography color="text.secondary">We make buying and selling cars simple, safe and transparent</Typography>
        </Box>

        <Grid container spacing={4}>
          {whyUs.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 4 }}>
              <Card
                sx={{
                  p: 4, textAlign: "center", height: "100%",
                  border: "1px solid #f0f0f0",
                  transition: "all 0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 40px rgba(78,110,242,0.1)",
                    borderColor: "#4e6ef2",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>{item.title}</Typography>
                <Typography color="text.secondary" variant="body2" lineHeight={1.7}>{item.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* TESTIMONIALS */}
      <Box sx={{ bgcolor: "#0f172a", py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Chip label="Testimonials" sx={{ bgcolor: "rgba(78,110,242,0.15)", color: "#a5b4fc", mb: 2 }} />
            <Typography variant="h4" fontWeight={800} color="white" gutterBottom>What Our Users Say</Typography>
            <Typography sx={{ color: "#64748b" }}>Real stories from real buyers and sellers</Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((t) => (
              <Grid key={t.name} size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    p: 3, bgcolor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.25s",
                    "&:hover": { borderColor: "#4e6ef2", transform: "translateY(-4px)" },
                  }}
                >
                  <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Typography key={i} sx={{ color: "#f59e0b", fontSize: 16 }}>★</Typography>
                    ))}
                  </Stack>
                  <Typography sx={{ color: "#94a3b8", mb: 3, lineHeight: 1.8 }}>"{t.text}"</Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: "#4e6ef2", fontWeight: 700 }}>{t.avatar}</Avatar>
                    <Box>
                      <Typography fontWeight={700} color="white" variant="body2">{t.name}</Typography>
                      <Typography variant="caption" sx={{ color: "#64748b" }}>{t.city}</Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA BANNER */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4e6ef2 0%, #3a55d4 100%)",
          py: 8, textAlign: "center",
          position: "relative", overflow: "hidden",
          "&::before": {
            content: '""', position: "absolute",
            width: 400, height: 400, borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.05)",
            top: -200, right: -100,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h4" fontWeight={800} color="white" gutterBottom>
            Ready to Sell Your Car?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", mb: 4, fontSize: "1.1rem" }}>
            List your car in under 5 minutes and reach thousands of genuine buyers today.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              component={Link} to="/sell" size="large"
              sx={{ bgcolor: "white", color: "#4e6ef2", fontWeight: 700, px: 5, "&:hover": { bgcolor: "#f8fafc" } }}
            >
              List My Car Now
            </Button>
            <Button
              component={Link} to="/cars" size="large" variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white", px: 5, "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Browse Cars
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;