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
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CarCard from "../components/cars/CarCard";
import { fetchCars } from "../api/carApi";

/* ---- design tokens (vehicle-dossier theme, matches CarDetails / CarListing) ---- */
const C = {
  bg: "#14161A",
  surface: "#1C1F24",
  surface2: "#23262C",
  border: "#2C3036",
  accent: "#C9922F",
  accentDark: "#9C701E",
  accentTint: "rgba(201,146,47,0.10)",
  text: "#F1F1EE",
  textMuted: "#9BA1A8",
};
const displayFont = `"Oswald", "Arial Narrow", sans-serif`;
const bodyFont = `"Inter", "Roboto", sans-serif`;
const monoFont = `"IBM Plex Mono", "Roboto Mono", monospace`;

const categories = [
  { label: "Cars", icon: "🚗", count: "500+", filter: "sedan" },
  { label: "SUVs", icon: "🚙", count: "300+", filter: "suv" },
  { label: "Bikes", icon: "🏍️", count: "200+", filter: "sports-bike" },
  { label: "Electric", icon: "⚡", count: "100+", filter: "electric" },
  { label: "Hatchback", icon: "🚘", count: "150+", filter: "hatchback" },
  { label: "Scooters", icon: "🛵", count: "80+", filter: "scooter" },
];

const stats = [
  { value: "10,000+", label: "Vehicles Listed" },
  { value: "50,000+", label: "Happy Buyers" },
  { value: "100+", label: "Cities Covered" },
  { value: "4.8", label: "Avg. Rating" },
];

const whyUs = [
  { icon: <VerifiedIcon sx={{ fontSize: 28 }} />, title: "Verified listings", desc: "Every vehicle is manually verified for authenticity before going live." },
  { icon: <PriceCheckIcon sx={{ fontSize: 28 }} />, title: "Best price guarantee", desc: "Get the most competitive prices with our transparent pricing system." },
  { icon: <SupportAgentIcon sx={{ fontSize: 28 }} />, title: "24/7 support", desc: "Round the clock assistance for both buyers and sellers." },
  { icon: <SecurityIcon sx={{ fontSize: 28 }} />, title: "Secure transactions", desc: "Your data and transactions are fully protected and encrypted." },
  { icon: <SpeedIcon sx={{ fontSize: 28 }} />, title: "Quick listing", desc: "List your vehicle in under 5 minutes with our easy-to-use form." },
  { icon: <HandshakeIcon sx={{ fontSize: 28 }} />, title: "Trusted by thousands", desc: "Join over 50,000 happy buyers and sellers across India." },
];

const testimonials = [
  { name: "Rahul Sharma", city: "Delhi", text: "Found my dream car within 2 days. The verification process gave me complete peace of mind.", avatar: "R", role: "Car buyer" },
  { name: "Priya Mehra", city: "Mumbai", text: "Sold my old Swift in less than a week at a great price. Best platform for sellers.", avatar: "P", role: "Car seller" },
  { name: "Amit Verma", city: "Jaipur", text: "Trusted platform, genuine sellers, zero hassle. Bought my Royal Enfield here.", avatar: "A", role: "Bike buyer" },
  { name: "Sneha Patel", city: "Ahmedabad", text: "The compare feature helped me choose the perfect car within my budget.", avatar: "S", role: "Car buyer" },
];

const brands = ["Maruti", "Hyundai", "Honda", "Hero", "KTM", "Tata", "Mahindra", "Toyota", "Kia", "Skoda", "Royal Enfield", "Bajaj", "TVS", "Yamaha"];

const howItWorks = [
  { step: "01", title: "Search or list", desc: "Browse thousands of verified vehicles or list yours in minutes." },
  { step: "02", title: "Compare and choose", desc: "Use our compare tool to find the best deal that suits your budget." },
  { step: "03", title: "Contact seller", desc: "Directly connect with verified sellers via call or WhatsApp." },
  { step: "04", title: "Complete deal", desc: "Meet, inspect the vehicle and finalize your purchase safely." },
];

function SectionEyebrow({ children }) {
  return (
    <Typography sx={{ fontFamily: monoFont, fontSize: 12, letterSpacing: 2, color: C.accent, mb: 1.5, textAlign: "center" }}>
      {children}
    </Typography>
  );
}

