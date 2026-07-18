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

const fieldSx = {
  "& .MuiInputBase-root": { color: C.text, bgcolor: C.surface2, borderRadius: "4px" },
  "& .MuiInputLabel-root": { color: C.textMuted },
  "& .MuiInputLabel-root.Mui-focused": { color: C.accent },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: C.border },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: C.accent },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: C.accent },
  "& .MuiFormHelperText-root": { color: C.textMuted },
  "& .MuiSvgIcon-root": { color: C.textMuted },
};

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
        bgcolor: C.bg,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: 500, height: 500,
          borderRadius: "50%",
          background: "rgba(201,146,47,0.06)",
          top: -170, right: -150,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: "6px",
            bgcolor: C.surface,
            border: `1px solid ${C.border}`,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 56, height: 56,
                border: `1px solid ${C.accent}`,
                borderRadius: "6px",
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 2,
              }}
            >
              <DirectionsCarFilledIcon sx={{ color: C.accent, fontSize: 28 }} />
            </Box>
            <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: 28, textTransform: "uppercase", color: C.text, mb: 0.5 }}>
              Create account
            </Typography>
            <Typography sx={{ color: C.textMuted }}>
              Join CarBazaar to buy and sell cars
            </Typography>
          </Box>

          {serverError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "6px", bgcolor: "#3A1F1F", color: "#F1B4B4", border: "1px solid #5C2E2E" }} onClose={() => setServerError("")}>
              {serverError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full name"
              sx={{ mb: 3, ...fieldSx }}
              value={form.name}
              onChange={handleChange("name")}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: C.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email address"
              sx={{ mb: 3, ...fieldSx }}
              value={form.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: C.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              sx={{ mb: 1, ...fieldSx }}
              value={form.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password || "At least 6 characters"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: C.textMuted }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff sx={{ color: C.textMuted }} /> : <Visibility sx={{ color: C.textMuted }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} sx={{ color: "#1A1300" }} /> : null}
              sx={{
                mt: 3, py: 1.5, fontSize: "1rem", borderRadius: "4px", boxShadow: "none",
                bgcolor: C.accent, color: "#1A1300", fontWeight: 600,
                "&:hover": { bgcolor: C.accentDark, boxShadow: "none" },
                "&.Mui-disabled": { bgcolor: C.surface2, color: C.textMuted },
              }}
            >
              {loading ? "Creating account..." : "Sign up"}
            </Button>
          </Box>

          <Typography textAlign="center" sx={{ mt: 4, color: C.textMuted }}>
            Already have an account?{" "}
            <Box
              component={Link}
              to="/login"
              sx={{ color: C.accent, fontWeight: 600, textDecoration: "none" }}
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