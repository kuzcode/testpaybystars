import { AuthForm } from "@/features/authForm";
import { Container } from "@/shared/ui/Container";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";
import React from "react";

const CreateProfile = () => {
  return (
    <Page className="!to-[#F5F4F9]" disableHeightLimit>
      <MainAppBar text="Create Profile" />
      {/* <GradientHotIcon text="4123" /> */}
      <Container className="pb-8">
        <AuthForm />
      </Container>
    </Page>
  );
};

export default CreateProfile;
