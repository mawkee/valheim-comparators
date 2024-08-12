import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { comparisonAlgorithms, statOrder } from "../statsConfig";

const GenericComparator = ({ title, data, maxLevel = 4 }) => {
  const [itemA, setItemA] = useState({ name: "", level: "" });
  const [itemB, setItemB] = useState({ name: "", level: "" });
  const [itemAData, setItemAData] = useState({});
  const [itemBData, setItemBData] = useState({});
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  const navigate = useNavigate();

  const getItemData = useCallback(
    (name, level) => {
      const item = data[name] || {};
      const commonData = item.common || {};
      const levelData = level ? item.levels?.[level] || {} : {};
      return { ...commonData, ...levelData };
    },
    [data]
  );

  useEffect(() => {
    if (itemA.name) {
      const data = getItemData(itemA.name, itemA.level);
      if (JSON.stringify(itemAData) !== JSON.stringify(data)) {
        setItemAData(data);
      }
    }
  }, [itemA.name, itemA.level, itemAData, getItemData]);

  useEffect(() => {
    if (itemB.name) {
      const data = getItemData(itemB.name, itemB.level);
      if (JSON.stringify(itemBData) !== JSON.stringify(data)) {
        setItemBData(data);
      }
    }
  }, [itemB.name, itemB.level, itemBData, getItemData]);

  const handleItemAChange = (e) => {
    const name = e.target.value;
    const level = itemHasLevels(name)
      ? Object.keys(data[name]?.levels || [])[0]
      : "";
    setItemA({ name, level });
  };

  const handleLevelAChange = (e) => {
    const level = e.target.value;
    setItemA((prev) => ({ ...prev, level }));
  };

  const handleItemBChange = (e) => {
    const name = e.target.value;
    const level = itemHasLevels(name)
      ? Object.keys(data[name]?.levels || [])[0]
      : "";
    setItemB({ name, level });
  };

  const handleLevelBChange = (e) => {
    const level = e.target.value;
    setItemB((prev) => ({ ...prev, level }));
  };

  const handleToggle = () => {
    setOnlyDifferences((prev) => !prev);
  };

  const compareValues = (stat, valueA, valueB) => {
    const algorithm = comparisonAlgorithms[stat] || "biggerIsBetter";
    switch (algorithm) {
      case "text":
        return 0;
      case "biggerIsBetter":
        return valueB - valueA;
      case "lowerIsBetter":
        return valueA - valueB;
      case "percentBiggerIsBetter":
      case "percentLowerIsBetter": {
        const aValue = parseFloat((valueA || "").replace("%", ""));
        const bValue = parseFloat((valueB || "").replace("%", ""));
        if (algorithm === "percentBiggerIsBetter") {
          return bValue - aValue;
        } else {
          return aValue - bValue;
        }
      }
      default:
        return 0;
    }
  };

  const itemHasLevels = (name) => data[name]?.levels;

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box
        display="flex"
        alignItems="center"
        bgcolor="background.paper"
        p={2}
        position="sticky"
        top={0}
        zIndex={1}
      >
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" align="center" flexGrow={1}>
          {title} Comparator
        </Typography>
      </Box>

      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <Typography variant="h5" align="center">
            {title} A
          </Typography>
          <Box display="flex">
            <Box flex={1}>
              <FormControl fullWidth margin="normal">
                <Select
                  value={itemA.name}
                  onChange={handleItemAChange}
                  displayEmpty
                >
                  {Object.keys(data).map((item) => (
                    <MenuItem key={item} value={item}>
                      {data[item].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {itemA.name && itemHasLevels(itemA.name) && (
                <FormControl fullWidth margin="normal">
                  <Select
                    value={itemA.level}
                    onChange={handleLevelAChange}
                    displayEmpty
                  >
                    {Array.from({ length: maxLevel }, (_, i) => i + 1).map(
                      (lvl) => (
                        <MenuItem key={lvl} value={lvl}>
                          Level {lvl}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100px"
              justifyContent="center"
              ml={2}
              borderRadius="12px"
            >
              {itemA.name ? (
                <img
                  src={`/images/${itemA.name}.webp`}
                  alt={data[itemA.name]?.name || "Item A"}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  onError={(e) => {
                    e.target.src = "/images/default.png";
                  }}
                />
              ) : (
                <Typography variant="caption">No item selected</Typography>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" align="center">
            {title} B
          </Typography>
          <Box display="flex">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100px"
              justifyContent="center"
              ml={2}
              borderRadius="12px"
              marginRight="12px"
            >
              {itemB.name ? (
                <img
                  src={`/images/${itemB.name}.webp`}
                  alt={data[itemB.name]?.name || "Item A"}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  onError={(e) => {
                    e.target.src = "/images/default.png";
                  }}
                />
              ) : (
                <Typography variant="caption">No item selected</Typography>
              )}
            </Box>
            <Box flex={1}>
              <FormControl fullWidth margin="normal">
                <Select
                  value={itemB.name}
                  onChange={handleItemBChange}
                  displayEmpty
                >
                  {Object.keys(data).map((item) => (
                    <MenuItem key={item} value={item}>
                      {data[item].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {itemB.name && itemHasLevels(itemB.name) && (
                <FormControl fullWidth margin="normal">
                  <Select
                    value={itemB.level}
                    onChange={handleLevelBChange}
                    displayEmpty
                  >
                    {Array.from({ length: maxLevel }, (_, i) => i + 1).map(
                      (lvl) => (
                        <MenuItem key={lvl} value={lvl}>
                          Level {lvl}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box flex="1" overflow="auto">
        <Paper
          elevation={3}
          style={{
            padding: "1rem",
            margin: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left">Stat</TableCell>
                <TableCell align="center">{title} A</TableCell>
                <TableCell align="center">{title} B</TableCell>
                <TableCell align="center">Comparison</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">{title}</TableCell>
                <TableCell align="center">
                  {itemA.name ? data[itemA.name].name : ""}
                </TableCell>
                <TableCell align="center">
                  {itemB.name ? data[itemB.name].name : ""}
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              {statOrder
                .filter((stat) => {
                  const valueA = itemAData[stat] || 0;
                  const valueB = itemBData[stat] || 0;
                  const comparisonValue = compareValues(stat, valueA, valueB);
                  return (
                    (valueA !== 0 || valueB !== 0) &&
                    (!onlyDifferences || comparisonValue !== 0)
                  );
                })
                .map((stat) => {
                  const valueA = itemAData[stat] || "";
                  const valueB = itemBData[stat] || "";
                  const comparisonValue = compareValues(stat, valueA, valueB);

                  let styleA = {};
                  let styleB = {};
                  if (comparisonValue > 0) {
                    styleB = { fontWeight: "bold", color: "green" };
                  } else if (comparisonValue < 0) {
                    styleA = { fontWeight: "bold", color: "green" };
                  }

                  return (
                    <TableRow key={stat}>
                      <TableCell align="left">{stat}</TableCell>
                      <TableCell align="center" style={styleA}>
                        {valueA}
                      </TableCell>
                      <TableCell align="center" style={styleB}>
                        {valueB}
                      </TableCell>
                      <TableCell align="center">
                        {comparisonValue > 0
                          ? `+${comparisonValue}`
                          : comparisonValue < 0
                            ? comparisonValue
                            : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Box position="sticky" bottom={0} zIndex={1} p={2} textAlign="center">
        <FormControlLabel
          control={<Switch checked={onlyDifferences} onChange={handleToggle} />}
          label="Show differences only"
        />
      </Box>
    </Box>
  );
};
GenericComparator.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  maxLevel: PropTypes.number,
};

export default GenericComparator;
