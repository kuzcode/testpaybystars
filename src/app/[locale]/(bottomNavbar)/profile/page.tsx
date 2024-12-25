import React from "react";

import { Container } from "@/shared/ui/Container";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";

import { BalanceCard } from "./ui/BalanceCard";
import { EditProfileCard } from "./ui/EditProfileCard/ui/EditProfileCard";
import { PaymentNetworkTypesModal } from "./ui/modals/PaymentNetworkTypesModal";
import { ProfileImageRemoveConfirmationModal } from "./ui/modals/ProfileImageRemoveConfirmationModal";
import { WalletState } from "./ui/WalletState";

const Profile = () => {
  return (
    <Page disableHeightLimit className="!pb-[100px]">
      <MainAppBar text="profile" enableScore />
      <Container>
        <div className="space-y-3">
          <BalanceCard />
          <WalletState />
          <EditProfileCard />
        </div>
      </Container>

      {/* MODALS */}
      <ProfileImageRemoveConfirmationModal />
      <PaymentNetworkTypesModal />
    </Page>
  );
};

export default Profile;
