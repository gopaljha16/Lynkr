import { logProfileVist } from "@/modules/analytics/actions";
import { getUserByUsername } from "@/modules/profile/actions";
import { redirect } from "next/navigation";
import LynkrProfile from "../../../modules/profile/components/lynkr-profile";

const Page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const profileData = await getUserByUsername(username);

  if (profileData?.username !== username) {
    return redirect("/");
  }

  logProfileVist(profileData.id).catch((err) => {
    console.error("Error logging profile visit:", err);
  });

  return <LynkrProfile profileData={profileData as any} />;
};

export default Page;
