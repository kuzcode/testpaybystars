"use client";

import { createContext, ReactNode, useState } from "react";
import { TonClient } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useAsyncInitialize } from "../hooks/payment/useAsyncInitialize";
import { useTonConnect } from "../hooks/payment/useTonConnect";

type TonClientProvider = {
  children?: ReactNode;
};

type TonClientContextProviderValue = {
  tonClient: TonClient | undefined;
};

const initialContext = {
  tonClient: undefined,
};

export const TonClientContext =
  createContext<TonClientContextProviderValue>(initialContext);

export const TonClientProvider = ({ children }: TonClientProvider) => {
  const { network } = useTonConnect();
  const [client, setClient] = useState<TonClient>();

  useAsyncInitialize(async () => {
    if (!network) return;

    const endpoint = await getHttpEndpoint({
      network: "mainnet",
    });

    const tonClient = new TonClient({ endpoint });
    console.log(tonClient);
    setClient(tonClient);
  }, [network]);

  return (
    <TonClientContext.Provider value={{ tonClient: client }}>
      {children}
    </TonClientContext.Provider>
  );
};
