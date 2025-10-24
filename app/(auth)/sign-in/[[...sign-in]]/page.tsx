import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center min-h-screen dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
        <h1 className="text-2xl font-bold mb-6">Welcome to the Lynkr</h1>
        <p className="text-lg mb-4 font-semibold text-gray-500">
          Please sign in to continue. If you don&apos;t have an account, you can
          create one.
        </p>
        <div>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                card: "shadow-lg rounded-xl p-6 bg-gray-900 text-white",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-sm text-gray-400",
                socialButtonsBlockButton: "bg-gray-800 text-white rounded-lg",
              },
              layout: {
                socialButtonsPlacement: "bottom",
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
