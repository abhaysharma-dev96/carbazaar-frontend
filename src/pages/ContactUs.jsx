import { useState } from "react";
import {
  Container, Grid, Typography, Paper, TextField,
  Button, Box, Alert, Stack, Chip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { submitContact } from "../api/contactApi";

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

const fieldSx = {
  "& .MuiInputBase-root": { color: C.text, bgcolor: C.surface2, borderRadius: "4px" },
  "& .MuiInputLabel-root": { color: C.textMuted },
  "& .MuiInputLabel-root.Mui-focused": { color: C.accent },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: C.border },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: C.accent },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: C.accent },
  "& .MuiFormHelperText-root": { color: C.textMuted },
};

const initialForm = { name: "", email: "", phone: "", message: "" };

const channels = [
  {
    icon: <WhatsAppIcon sx={{ fontSize: 22 }} />,
    label: "WhatsApp", value: "+91 98765 43210", note: "Chat with us instantly",
    href: "https://wa.me/919876543210", external: true,
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 22 }} />,
    label: "Phone", value: "+91 98765 43210", note: "Mon–Sat, 9AM–6PM",
    href: "tel:+919876543210",
  },
  {
    icon: <EmailIcon sx={{ fontSize: 22 }} />,
    label: "Email", value: "support@carbazaar.com", note: "We reply within 2 hours",
    href: "mailto:support@carbazaar.com",
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 22 }} />,
    label: "Location", value: "Jaipur, Rajasthan, India", note: "Serving PAN India",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 22 }} />,
    label: "Working hours", value: "Mon – Sat: 9AM – 6PM", note: "Sunday: Closed",
  },
];

function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Required";
    else if (form.name.trim().length < 2) newErrors.name = "Enter a valid name";
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Required";
    else if (form.message.trim().length < 10) newErrors.message = "Message is too short";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      setServerError("");
      await submitContact(form);
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: C.bg }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          bgcolor: C.bg,
          py: { xs: 6, md: 10 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${C.border}`,
          "&::before": {
            content: '""',
            position: "absolute",
            width: 400, height: 400,
            borderRadius: "50%",
            background: "rgba(201,146,47,0.06)",
            top: -140, right: -100,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            label="GET IN TOUCH"
            sx={{
              mb: 3, bgcolor: "rgba(201,146,47,0.10)", color: C.accent,
              fontFamily: monoFont, fontWeight: 600, letterSpacing: 0.5,
              border: `1px solid ${C.accent}`, borderRadius: "4px", fontSize: "0.7rem",
            }}
          />
          <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: { xs: 28, sm: 38 }, textTransform: "uppercase", color: C.text, mb: 1.5 }}>
            We'd love to hear from you
          </Typography>
          <Typography sx={{ color: C.textMuted, fontSize: "1.05rem", maxWidth: 500, mx: "auto" }}>
            Have a question, want to list your business, or need help? Our team is ready to assist you.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Left — Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: 22, textTransform: "uppercase", color: C.text, mb: 1 }}>
              Contact information
            </Typography>
            <Typography sx={{ color: C.textMuted, mb: 4 }}>
              Reach out to us through any of these channels — we typically respond within 2 hours.
            </Typography>

            <Stack spacing={2}>
              {channels.map((c) => {
                const Wrapper = c.href ? Paper : Paper;
                return (
                  <Paper
                    key={c.label}
                    component={c.href ? "a" : "div"}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    sx={{
                      p: 2.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      textDecoration: "none",
                      bgcolor: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: "6px",
                      cursor: c.href ? "pointer" : "default",
                      transition: "border-color 0.2s",
                      "&:hover": c.href ? { borderColor: C.accent } : {},
                    }}
                  >
                    <Box sx={{ border: `1px solid ${C.accent}`, color: C.accent, borderRadius: "6px", p: 1.2, display: "flex" }}>
                      {c.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: monoFont, fontSize: 10.5, letterSpacing: 1, color: C.textMuted }}>
                        {c.label.toUpperCase()}
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: C.text }}>{c.value}</Typography>
                      <Typography sx={{ fontSize: 12, color: C.textMuted }}>{c.note}</Typography>
                    </Box>
                  </Paper>
                );
              })}
            </Stack>
          </Grid>

          {/* Right — Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: "6px",
                bgcolor: C.surface,
                border: `1px solid ${C.border}`,
              }}
            >
              <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: 22, textTransform: "uppercase", color: C.text, mb: 1 }}>
                Send us a message
              </Typography>
              <Typography sx={{ color: C.textMuted, mb: 4 }}>
                Fill in the form below and we'll get back to you as soon as possible.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: "6px", bgcolor: "#1C3324", color: "#8FD6A5", border: "1px solid #2E5C3C" }} onClose={() => setSubmitted(false)}>
                  Your message has been sent. We'll get back to you within 2 hours.
                </Alert>
              )}
              {serverError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "6px", bgcolor: "#3A1F1F", color: "#F1B4B4", border: "1px solid #5C2E2E" }} onClose={() => setServerError("")}>
                  {serverError}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth label="Your name" value={form.name}
                      onChange={handleChange("name")}
                      error={!!errors.name} helperText={errors.name} sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth label="Your email" value={form.email}
                      onChange={handleChange("email")}
                      error={!!errors.email} helperText={errors.email} sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth label="Phone number (optional)" value={form.phone}
                      onChange={handleChange("phone")} sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth multiline rows={5} label="Message" value={form.message}
                      onChange={handleChange("message")}
                      error={!!errors.message} helperText={errors.message}
                      placeholder="Tell us how we can help you..." sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit" size="large"
                      disabled={loading}
                      sx={{
                        px: 5, py: 1.2, fontSize: "1rem", borderRadius: "4px", boxShadow: "none",
                        bgcolor: C.accent, color: "#1A1300", fontWeight: 600,
                        "&:hover": { bgcolor: C.accentDark, boxShadow: "none" },
                        "&.Mui-disabled": { bgcolor: C.surface2, color: C.textMuted },
                      }}
                    >
                      {loading ? "Sending..." : "Send message →"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactUs;