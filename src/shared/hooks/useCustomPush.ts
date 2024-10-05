import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const useCustomPush = () => {
  const sp = useSearchParams();
  const router = useRouter();

  const [searchParams, setSearchParams] = React.useState("");

  React.useEffect(() => {
    setSearchParams("?" + sp.toString());
  }, [sp]);

  const push = (href: string) => {
    router.push(href + searchParams);
  };

  return push;
};
