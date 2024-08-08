"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const ReactQueryProvider: React.FC<Props> = ({ children }) => {
  const [client] = React.useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
