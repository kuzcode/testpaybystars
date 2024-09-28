import React from "react";
import { Page } from "@/shared/ui/Page";
import { WalletState } from "./ui/WalletState";
import { BalanceCard } from "./ui/BalanceCard";
import { Container } from "@/shared/ui/Container";
import { MainAppBar } from "@/widgets/mainAppBar";
import { EditProfileCard } from "./ui/EditProfileCard/ui/EditProfileCard";
import { PaymentNetworkTypesModal } from "./ui/modals/PaymentNetworkTypesModal";
import { ProfileImageRemoveConfirmationModal } from "./ui/modals/ProfileImageRemoveConfirmationModal";

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
