import React from "react";

import clubsData from "../data/clubs.json";
import spearsData from "../data/spears.json";

import GenericComparator from "./GenericComparator";

const weaponData = { ...clubsData, ...spearsData };

const WeaponsComparator = () => {
  return <GenericComparator title="Weapon" data={weaponData} />;
};

export default WeaponsComparator;
