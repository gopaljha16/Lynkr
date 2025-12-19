import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-4 py-8">
      {/* Logo */}
      <Link href="/" className="mb-6">
        <span className="text-2xl font-bold text-white">Lynkr</span>
      </Link>

      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
      <p className="text-zinc-400 mb-8">Get started with your free Lynkr profile</p>

      {/* Clerk Sign Up */}
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white rounded-2xl shadow-xl",
            formButtonPrimary:
              "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
          },
        }}
      />

      {/* Footer */}
      <p className="text-sm text-zinc-400 mt-8">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-purple-400 hover:underline font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
