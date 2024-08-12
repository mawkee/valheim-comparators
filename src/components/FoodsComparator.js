import React from "react";

import foodsData from "../data/foods.json";

import GenericComparator from "./GenericComparator";

const FoodsComparator = () => {
  return <GenericComparator title="Food" data={foodsData} />;
};

export default FoodsComparator;
