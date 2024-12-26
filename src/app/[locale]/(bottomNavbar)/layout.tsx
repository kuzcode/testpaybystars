"use client";

import React from "react";

import { useFetchProfile } from "@/shared/hooks/useFetchProfile";
import { useNavigationListener } from "@/shared/hooks/useNavigationListener";
import { BottomNavigationBar } from "@/widgets/bottomNavigationBar";

const BottomNavbarLayout = ({ children }: { children: React.ReactNode }) => {
  useFetchProfile();
  useNavigationListener();

  return (
    <div>
      {children}
      <BottomNavigationBar />
    </div>
  );
};

export default BottomNavbarLayout;
