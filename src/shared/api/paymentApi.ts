import { TBlockchainType } from "../types";
import { instance } from "./instance";

const PREFIX = "/users/wallets";

interface IConnectWalletApiProps {
  blockchainType: TBlockchainType;
  walletAddress: string;
}

interface IDisconnectWalletApiProps extends IConnectWalletApiProps {}

export const connectWalletApi = async (data: IConnectWalletApiProps) => {
  const { blockchainType, walletAddress } = data;
  const body = {
    walletAddress,
  };

  const response = await instance.post(
    `${PREFIX}/${blockchainType}/connect`,
    body
  );
  return response.data;
};

export const disconnectWalletApi = async (data: IDisconnectWalletApiProps) => {
  const { blockchainType, walletAddress } = data;
  const body = {
    walletAddress,
  };

  const response = await instance.post(
    `${PREFIX}/${blockchainType}/disconnect`,
    body
  );
  return response.data;
};
