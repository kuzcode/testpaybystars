import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";
import { UserProfileShowcase } from "@/widgets/userProfileShowcase";
import { ConnectToUserModal } from "./ui/modals/connectToUserModal";

const Search = () => {
  return (
    <>
      <Page className="flex flex-col !to-[#D8D0F9] overflow-x-hidden">
        <MainAppBar text="Search" enableScore>
          <Link href={"/wallet"}>
            <Image
              src={"/icons/filter.svg"}
              width={28}
              height={26}
              alt="filter"
            />
          </Link>
        </MainAppBar>

        <UserProfileShowcase />

        {/* <BottomNavigationBar /> */}

        {/* MODALS */}

        {/* <AboutMatchModal /> */}
        {/* <PeopleNearbyModal /> */}
        <ConnectToUserModal />
      </Page>
    </>
  );
};

export default Search;
