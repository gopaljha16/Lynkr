"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getAvailableUsernameSuggestions } from "../utils";

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
