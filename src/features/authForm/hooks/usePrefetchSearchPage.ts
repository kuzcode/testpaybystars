import React from "react";
import { useRouter } from "next/navigation";

export const usePrefetchSearchPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      router.prefetch("/search");
    }
  }, [router]);
};
