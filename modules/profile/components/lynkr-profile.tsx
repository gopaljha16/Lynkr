"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Globe,
  ExternalLink,
  Star,
  Sun,
  Moon,
  ArrowLeft,
  Copy,
  CopyCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { logLinkClick } from "@/modules/analytics/actions";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  clickCount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileData {
  id: string;
  clerkId: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
  links: LinkItem[];
  socialLinks: SocialLinkItem[];
}

interface LynkrProfileProps {
  profileData: ProfileData | null;
}

const getSocialIcon = (platform: string) => {
  const iconClass = "h-5 w-5";
  switch (platform.toLowerCase()) {
    case "instagram":
    case "youtube":
    case "twitter":
    case "github":
    case "linkedin":
    default:
      return <Globe className={iconClass} />;
  }
};

export default function LynkrProfile({ profileData }: LynkrProfileProps) {
  const router = useRouter();
  const [isCopied, setIsCopied] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const onCopy = () => {
    if (profileData) {
      navigator.clipboard.writeText(`${origin}/${profileData.username}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleLinkClick = async (linkId: string) => {
    try {
      await logLinkClick(linkId);
    } catch (error) {
      console.error("Failed to log link click:", error);
    }
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-center py-8 text-zinc-400">Profile not found.</div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-900" : "bg-gray-50"
      }`}
    >
      <Button
        variant="outline"
        size="icon"
        className={`absolute top-4 left-4 h-10 w-10 rounded-md ${
          theme === "dark"
            ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
        }`}
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="w-full max-w-md">
        <Card
          className={`backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative overflow-hidden ${
            theme === "dark"
              ? "bg-zinc-800/90 border-zinc-700/50"
              : "bg-white/90 border-gray-200/50"
          }`}
        >
          <div
            className={`absolute inset-0 pointer-events-none ${
              theme === "dark"
                ? "bg-gradient-to-br from-zinc-800/20 via-transparent to-zinc-900/20"
                : "bg-gradient-to-br from-gray-50/20 via-transparent to-gray-100/20"
            }`}
          />

          <div className="flex justify-between items-center mb-8 relative z-10">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-xl ${
                theme === "dark"
                  ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onCopy}
              className={`h-9 w-9 rounded-xl ${
                theme === "dark"
                  ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              {isCopied ? (
                <CopyCheck className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex flex-col items-center mb-8 relative z-10">
            <div className="relative mb-6">
              <Avatar
                className={`h-28 w-28 border-4 shadow-2xl ring-2 ${
                  theme === "dark"
                    ? "border-zinc-600/30 ring-zinc-500/20"
                    : "border-gray-300/50 ring-gray-400/20"
                }`}
              >
                <AvatarImage
                  src={profileData.imageUrl || "/placeholder.svg"}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                />
                <AvatarFallback
                  className={
                    theme === "dark"
                      ? "bg-zinc-700 text-zinc-100"
                      : "bg-gray-200 text-gray-800"
                  }
                >
                  {profileData.firstName?.[0] || ""}
                  {profileData.lastName?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 h-8 w-8 bg-green-500 rounded-full border-4 flex items-center justify-center ${
                  theme === "dark" ? "border-zinc-800" : "border-white"
                }`}
              >
                <div className="h-2 w-2 bg-white rounded-full" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1
                className={`text-3xl font-bold tracking-tight ${
                  theme === "dark" ? "text-zinc-100" : "text-gray-900"
                }`}
              >
                {profileData.firstName || ""} {profileData.lastName || ""}
              </h1>
              <p
                className={`text-lg font-medium ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                @{profileData.username || ""}
              </p>
              <p
                className={`text-base leading-relaxed max-w-sm mx-auto ${
                  theme === "dark" ? "text-zinc-300" : "text-gray-700"
                }`}
              >
                {profileData.bio || ""}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-8 relative z-10">
            {profileData.links.map((link) => (
              <Button
                key={link.id}
                asChild
                onClick={() => handleLinkClick(link.id)}
                variant="outline"
                className={`w-full h-14 text-base font-medium backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] group ${
                  theme === "dark"
                    ? "border-zinc-600/40 bg-zinc-700/40 text-zinc-100 hover:bg-zinc-600/60"
                    : "border-gray-300/60 bg-gray-100/40 text-gray-900 hover:bg-gray-200/60"
                }`}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-2"
                >
                  <span className="flex-1 text-center truncate px-4">
                    {link.title}
                  </span>
                  <div className="flex items-center space-x-2 opacity-60 group-hover:opacity-100">
                    <span
                      className={`text-xs ${
                        theme === "dark" ? "text-zinc-400" : "text-gray-600"
                      }`}
                    >
                      {link.clickCount}
                    </span>
                    <ExternalLink
                      className={`h-4 w-4 ${
                        theme === "dark" ? "text-zinc-400" : "text-gray-600"
                      }`}
                    />
                  </div>
                </a>
              </Button>
            ))}
          </div>

          {profileData.socialLinks && profileData.socialLinks.length > 0 && (
            <div className="flex justify-center space-x-3 mb-8 relative z-10">
              {profileData.socialLinks.map((socialLink) => (
                <Button
                  key={socialLink.id}
                  asChild
                  variant="ghost"
                  size="icon"
                  className={`h-12 w-12 rounded-xl border hover:scale-110 ${
                    theme === "dark"
                      ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                >
                  <a
                    href={socialLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(socialLink.platform)}
                  </a>
                </Button>
              ))}
            </div>
          )}

          <div
            className={`flex flex-col items-center space-y-4 pt-6 border-t relative z-10 ${
              theme === "dark" ? "border-zinc-700/50" : "border-gray-200/50"
            }`}
          >
            <Button
              variant="outline"
              className={`w-full flex items-center h-12 text-sm font-medium backdrop-blur-sm rounded-xl group ${
                theme === "dark"
                  ? "border-zinc-600/40 bg-zinc-700/30 text-zinc-200 hover:bg-zinc-600/50"
                  : "border-gray-300/60 bg-gray-100/30 text-gray-800 hover:bg-gray-200/50"
              }`}
            >
              <img src="/logo.png" alt="Lynkr" className="h-10 w-10 mr-2" />
              <span className="group-hover:scale-105 transition-transform flex-1 text-center">
                Join {profileData.username || "user"} on Lynkr
              </span>
              <Star className="h-4 w-4 ml-2 group-hover:text-yellow-400" />
            </Button>

            <div
              className={`flex space-x-6 text-xs ${
                theme === "dark" ? "text-zinc-500" : "text-gray-500"
              }`}
            >
              <a href="#" className="hover:underline">
                Report
              </a>
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Terms
              </a>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className={`absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl ${
            theme === "dark" ? "bg-blue-500/5" : "bg-blue-500/10"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl ${
            theme === "dark" ? "bg-purple-500/5" : "bg-purple-500/10"
          }`}
        />
      </div>
    </div>
  );
}
