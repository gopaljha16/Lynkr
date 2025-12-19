import React from "react";
import { onBoardUser } from "@/modules/auth/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ClaimLinkForm from "@/modules/home/components/claim-link-from";
import { getCurrentUserName } from "@/modules/profile/actions";
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  Link2,
  QrCode,
  LinkIcon,
  TrendingUp,
} from "lucide-react";

const Homepage = async () => {
  const user = await onBoardUser();
  const profile = await getCurrentUserName();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />

      <main className="flex flex-col max-w-5xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section className="text-center space-y-10 pt-32 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Trusted by 70M+ creators worldwide
            </span>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-600 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 bg-clip-text text-transparent">
                Everything you are.
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#460db8] via-[#6b21a8] to-[#7c3aed] bg-clip-text text-transparent">
                In one simple link.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Share everything you create, curate and sell from your social media profiles. 
              One link to rule them all.
            </p>
          </div>

          {/* CTA for logged in users */}
          {user.success && profile?.username && (
            <div className="pt-2">
              <Link href="/admin/my-tree">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-[#460db8] to-[#7c3aed] hover:from-[#3a0a9e] hover:to-[#6d28d9] text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Claim Link Section */}
        <section className="pb-20">
          <div className="max-w-lg mx-auto">
            <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800/50 shadow-xl shadow-gray-200/20 dark:shadow-black/20">
              <ClaimLinkForm />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-gray-200/30 dark:border-zinc-800/30 hover:border-purple-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Link2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                One Link, Endless Possibilities
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Consolidate all your content, social profiles, and products in
                one beautiful page.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-gray-200/30 dark:border-zinc-800/30 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                Lightning Fast Setup
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create your personalized link page in seconds. No coding
                required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-gray-200/30 dark:border-zinc-800/30 hover:border-green-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                Grow Your Audience
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Track clicks, analyze performance, and optimize your content
                strategy.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="pb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">
              Powerful Tools
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Everything you need to manage and grow your online presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* QR Code Generator */}
            <Link href="/admin/tools/qr-code" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/60 to-white/40 dark:from-zinc-900/60 dark:to-zinc-900/40 backdrop-blur-sm border border-gray-200/40 dark:border-zinc-800/40 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/30">
                  <QrCode className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  QR Code Generator
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Generate custom QR codes for your links. Perfect for print
                  materials, business cards, and offline marketing.
                </p>
                <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Try it now</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Link Shortener */}
            <Link href="/admin/tools/shortener" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/60 to-white/40 dark:from-zinc-900/60 dark:to-zinc-900/40 backdrop-blur-sm border border-gray-200/40 dark:border-zinc-800/40 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/30">
                  <LinkIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Link Shortener
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Create short, memorable links that are easy to share. Track
                  clicks and manage all your shortened URLs.
                </p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Try it now</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Analytics */}
            <Link href="/admin/tools/analytics" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/60 to-white/40 dark:from-zinc-900/60 dark:to-zinc-900/40 backdrop-blur-sm border border-gray-200/40 dark:border-zinc-800/40 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Analytics
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Get detailed insights on your link performance. Track views,
                  clicks, locations, and more in real-time.
                </p>
                <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View analytics</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
