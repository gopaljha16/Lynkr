"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Loader2,
  Check,
  ExternalLink,
  Copy,
  Globe,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { createUserProfile } from "@/modules/profile/actions";

interface UserData {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  bio: string | null;
  imageUrl: string | null;
}

interface SettingsFormProps {
  user: UserData;
}

export default function SettingsForm({ user }: SettingsFormProps) {
  const { theme, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    bio: user.bio || "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    linkClicks: true,
    weeklyReport: false,
  });

  // Get the current origin (works for localhost and production)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const profileUrl = `${origin}/${user.username}`;
  const displayOrigin = origin
    .replace("https://", "")
    .replace("http://", "");
  const isProduction = origin.includes("vercel.app") || (!origin.includes("localhost") && !origin.includes("127.0.0.1"));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await createUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
      });

      if (result.success) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error(result.error || "Failed to save settings");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success("Profile link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30`}
        >
          <Settings className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1
            className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Settings
          </h1>
          <p
            className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
          >
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <Card
        className={`p-6 rounded-2xl border ${
          theme === "dark"
            ? "bg-zinc-900/50 border-zinc-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <User
            className={`w-5 h-5 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
          />
          <h2
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Profile Information
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-24 h-24 border-4 border-purple-500/20">
              <AvatarImage src={user.imageUrl || ""} />
              <AvatarFallback
                className={`text-xl font-semibold ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
              >
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <p
              className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
            >
              Managed by Clerk
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}
                >
                  First Name
                </Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className={`h-11 rounded-xl ${
                    theme === "dark"
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>
              <div className="space-y-2">
                <Label
                  className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}
                >
                  Last Name
                </Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className={`h-11 rounded-xl ${
                    theme === "dark"
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}
              >
                Username
              </Label>
              <Input
                value={user.username || ""}
                disabled
                className={`h-11 rounded-xl ${
                  theme === "dark"
                    ? "bg-zinc-800/50 border-zinc-700 text-zinc-500"
                    : "bg-gray-100 border-gray-200 text-gray-500"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label
                className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}
              >
                Email
              </Label>
              <Input
                value={user.email}
                disabled
                className={`h-11 rounded-xl ${
                  theme === "dark"
                    ? "bg-zinc-800/50 border-zinc-700 text-zinc-500"
                    : "bg-gray-100 border-gray-200 text-gray-500"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label
                className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}
              >
                Bio
              </Label>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell visitors about yourself..."
                rows={3}
                maxLength={500}
                className={`rounded-xl resize-none ${
                  theme === "dark"
                    ? "bg-zinc-800 border-zinc-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              />
              <p
                className={`text-xs text-right ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
              >
                {formData.bio.length}/500
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Link */}
      <Card
        className={`p-6 rounded-2xl border ${
          theme === "dark"
            ? "bg-zinc-900/50 border-zinc-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ExternalLink
              className={`w-5 h-5 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
            />
            <h2
              className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Your Lynkr Profile
            </h2>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full flex items-center gap-1.5 ${
              isProduction
                ? "bg-green-500/10 text-green-500"
                : "bg-yellow-500/10 text-yellow-500"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isProduction ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            {isProduction ? "Production" : "Development"}
          </span>
        </div>

        {/* Domain Info */}
        <div
          className={`mb-4 p-3 rounded-xl flex items-center gap-3 ${
            theme === "dark"
              ? "bg-zinc-800/50 border border-zinc-700/50"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <Globe
            className={`w-4 h-4 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
          />
          <div className="flex-1">
            <p
              className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
            >
              Current Domain
            </p>
            <p
              className={`text-sm font-medium ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
            >
              {displayOrigin || "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`flex-1 px-4 py-3 rounded-xl font-mono text-sm truncate ${
              theme === "dark"
                ? "bg-zinc-800 text-blue-400"
                : "bg-gray-100 text-blue-600"
            }`}
          >
            {origin ? profileUrl : "Loading..."}
          </div>
          <Button
            variant="outline"
            onClick={handleCopyLink}
            disabled={!origin}
            className={`h-11 px-4 rounded-xl ${
              theme === "dark"
                ? "border-zinc-700 hover:bg-zinc-800"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          <Button
            asChild
            className="h-11 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
          >
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </a>
          </Button>
        </div>

        <p
          className={`text-xs mt-3 ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
        >
          {isProduction
            ? "✓ Your profile is live and accessible to everyone"
            : "⚠ You're in development mode. Deploy to get your production URL."}
        </p>
      </Card>

      {/* Appearance */}
      <Card
        className={`p-6 rounded-2xl border ${
          theme === "dark"
            ? "bg-zinc-900/50 border-zinc-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Palette
            className={`w-5 h-5 ${theme === "dark" ? "text-pink-400" : "text-pink-600"}`}
          />
          <h2
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Appearance
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p
              className={`font-medium ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
            >
              Dark Mode
            </p>
            <p
              className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
            >
              Toggle between light and dark theme
            </p>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </Card>

      {/* Notifications */}
      <Card
        className={`p-6 rounded-2xl border ${
          theme === "dark"
            ? "bg-zinc-900/50 border-zinc-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell
            className={`w-5 h-5 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"}`}
          />
          <h2
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Notifications
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`font-medium ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
              >
                Email Notifications
              </p>
              <p
                className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
              >
                Receive updates via email
              </p>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, emailNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p
                className={`font-medium ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
              >
                Link Click Alerts
              </p>
              <p
                className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
              >
                Get notified when someone clicks your links
              </p>
            </div>
            <Switch
              checked={notifications.linkClicks}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, linkClicks: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p
                className={`font-medium ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
              >
                Weekly Report
              </p>
              <p
                className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
              >
                Receive a weekly summary of your analytics
              </p>
            </div>
            <Switch
              checked={notifications.weeklyReport}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, weeklyReport: checked })
              }
            />
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card
        className={`p-6 rounded-2xl border ${
          theme === "dark"
            ? "bg-zinc-900/50 border-zinc-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield
            className={`w-5 h-5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
          />
          <h2
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Privacy & Security
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`font-medium ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
              >
                Show Click Count
              </p>
              <p
                className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
              >
                Display click counts on your public profile
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p
                className={`font-medium ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
              >
                Public Profile
              </p>
              <p
                className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
              >
                Allow anyone to view your profile
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-purple-500/25"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
