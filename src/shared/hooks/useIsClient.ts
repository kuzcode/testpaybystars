"use client";

import React from "react";

// This hook is used to check if the code is running on the client side.
export const useIsClient = () => {
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    setInit(true);
  }, []);

  return init;
};
