import { Container } from '@/shared/ui/Container';
import { Page } from '@/shared/ui/Page';
import { BottomNavigationBar } from '@/widgets/bottomNavigationBar';
import { MainAppBar } from '@/widgets/mainAppBar';
import { UserProfileShowcase } from '@/widgets/userProfileShowcase';
import Image from 'next/image';
import React from 'react'
import { PeopleNearbyModal } from './ui/modals/peopleNearbyModal';
import { AboutMatchModal } from './ui/modals/aboutMatchModal';
import { HotScoreBadge } from '@/shared/ui/HotScoreBadge';

const Search = () => {
    return (
        <Page className="flex flex-col !to-[#D8D0F9]">

            <MainAppBar text="Search" enableScore>
                <Image src={'/icons/filter.svg'} width={28} height={26} alt="filter" />
            </MainAppBar>
            {/* <Container> */}
            {/* </Container> */}

            <UserProfileShowcase />

            <BottomNavigationBar />

            {/* MODALS */}

            {/* <PeopleNearbyModal /> */}
            {/* <AboutMatchModal /> */}

        </Page>
    );
}

export default Search