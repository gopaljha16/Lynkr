import { getUserByUsername } from "@/modules/profile/actions";
import { redirect } from "next/navigation";
import React from "react";
import TreeBioProfile from "@/modules/profile/components/treebio-profile";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const profileData = await getUserByUsername(username);

  if (profileData?.username !== username) {
    return redirect("/"); //homepage redirect
  }

  return (
    <div>
      {profileData ? (
        <TreeBioProfile profileData={profileData} />
      ) : (
        <div>User not found.</div>
      )}
    </div>
  );
};

export default ProfilePage;
