"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import  store  from "../stores/store";

type ProviderProps = {
  children: ReactNode;
};

function ProviderClientWrapper({ children }: ProviderProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  return (
    <Provider store={store}>
      {isBrowser && children}
    </Provider>
  );
}

export default ProviderClientWrapper;
