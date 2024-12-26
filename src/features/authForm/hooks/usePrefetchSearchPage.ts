import { useRouter } from "next/navigation";
import React from "react";

export const usePrefetchSearchPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      router.prefetch("/search");
    }
  }, [router]);
};
