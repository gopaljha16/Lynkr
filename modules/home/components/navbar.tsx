import { Button } from "@/components/ui/button";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import logo from "../../../logo.png";
import UserControl from "./user-control";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800/50 rounded-2xl shadow-lg shadow-gray-200/20 dark:shadow-black/30 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-black/40">
        <div className="px-6 py-3 flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-3 group">
            <div className="relative">
              <Image src={logo} alt="Lynkr" width={42} height={42} className="transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-[#460db8] to-[#7c3aed] bg-clip-text text-transparent">
              Lynkr
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <SignedIn>
               <UserControl/>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-zinc-800/80 rounded-xl transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="sm"
                    className="text-sm font-medium bg-gradient-to-r from-[#460db8] to-[#7c3aed] hover:from-[#3a0a9e] hover:to-[#6d28d9] text-white rounded-xl shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};
