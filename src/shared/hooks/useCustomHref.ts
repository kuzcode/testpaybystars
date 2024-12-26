import { useSearchParams } from "next/navigation";
import React from "react";

export const useCustomHref = (href: string) => {
  const sp = useSearchParams();

  const [searchParams, setSearchParams] = React.useState("");

  React.useEffect(() => {
    setSearchParams("?" + sp.toString());
  }, [sp]);

  const customHref = href + searchParams;

  return customHref;
};