function Home() {
  const [search, setSearch] = useState("");
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const navigate = useNavigate();

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

  const handleSearch = () => {
    if (search.trim()) navigate(`/cars?q=${encodeURIComponent(search)}`);
  };

  const handleCategoryClick = (cat) => {
    navigate(`/cars?category=${cat.filter}`);
  };

  return (
    <Box sx={{ bgcolor: C.bg, fontFamily: bodyFont }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: { xs: "100vh", md: "90vh" },
          bgcolor: C.bg,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${C.border}`,
          "&::before": {
            content: '""',
            position: "absolute",
            width: 700, height: 700,
            borderRadius: "50%",
            background: "rgba(201,146,47,0.05)",
            top: -260, right: -200, zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: { xs: 6, md: 0 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                label="INDIA'S MOST TRUSTED VEHICLE MARKETPLACE"
                sx={{
                  mb: 3,
                  bgcolor: C.accentTint,
                  color: C.accent,
                  fontFamily: monoFont,
                  fontWeight: 600,
                  border: `1px solid ${C.accent}`,
                  fontSize: "0.7rem",
                  letterSpacing: 0.5,
                  borderRadius: "4px",
                }}
              />
              <Typography
                sx={{
                  lineHeight: 1.15, mb: 2,
                  fontSize: { xs: "2.4rem", md: "3.6rem" },
                  color: C.text,
                  fontFamily: displayFont,
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Find your perfect{" "}
                <Box component="span" sx={{
                  color: C.accent,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4, left: 0, right: 0,
                    height: 3,
                    bgcolor: C.accent,
                    opacity: 0.5,
                  }
                }}>
                  used vehicle
                </Box>{" "}
                today
              </Typography>

              <Typography sx={{ color: C.textMuted, mb: 4, lineHeight: 1.8, fontSize: { xs: "1rem", md: "1.1rem" } }}>
                Buy, sell and explore thousands of verified second-hand cars and bikes at the best prices — right in your city.
              </Typography>

              {/* SEARCH BAR */}
              <Box
                sx={{
                  bgcolor: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "6px",
                  p: 0.6,
                  display: "flex",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search by brand, model, city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  variant="standard"
                  sx={{ px: 2, py: 0.5, "& .MuiInputBase-input": { color: C.text } }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: C.textMuted }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained" onClick={handleSearch}
                  sx={{
                    borderRadius: "4px", px: 4, py: 1.3, whiteSpace: "nowrap", fontSize: "0.95rem",
                    bgcolor: C.accent, color: "#1A1300", fontWeight: 600, boxShadow: "none",
                    "&:hover": { bgcolor: C.accentDark, boxShadow: "none" },
                  }}
                >
                  Search
                </Button>
              </Box>

              <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                <Button
                  component={Link} to="/cars"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 3, py: 1.2, borderRadius: "4px", boxShadow: "none",
                    bgcolor: C.accent, color: "#1A1300", fontWeight: 600,
                    "&:hover": { bgcolor: C.accentDark, boxShadow: "none" },
                  }}
                >
                  Explore vehicles
                </Button>
                <Button
                  component={Link} to="/sell"
                  variant="outlined"
                  sx={{ color: C.text, borderColor: C.border, px: 3, py: 1.2, borderRadius: "4px", "&:hover": { borderColor: C.accent, color: C.accent } }}
                >
                  Sell your vehicle
                </Button>
              </Stack>

              {/* Mini Stats */}
              <Stack direction="row" spacing={4} sx={{ mt: 5 }}>
                {[
                  { value: "10K+", label: "Listings" },
                  { value: "50K+", label: "Buyers" },
                  { value: "4.8", label: "Rating" },
                ].map((s) => (
                  <Box key={s.label}>
                    <Typography sx={{ fontFamily: monoFont, fontWeight: 600, fontSize: 22, color: C.text }}>{s.value}</Typography>
                    <Typography sx={{ fontSize: 12, color: C.textMuted, letterSpacing: 0.5 }}>{s.label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                  alt="Premium car"
                  loading="lazy"
                  sx={{
                    width: "100%", borderRadius: "6px",
                    position: "relative", zIndex: 1,
                    border: `1px solid ${C.border}`,
                  }}
                />
                {/* Floating Badge */}
                <Box
                  sx={{
                    position: "absolute", bottom: 20, left: 20, zIndex: 2,
                    bgcolor: "rgba(20,22,26,0.9)", border: `1px solid ${C.accent}`, borderRadius: "4px", px: 2.5, py: 1.25,
                    display: "flex", alignItems: "center", gap: 1.5,
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#5FA777" }} />
                  <Box>
                    <Typography sx={{ fontFamily: monoFont, fontSize: 10, letterSpacing: 1, color: C.textMuted }}>NEW LISTING</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: C.text }}>Toyota Fortuner • ₹28L</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* BRANDS MARQUEE */}
      {/* <Box sx={{ bgcolor: C.surface, py: 2.5, overflow: "hidden", borderBottom: `1px solid ${C.border}` }}>
        <Stack
          direction="row" spacing={4}
          sx={{
            animation: "scroll 25s linear infinite",
            whiteSpace: "nowrap",
            "@keyframes scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <Typography key={i}
              sx={{ fontFamily: monoFont, fontWeight: 600, fontSize: 13, color: C.textMuted, flexShrink: 0, px: 2, letterSpacing: 1 }}
            >
              {brand} •
            </Typography>
          ))}
        </Stack>
      </Box> */}

      {/* STATS STRIP */}
      <Box sx={{ bgcolor: C.surface2, py: 4, borderBottom: `1px solid ${C.border}` }}>
        <Container maxWidth="xl">
          <Grid container justifyContent="center">
            {stats.map((stat, i) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 3 }}
                sx={{
                  textAlign: "center",
                  borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                  py: 1,
                }}
              >
                <Typography sx={{ fontFamily: monoFont, fontWeight: 600, fontSize: 26, color: C.accent }}>{stat.value}</Typography>
                <Typography sx={{ fontSize: 13, color: C.textMuted, mt: 0.5 }}>{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CATEGORIES */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <SectionEyebrow>BROWSE</SectionEyebrow>
          <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 26, sm: 32 }, textTransform: "uppercase", color: C.text, mb: 1 }}>
            Browse by category
          </Typography>
          <Typography sx={{ color: C.textMuted, maxWidth: 500, mx: "auto" }}>
            Choose from our wide selection of verified cars, bikes, and electric vehicles
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {categories.map((cat) => (
            <Grid key={cat.label} size={{ xs: 6, sm: 4, md: 2 }}>
              <Card
                onClick={() => handleCategoryClick(cat)}
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  py: 3.5, px: 1,
                  border: `1px solid ${C.border}`,
                  bgcolor: C.surface,
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: C.accent,
                    bgcolor: C.surface2,
                  },
                }}
              >
                <Typography sx={{ fontSize: 34, mb: 1 }}>{cat.icon}</Typography>
                <Typography sx={{ fontWeight: 600, color: C.text }}>{cat.label}</Typography>
                <Typography sx={{ fontFamily: monoFont, fontSize: 11, color: C.textMuted }}>{cat.count} available</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURED VEHICLES */}
      <Box sx={{ bgcolor: C.surface, py: 8, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} sx={{ mb: 5 }}>
            <Box>
              <Typography sx={{ fontFamily: monoFont, fontSize: 12, letterSpacing: 2, color: C.accent, mb: 1 }}>FEATURED</Typography>
              <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 24, sm: 30 }, textTransform: "uppercase", color: C.text }}>
                Featured vehicles
              </Typography>
              <Typography sx={{ color: C.textMuted }}>Handpicked quality vehicles just for you</Typography>
            </Box>
            <Button
              component={Link} to="/cars" variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{ mt: { xs: 2, sm: 0 }, borderColor: C.accent, color: C.accent, px: 2.5, py: 0.8, borderRadius: "4px", "&:hover": { bgcolor: C.accentTint, borderColor: C.accent } }}
            >
              View all vehicles
            </Button>
          </Stack>

          <Grid container spacing={3}>
            {loadingFeatured ? (
              <Grid size={{ xs: 12 }} sx={{ textAlign: "center", py: 4 }}>
                <CircularProgress sx={{ color: C.accent }} />
              </Grid>
            ) : featuredCars.length === 0 ? (
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ color: C.textMuted, textAlign: "center" }}>
                  No vehicles listed yet. Be the first to{" "}
                  <Box component={Link} to="/sell" sx={{ color: C.accent, fontWeight: 600 }}>
                    sell your vehicle
                  </Box>
                  .
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
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <SectionEyebrow>WHY US</SectionEyebrow>
          <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 26, sm: 32 }, textTransform: "uppercase", color: C.text, mb: 1 }}>
            Why choose CarBazaar
          </Typography>
          <Typography sx={{ color: C.textMuted, maxWidth: 500, mx: "auto" }}>
            We make buying and selling vehicles simple, safe and transparent
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {whyUs.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  p: 3.5,
                  height: "100%",
                  border: `1px solid ${C.border}`,
                  bgcolor: C.surface,
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: C.accent },
                }}
              >
                <Box
                  sx={{
                    width: 52, height: 52,
                    borderRadius: "6px",
                    border: `1px solid ${C.accent}`,
                    color: C.accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography sx={{ fontWeight: 600, color: C.text, mb: 0.5 }}>{item.title}</Typography>
                <Typography sx={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{item.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* HOW IT WORKS */}
      <Box sx={{ bgcolor: C.surface, py: 8, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <SectionEyebrow>PROCESS</SectionEyebrow>
            <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 26, sm: 32 }, textTransform: "uppercase", color: C.text, mb: 1 }}>
              How it works
            </Typography>
            <Typography sx={{ color: C.textMuted }}>
              Buying or selling a vehicle has never been easier
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {howItWorks.map((item) => (
              <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ p: 3.5, borderRadius: "6px", border: `1px solid ${C.border}`, bgcolor: C.bg, height: "100%", position: "relative", overflow: "hidden" }}>
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: 12, letterSpacing: 1,
                      color: C.accent, mb: 2,
                    }}
                  >
                    {item.step}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, color: C.text, mb: 0.5 }}>{item.title}</Typography>
                  <Typography sx={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{item.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIALS */}
      <Box sx={{ bgcolor: C.bg, py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <SectionEyebrow>TESTIMONIALS</SectionEyebrow>
            <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 26, sm: 32 }, textTransform: "uppercase", color: C.text, mb: 1 }}>
              What our users say
            </Typography>
            <Typography sx={{ color: C.textMuted }}>
              Real stories from real buyers and sellers across India
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((t) => (
              <Grid key={t.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    p: 3, bgcolor: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: "6px",
                    height: "100%",
                    transition: "all 0.2s",
                    "&:hover": { borderColor: C.accent },
                  }}
                >
                  <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Typography key={i} sx={{ color: C.accent, fontSize: 14 }}>★</Typography>
                    ))}
                  </Stack>
                  <Typography sx={{ color: C.textMuted, mb: 3, lineHeight: 1.8, fontSize: "0.9rem" }}>
                    "{t.text}"
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ bgcolor: C.accentTint, color: C.accent, fontWeight: 700, width: 36, height: 36, fontSize: "0.9rem", border: `1px solid ${C.accent}` }}>
                      {t.avatar}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{t.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: C.textMuted }}>{t.role} • {t.city}</Typography>
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
          bgcolor: C.surface2,
          py: 10, textAlign: "center",
          position: "relative", overflow: "hidden",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 28, sm: 34 }, textTransform: "uppercase", color: C.text, mb: 2 }}>
            Ready to buy or sell?
          </Typography>
          <Typography sx={{ color: C.textMuted, mb: 5, fontSize: "1.05rem", maxWidth: 500, mx: "auto" }}>
            Join thousands of happy buyers and sellers. List your vehicle in under 5 minutes.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              component={Link} to="/sell"
              size="large"
              sx={{ bgcolor: C.accent, color: "#1A1300", fontWeight: 600, px: 5, py: 1.3, borderRadius: "4px", boxShadow: "none", "&:hover": { bgcolor: C.accentDark, boxShadow: "none" }, fontSize: "1rem" }}
            >
              List my vehicle
            </Button>
            <Button
              component={Link} to="/cars"
              size="large" variant="outlined"
              sx={{ borderColor: C.border, color: C.text, px: 5, py: 1.3, borderRadius: "4px", "&:hover": { borderColor: C.accent, color: C.accent }, fontSize: "1rem" }}
            >
              Browse vehicles
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
