"use client";

import { getAccessTokenClient } from "@/shared/lib/cookie";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  React.useEffect(() => {
    const token = getAccessTokenClient();

    if (token) redirect("/search");
    else redirect("/createProfile");
  }, []);

  return null;
}
