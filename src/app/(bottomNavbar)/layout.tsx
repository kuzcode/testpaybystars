import { BottomNavigationBar } from "@/widgets/bottomNavigationBar";
import dynamic from "next/dynamic";
import React from "react";
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
  return (
    <div>
      {children}
      <BottomNavigationBar />
    </div>
  );
};

export default BottomNavbarLayout;
