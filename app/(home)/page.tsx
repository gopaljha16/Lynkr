import React from "react";
import { onBoardUser } from "@/modules/auth/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ClaimLinkForm from "@/modules/home/components/claim-link-from";
import { getCurrentUserName } from "@/modules/profile/actions";

const Homepage = async () => {
  const user = await onBoardUser();
  const profile = await getCurrentUserName();
  console.log(profile);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col max-w-4xl mx-auto px-6">
        <section className="text-center space-y-8 py-32">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-zinc-700 dark:text-zinc-100">
              Everything you are.
              <br />
              <span className="text-[#460db8]">In one simple link.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join 70M+ people using Lynkr for their link in bio. One link to
              help you share everything you create, curate and sell from your
              social media profiles.
            </p>
          </div>

          <div className="pt-4">
            {user.success && profile?.username && (
              <Link href="/admin/my-tree">
                <Button
                  size="lg"
                  className="px-8 py-3 text-lg font-medium cursor-pointer"
                >
                  Lynkr Dashboard
                </Button>
              </Link>
            )}
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-md mx-auto">
            <ClaimLinkForm />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
