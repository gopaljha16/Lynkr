"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  LinkIcon,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Sparkles,
  Trash2,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";

interface ShortenedLink {
  id: string;
  original: string;
  shortCode: string;
  createdAt: Date;
}

const LinkShortenerPage = () => {
  const [url, setUrl] = useState("");
  const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    // Get the current origin (works for localhost and production)
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const displayOrigin = origin
    ? origin.replace("https://", "").replace("http://", "")
    : "localhost:3000";

  const shortenUrl = async () => {
    if (!url.trim()) return;
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));

    const shortCode = Math.random().toString(36).substring(2, 8);
    const newLink: ShortenedLink = {
      id: Math.random().toString(36).substring(2, 10),
      original: url,
      shortCode: shortCode,
      createdAt: new Date(),
    };

    setShortenedLinks([newLink, ...shortenedLinks]);
    setUrl("");
    setIsLoading(false);
  };

  const getFullShortUrl = (shortCode: string) => {
    return `${origin}/${shortCode}`;
  };

  const getDisplayShortUrl = (shortCode: string) => {
    return `${displayOrigin}/${shortCode}`;
  };

  const handleCopy = (shortCode: string, id: string) => {
    navigator.clipboard.writeText(getFullShortUrl(shortCode));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setShortenedLinks(shortenedLinks.filter((link) => link.id !== id));
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-blue-500/30">
              <LinkIcon className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-yellow-900" />
            </div>
          </div>
          <h1
            className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Link Shortener
          </h1>
          <p
            className={`max-w-md mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
          >
            Transform long URLs into short, memorable links that are easy to
            share anywhere.
          </p>
        </div>

        {/* Main Card */}
        <Card
          className={`p-8 rounded-3xl border-2 transition-all duration-300 mb-6 ${
            theme === "dark"
              ? "bg-zinc-900/80 border-zinc-800 hover:border-blue-500/30"
              : "bg-white border-gray-200 hover:border-blue-300"
          }`}
        >
          <div className="space-y-4">
            <label
              className={`block text-sm font-semibold ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
            >
              Paste your long URL
            </label>
            <div className="flex gap-3">
              <Input
                type="url"
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && shortenUrl()}
                className={`flex-1 h-14 rounded-xl text-base transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500/20"
                    : "bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
              />
              <Button
                onClick={shortenUrl}
                disabled={!url.trim() || isLoading}
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Shorten"
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Shortened Links List */}
        {shortenedLinks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3
                className={`text-sm font-semibold ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
              >
                Your shortened links
              </h3>
              <span
                className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
              >
                {shortenedLinks.length} link
                {shortenedLinks.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-3">
              {shortenedLinks.map((link) => (
                <Card
                  key={link.id}
                  className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg group ${
                    theme === "dark"
                      ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <p
                          className={`font-semibold text-lg ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                        >
                          {getDisplayShortUrl(link.shortCode)}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            theme === "dark"
                              ? "bg-zinc-800 text-zinc-500"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(link.createdAt)}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
                      >
                        {link.original}
                      </p>
                    </div>
                    <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(link.shortCode, link.id)}
                        className={`h-10 w-10 rounded-xl transition-all ${
                          copiedId === link.id
                            ? "bg-green-500/10 text-green-500"
                            : theme === "dark"
                              ? "hover:bg-zinc-800 text-zinc-400"
                              : "hover:bg-gray-100 text-gray-500"
                        }`}
                      >
                        {copiedId === link.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className={`h-10 w-10 rounded-xl ${
                          theme === "dark"
                            ? "hover:bg-zinc-800 text-zinc-400"
                            : "hover:bg-gray-100 text-gray-500"
                        }`}
                      >
                        <a
                          href={link.original}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(link.id)}
                        className={`h-10 w-10 rounded-xl ${
                          theme === "dark"
                            ? "hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                            : "hover:bg-red-50 text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {shortenedLinks.length === 0 && (
          <div
            className={`text-center py-12 rounded-2xl border-2 border-dashed ${
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900/30"
                : "border-gray-200 bg-gray-50/50"
            }`}
          >
            <LinkIcon
              className={`w-16 h-16 mx-auto mb-4 ${theme === "dark" ? "text-zinc-700" : "text-gray-300"}`}
            />
            <p
              className={`font-medium ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}
            >
              No shortened links yet
            </p>
            <p
              className={`text-sm mt-1 ${theme === "dark" ? "text-zinc-600" : "text-gray-400"}`}
            >
              Paste a URL above to get started
            </p>
          </div>
        )}

        {/* Info Box */}
        <div
          className={`mt-6 p-4 rounded-2xl ${
            theme === "dark"
              ? "bg-blue-500/10 border border-blue-500/20"
              : "bg-blue-50 border border-blue-100"
          }`}
        >
          <p
            className={`text-sm ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}
          >
            <span className="font-medium">Your domain:</span> {displayOrigin}
          </p>
          <p
            className={`text-xs mt-1 ${theme === "dark" ? "text-blue-400/70" : "text-blue-600/70"}`}
          >
            Short links will use your current domain automatically.
          </p>
        </div>

        {/* Tips */}
        <div
          className={`mt-4 p-4 rounded-2xl ${
            theme === "dark" ? "bg-zinc-900/50" : "bg-gray-50"
          }`}
        >
          <p
            className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
          >
            💡 Tip: Short links are perfect for social media bios, SMS messages,
            and anywhere character count matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkShortenerPage;
