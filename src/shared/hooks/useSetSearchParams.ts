import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSetSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setSearchParams = (key: string, value: string) => {
    router.push(pathname + "?" + createQueryString(key, value));
  };

  return setSearchParams;
};
