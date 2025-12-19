import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import SettingsForm from "./settings-form";

const SettingsPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    redirect("/");
  }

  return (
    <SettingsForm
      user={{
        id: dbUser.id,
        username: dbUser.username,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        bio: dbUser.bio,
        imageUrl: dbUser.imageUrl,
      }}
    />
  );
};

export default SettingsPage;
