import { Box, Button, Typography, Stack, Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";

function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: "#0f172a",
        borderTop: "3px solid #4e6ef2",
        py: 2,
        px: 3,
        boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        {/* Selected Cars */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Typography variant="body2" color="white" fontWeight={700} sx={{ mr: 1 }}>
            Compare ({compareList.length}/3):
          </Typography>
          {compareList.map((car) => (
            <Box
              key={car._id || car.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#1e293b",
                borderRadius: 2,
                px: 1.5,
                py: 0.8,
              }}
            >
              <Avatar
                src={car.images?.[0] || car.image}
                variant="rounded"
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="caption" color="white" fontWeight={600} noWrap sx={{ maxWidth: 100 }}>
                {car.brand} {car.model}
              </Typography>
              <IconButton
                size="small"
                onClick={() => removeFromCompare(car._id || car.id)}
                sx={{ color: "#94a3b8", p: 0.3, "&:hover": { color: "white" } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}

          {/* Empty slots */}
          {[...Array(3 - compareList.length)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 120,
                height: 40,
                border: "1px dashed #334155",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" color="#64748b">
                + Add Car
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            size="small"
            onClick={clearCompare}
            sx={{ color: "#94a3b8", borderColor: "#334155" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={compareList.length < 2}
            onClick={() => navigate("/compare")}
            sx={{ px: 3 }}
          >
            Compare Now
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CompareBar;