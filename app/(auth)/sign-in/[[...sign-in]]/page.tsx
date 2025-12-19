import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#460db8] via-[#6b21a8] to-[#7c3aed] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:24px_24px]" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to home</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Lynkr</h1>
          <p className="text-white/80 text-lg">Your link in bio, supercharged.</p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-white/90 text-lg leading-relaxed">
              &quot;Lynkr transformed how I share my content. My engagement increased by 300% in just one month!&quot;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                S
              </div>
              <div>
                <p className="text-white font-medium">Sarah Johnson</p>
                <p className="text-white/60 text-sm">Content Creator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-zinc-900">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to home</span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to continue to your dashboard
            </p>
          </div>

          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-xl rounded-2xl p-8 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700",
                headerTitle: "text-xl font-bold text-gray-900 dark:text-white",
                headerSubtitle: "text-sm text-gray-500 dark:text-gray-400",
                formButtonPrimary: "bg-gradient-to-r from-[#460db8] to-[#7c3aed] hover:from-[#3a0a9e] hover:to-[#6d28d9] text-white font-medium py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300",
                formFieldInput: "rounded-xl border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500",
                socialButtonsBlockButton: "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors",
                footerActionLink: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium",
                dividerLine: "bg-gray-200 dark:bg-zinc-700",
                dividerText: "text-gray-400 dark:text-gray-500",
              },
              layout: {
                socialButtonsPlacement: "bottom",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
