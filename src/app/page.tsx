import { getAccessTokenServer } from "@/shared/lib/cookieServer";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = getAccessTokenServer();

  if (token) redirect("/search");

  if (!token) redirect("/createProfile");
}
