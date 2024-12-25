import React from "react";

import { isIOS } from "../lib/isIOS";

export const useInputFocusListener = () => {
  const handleFocus = () => {
    if (!isIOS()) return;
    document.body.style.paddingBottom = "200px";
  };

  const handleBlur = () => (document.body.style.paddingBottom = "0");
  React.useEffect(() => {
    // Attach event listeners
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    // Clean up listeners on unmount
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);
};
