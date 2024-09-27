import React from "react";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";
import { UserProfileShowcase } from "@/widgets/userProfileShowcase";
import { ConnectToUserModal } from "./ui/modals/connectToUserModal";
import { FilterModal } from "./ui/modals/filterModal";
import { SearchFilterButton } from "@/features/searchFilterButton";

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
        <FilterModal />
        <ConnectToUserModal />
      </Page>
    </>
  );
};

export default Search;
