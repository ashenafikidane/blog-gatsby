import React from "react";
import { HelmetProvider } from "react-helmet-async";
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => {
  return <HelmetProvider>{element}</HelmetProvider>;
};
