"use client";

import React from "react";
import { BottomNavigationBar } from "@/widgets/bottomNavigationBar";
import { useFetchProfile } from "@/shared/hooks/useFetchProfile";
import { getUserInLikes, getUserOutLikes } from "@/shared/api/usersApi";

const BottomNavbarLayout = ({ children }: { children: React.ReactNode }) => {
  useFetchProfile();

  React.useEffect(() => {
    getUserInLikes();
    getUserOutLikes();
  }, []);

  return (
    <div>
      {children}
      <BottomNavigationBar />
    </div>
  );
};

export default BottomNavbarLayout;
