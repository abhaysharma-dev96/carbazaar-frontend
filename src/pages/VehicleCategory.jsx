import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function VehicleCategory() {
  return (
    <Box sx={{ p: 5, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold">
        Browse Vehicles
      </Typography>

      <Stack 
        direction="row" 
        spacing={3} 
        justifyContent="center"
        sx={{ mt: 4 }}
      >

        <Button
          variant="contained"
          component={Link}
          to="/cars"
        >
          Cars
        </Button>


        <Button
          variant="contained"
          component={Link}
          to="/bikes"
        >
          Bikes
        </Button>

      </Stack>
    </Box>
  );
}

export default VehicleCategory;