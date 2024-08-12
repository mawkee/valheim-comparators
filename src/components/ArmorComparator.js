import React from "react";

import armorData from "../data/armor.json";

import GenericComparator from "./GenericComparator";

const ArmorComparator = () => {
  return <GenericComparator title="Armor" data={armorData} />;
};

export default ArmorComparator;
