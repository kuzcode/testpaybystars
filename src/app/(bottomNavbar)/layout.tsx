"use client";

import React from "react";
import { BottomNavigationBar } from "@/widgets/bottomNavigationBar";
import { useFetchProfile } from "@/shared/hooks/useFetchProfile";
// const BottomNavigationBarWithNoSSR = dynamic(
//   () =>
//     import("@/widgets/bottomNavigationBar").then(
//       (mod) => mod.BottomNavigationBar
//     ),
//   {
//     ssr: false,
//   }
// );

const BottomNavbarLayout = ({ children }: { children: React.ReactNode }) => {
  useFetchProfile();

  return (
    <div>
      {children}
      <BottomNavigationBar />
    </div>
  );
};

export default BottomNavbarLayout;
