import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { submitContact } from "../api/contactApi";

const initialForm = { name: "", email: "", message: "" };

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

  const contactInfo = [
    { icon: <EmailIcon color="primary" />, label: "Email", value: "support@carbazaar.com" },
    { icon: <PhoneIcon color="primary" />, label: "Phone", value: "+91 98765 43210" },
    { icon: <LocationOnIcon color="primary" />, label: "Address", value: "Jaipur, Rajasthan, India" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Contact Us
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Have a question or need help? Reach out to us anytime.
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {contactInfo.map((info) => (
              <Paper
                key={info.label}
                sx={{ p: 3, display: "flex", alignItems: "flex-start", gap: 2 }}
              >
                {info.icon}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {info.label}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {info.value}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Contact Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4 }}>
            {submitted && (
              <Alert
                severity="success"
                sx={{ mb: 3 }}
                onClose={() => setSubmitted(false)}
              >
                Your message has been sent! We'll get back to you soon.
              </Alert>
            )}
            {serverError && (
  <Alert severity="error" sx={{ mb: 3 }} onClose={() => setServerError("")}>
    {serverError}
  </Alert>
)}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={form.name}
                    onChange={handleChange("name")}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    value={form.email}
                    onChange={handleChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Message"
                    value={form.message}
                    onChange={handleChange("message")}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                 <Button type="submit" variant="contained" size="large" disabled={loading}>
  {loading ? "Sending..." : "Send Message"}
</Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactUs;