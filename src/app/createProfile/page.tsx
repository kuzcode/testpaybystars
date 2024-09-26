import React from "react";
import { AuthForm } from "@/features/authForm";
import { Container } from "@/shared/ui/Container";
import { MainAppBar } from "@/widgets/mainAppBar";
import { Page } from "@/shared/ui/Page";

const CreateProfile = () => {
  return (
    <Page className="!to-[#F5F4F9]" disableHeightLimit>
      <MainAppBar text="Create Profile" />
      <Container className="pb-8">
        <AuthForm />
      </Container>
    </Page>
  );
};

export default CreateProfile;
