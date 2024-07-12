import { UserProfileShowcase } from "@/widgets/userProfileShowcase";
import { BottomNavigationBar } from "@/widgets/bottomNavigationBar";
import { MainAppBar } from "@/widgets/mainAppBar";
import Image from "next/image";
import { Page } from "@/shared/ui/Page";
import { Container } from "@/shared/ui/Container";

export default function Home() {

  return (
    <Page className="flex flex-col">

      <Container>
        <MainAppBar text="Search">
          <Image src={'/icons/filter.svg'} width={28} height={26} alt="filter" />
        </MainAppBar>
      </Container>

      <UserProfileShowcase />

      <BottomNavigationBar />

    </Page>
  );
}
