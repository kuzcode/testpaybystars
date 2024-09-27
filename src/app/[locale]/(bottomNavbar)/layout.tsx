"use client";

import React from "react";
import { BottomNavigationBar } from "@/widgets/bottomNavigationBar";
import { useFetchProfile } from "@/shared/hooks/useFetchProfile";

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
