"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getAvailableUsernameSuggestions } from "../utils";
import { ProfileFormData } from "@/modules/links/components/link-from";

export const checkProfileUsernameAvailability = async (username: string) => {
  if (!username) {
    return { available: false, suggestions: [] };
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    return { available: true, suggestions: [] };
  }

  const suggestions = await getAvailableUsernameSuggestions(username, 3, 10);

  return {
    available: false,
    suggestions,
  };
};

export const claimUsername = async (username: string) => {
  try {
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
      return { success: false, error: "No authenticated user found" };
    }

    // check if username is already taken
    const existing = await db.user.findUnique({
      where: { username },
    });
    if (existing) {
      return { success: false, error: "Username already taken" };
    }

    const user = await db.user.update({
      where: { clerkId: loggedInUser.id },
      data: { username },
    });

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update username" };
  }
};


export const getCurrentUserName = async () =>{
  const user = await currentUser();

    if (!user) {
    return null; // or throw new Error("No user logged in");
  }

  const cuurrentUsername = await db.user.findUnique({
    where:{
      clerkId:user?.id,
    },
    select:{
      username:true,
      bio:true,
    }
  })

  return cuurrentUsername;
}



export const createUserProfile = async (data:ProfileFormData)=>{
  const user = await currentUser();

  if (!user) return { success: false, error: "No authenticated user found" };

const profile = await db.user.update({
  where:{
    clerkId:user.id
  },
  data:{
    firstName:data.firstName,
    lastName:data.lastName,
    bio:data.bio,
    imageUrl:data.imageUrl,
    username:data.username,


  }
})

return {
  sucess:true,
  message:"Profile created successfully",
  data:profile

}
}

export const getUserByUsername = async (username:string)=>{

  const currentUsername = await db.user.findUnique({
    where:{
      username:username
    },
   include:{
    
    links:true,
    socialLinks:true
   }
   
  })
  return currentUsername;
}