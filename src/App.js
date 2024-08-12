import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import ArmorComparator from "./components/ArmorComparator";
import FoodsComparator from "./components/FoodsComparator";
import HomePage from "./components/HomePage";
import ShieldsComparator from "./components/ShieldsComparator";
import WeaponsComparator from "./components/WeaponsComparator";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weapons/" element={<WeaponsComparator />} />
        <Route path="/shields/" element={<ShieldsComparator />} />
        <Route path="/armor/" element={<ArmorComparator />} />
        <Route path="/foods/" element={<FoodsComparator />} />
      </Routes>
      <Box position="fixed" top={16} right={16} zIndex={9}>
        <Fab color="primary" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </Fab>
      </Box>
    </ThemeProvider>
  );
}

export default App;
