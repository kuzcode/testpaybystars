import React from "react";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";
import { UserProfileShowcase } from "@/widgets/userProfileShowcase";
import { ConnectToUserModal } from "./ui/modals/connectToUserModal";
import { SearchFilterButton } from "@/features/searchFilterButton";
import { NotEnoughEnerguModal } from "./ui/modals/notEnoughEnergyModal";

const Search = () => {
  return (
    <>
      <Page className="flex flex-col !to-[#D8D0F9] overflow-x-hidden">
        <MainAppBar text="search" enableScore>
          <SearchFilterButton />
        </MainAppBar>

        <UserProfileShowcase />

        {/* MODALS */}

        {/* <AboutMatchModal /> */}
        {/* <PeopleNearbyModal /> */}
        <ConnectToUserModal />
        <NotEnoughEnerguModal />
      </Page>
    </>
  );
};

export default Search;
