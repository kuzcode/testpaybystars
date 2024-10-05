import React from "react";
import { useSearchParams } from "next/navigation";

export const useCustomHref = (href: string) => {
  const sp = useSearchParams();

  const [searchParams, setSearchParams] = React.useState("");

  React.useEffect(() => {
    setSearchParams("?" + sp.toString());
  }, [sp]);

  const customHref = href + searchParams;

  return customHref;
};
