"use client";

import React from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TON_CONNECT_UI_MANIFEST_URL } from "@/shared/lib/constants";

export const TonConnectUiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TonConnectUIProvider manifestUrl={TON_CONNECT_UI_MANIFEST_URL}>
      {children}
    </TonConnectUIProvider>
  );
};
