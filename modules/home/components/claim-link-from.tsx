"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { checkProfileUsernameAvailability, claimUsername } from "../../profile/actions";

const ClaimLinkForm = () => {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isClaming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (linkValue.trim()) {
      const timer = setTimeout(async () => {
        setIsChecking(true);
        try {
          const result = await checkProfileUsernameAvailability(linkValue);
          setIsAvailable(result.available);
          setSuggestions(result.suggestions  || []);
        } catch (error) {
          console.log(error);
        } finally {
          setIsChecking(false);
        }
      });
    } else {
      setIsAvailable(null);
      setSuggestions([]);
    }
  }, [linkValue]);

  const displayOrigin = origin
    ? origin.replace("https://", "").replace("http://", "")
    : "lynkr.com";

  const handleSubmit = async (e: React.FormEvent) => {
    try {
        e.preventDefault();
        if(linkValue.trim() && isAvailable){
            setIsClaiming(true);
            const result = await claimUsername(linkValue)
            if(result.success){
                toast.success("Linked Claimed Successfully");
                setLinkValue("");
                router.push("/admin/my-tree")
            }
        }
    } catch (error) {
        console.error("Error claiming link:", error);
      toast.error("Failed to claim link. Please try again.");
      
    }finally{
        setIsClaiming(false)
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="text-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
          Claim your unique link
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          It&apos;s free and takes less than a minute
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="w-full">
          <div className={`flex items-center rounded-xl overflow-hidden transition-all duration-300 bg-white dark:bg-zinc-800 border-2 ${
            linkValue 
              ? isChecking 
                ? "border-gray-300 dark:border-zinc-600" 
                : isAvailable 
                  ? "border-green-500/50 shadow-lg shadow-green-500/10" 
                  : "border-red-500/50 shadow-lg shadow-red-500/10"
              : "border-gray-200 dark:border-zinc-700 focus-within:border-purple-500/50 focus-within:shadow-lg focus-within:shadow-purple-500/10"
          }`}>
            <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-700">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                {displayOrigin}/
              </span>
            </div>
            <div className="flex-1 relative flex items-center">
              <Input
                type="text"
                placeholder="yourname"
                value={linkValue}
                onChange={(e) =>
                  setLinkValue(
                    e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
                  )
                }
                maxLength={30}
                className="font-medium h-12 px-4 border-0 shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {linkValue && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {isChecking ? (
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                  ) : isAvailable ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Availability Message */}
          {linkValue && !isChecking && (
            <div className="mt-3 text-sm">
              {isAvailable ? (
                <span className="text-green-600 dark:text-green-400 flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4" />
                  Perfect! This link is available
                </span>
              ) : (
                <div className="space-y-2">
                  <span className="text-red-600 dark:text-red-400 flex items-center gap-2 font-medium">
                    <X className="w-4 h-4" />
                    This link is already taken
                  </span>
                  {suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Try:</span>
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="text-xs px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors font-medium"
                          onClick={() => setLinkValue(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={!linkValue.trim() || !isAvailable || isChecking || isClaming}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#460db8] to-[#7c3aed] hover:from-[#3a0a9e] hover:to-[#6d28d9] text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none group"
          size="lg"
        >
          {isClaming ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Claim Your Lynkr
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          By continuing, you agree to Lynkr&apos;s{" "}
          <a href="#" className="underline hover:text-purple-600 dark:hover:text-purple-400">Terms</a>
          {" "}and{" "}
          <a href="#" className="underline hover:text-purple-600 dark:hover:text-purple-400">Privacy Policy</a>
        </p>
      </form>

      {/* Preview */}
      {linkValue && isAvailable && (
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide">
            Your link preview
          </div>
          <div className="font-mono text-sm bg-white dark:bg-zinc-800 p-3 rounded-lg border border-gray-200 dark:border-zinc-700 text-purple-600 dark:text-purple-400 font-medium">
            {displayOrigin}/{linkValue}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimLinkForm;
