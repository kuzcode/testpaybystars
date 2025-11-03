import React from "react";

import { Container } from "@/shared/ui/Container";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";

import { BalanceCard } from "./ui/BalanceCard";
import { EditProfileCard } from "./ui/EditProfileCard/ui/EditProfileCard";
// TON modal removed
import { ProfileImageRemoveConfirmationModal } from "./ui/modals/ProfileImageRemoveConfirmationModal";
// TON wallet state removed

const Profile = () => {
  return (
    <Page disableHeightLimit className="!pb-[100px]">
      <MainAppBar text="profile" enableScore />
      <Container>
        <div className="space-y-3">
          <BalanceCard />
          <EditProfileCard />
        </div>
      </Container>

      {/* MODALS */}
      <ProfileImageRemoveConfirmationModal />
    </Page>
  );
};

export default Profile;
