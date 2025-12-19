import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />

      {/* Left side - Sign Up Form */}
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
              Create your account
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Start building your link in bio today
            </p>
          </div>

          <SignUp
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

      {/* Right side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#460db8] via-[#6b21a8] to-[#7c3aed] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:24px_24px]" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to home</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Join Lynkr</h1>
          <p className="text-white/80 text-lg">Create your personalized link page in seconds.</p>
        </div>

        <div className="relative z-10 space-y-4">
          <h3 className="text-white font-semibold text-lg mb-4">What you&apos;ll get:</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white/90">Unlimited links on your page</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white/90">Detailed analytics & insights</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white/90">Custom themes & branding</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white/90">Social media integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
