import { UserProfileShowcase } from "@/widgets/userProfileShowcase";
import { BottomNavigationBar } from "@/widgets/bottomNavigationBar";
import { MainAppBar } from "@/widgets/mainAppBar";

export default function Home() {

  return (
    <main className="w-screen h-screen bg-gradient-to-b from-[#FFFFFF] to-[#D8D0F9] pt-4 flex flex-col">

      <MainAppBar />

      <UserProfileShowcase />

      <BottomNavigationBar />

    </main>
  );
}
