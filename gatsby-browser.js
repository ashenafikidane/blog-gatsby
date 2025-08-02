import React from "react";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./src/state/store";
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => {
  return (
    <HelmetProvider>
      <Provider store={store}>{element}</Provider>
    </HelmetProvider>
  );
};
