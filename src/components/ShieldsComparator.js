import React from "react";

import shieldsData from "../data/shields.json";

import GenericComparator from "./GenericComparator";

const ShieldsComparator = () => {
  return <GenericComparator title="Shield" data={shieldsData} maxLevel={3} />;
};

export default ShieldsComparator;
