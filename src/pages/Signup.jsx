import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container, Paper, Typography, TextField, Button,
  Box, Alert, CircularProgress, InputAdornment, IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setServerError("");
      const res = await registerUser(form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e2d6e 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: 500, height: 500,
          borderRadius: "50%",
          background: "rgba(78,110,242,0.1)",
          top: -150, right: -150,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 56, height: 56,
                bgcolor: "#4e6ef2",
                borderRadius: 2.5,
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 2,
              }}
            >
              <DirectionsCarFilledIcon sx={{ color: "white", fontSize: 30 }} />
            </Box>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Create Account
            </Typography>
            <Typography color="text.secondary">
              Join CarBazaar to buy and sell cars
            </Typography>
          </Box>

          {serverError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setServerError("")}>
              {serverError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              sx={{ mb: 3 }}
              value={form.name}
              onChange={handleChange("name")}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              sx={{ mb: 3 }}
              value={form.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              sx={{ mb: 1 }}
              value={form.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password || "At least 6 characters"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </Box>

          <Typography textAlign="center" sx={{ mt: 4 }} color="text.secondary">
            Already have an account?{" "}
            <Box
              component={Link}
              to="/login"
              sx={{ color: "#4e6ef2", fontWeight: 700, textDecoration: "none" }}
            >
              Login
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;