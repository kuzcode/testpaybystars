import React from "react";
import { Container } from "@/shared/ui/Container";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";
import { BalanceCard } from "./ui/BalanceCard";
import { WalletNotConnectedCard } from "./ui/WalletNotConnectedCard";
import { EditProfileCard } from "./ui/EditProfileCard/ui/EditProfileCard";
import { ProfileImageRemoveConfirmationModal } from "./ui/modals/ProfileImageRemoveConfirmationModal";
import { WalletConnectedCard } from "./ui/WalletConnectedCard";

const Profile = () => {
  return (
    <Page disableHeightLimit className="!pb-[100px]">
      <MainAppBar text="profile" enableScore />
      <Container>
        <div className="space-y-3">
          <BalanceCard />
          <WalletConnectedCard />
          <WalletNotConnectedCard />
          <EditProfileCard />
        </div>
      </Container>

      {/* MODALS */}
      <ProfileImageRemoveConfirmationModal />
    </Page>
  );
};

export default Profile;
