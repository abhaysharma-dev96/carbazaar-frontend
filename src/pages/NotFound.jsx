import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

function NotFound() {
  return (
    <Container sx={{ py: 12, textAlign: "center" }}>
      <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Box>
        <Button component={Link} to="/" variant="contained" size="large">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;