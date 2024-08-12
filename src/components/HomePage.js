import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h3" gutterBottom>
        Valheim Comparisons
      </Typography>
      <Grid container spacing={2} justifyContent="center" mt={2}>
        <Grid item>
          <Button variant="contained" onClick={() => navigate("/weapons/")}>
            Weapons
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => navigate("/shields/")}>
            Shields
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => navigate("/armor/")}>
            Armor
          </Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="body1">
          All data and images were retrieved from the wiki on{" "}
          <a
            href="https://valheim.fandom.com/wiki"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://valheim.fandom.com/wiki
          </a>
          .
        </Typography>
        <Typography variant="body1">
          Let me know if you have any problems or corrections on{" "}
          <a
            href="https://github.com/mawkee/valheim-comparators"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/mawkee/valheim-comparators
          </a>
          .
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
