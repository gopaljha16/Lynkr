"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, QrCode, Copy, Check, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

const QRGeneratorPage = () => {
  const [url, setUrl] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { theme } = useTheme();

  const generateQR = () => {
    if (url.trim()) {
      setQrGenerated(true);
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=000000&margin=10`;

  const handleDownload = async () => {
    if (!qrGenerated) return;
    setDownloading(true);
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "lynkr-qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-purple-500/30">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-yellow-900" />
            </div>
          </div>
          <h1
            className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            QR Code Generator
          </h1>
          <p
            className={`max-w-md mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
          >
            Create beautiful QR codes for your links instantly. Perfect for
            business cards, flyers, and more.
          </p>
        </div>

        {/* Main Card */}
        <Card
          className={`p-8 rounded-3xl border-2 transition-all duration-300 ${
            theme === "dark"
              ? "bg-zinc-900/80 border-zinc-800 hover:border-purple-500/30"
              : "bg-white border-gray-200 hover:border-purple-300"
          }`}
        >
          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
              >
                Enter your URL
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Input
                    type="url"
                    placeholder="https://your-awesome-link.com"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setQrGenerated(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && generateQR()}
                    className={`h-14 rounded-xl text-base pl-4 pr-12 transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-purple-500 focus:ring-purple-500/20"
                        : "bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    }`}
                  />
                  {url && (
                    <button
                      onClick={handleCopy}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                        theme === "dark"
                          ? "hover:bg-zinc-700"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy
                          className={`w-4 h-4 ${theme === "dark" ? "text-zinc-400" : "text-gray-400"}`}
                        />
                      )}
                    </button>
                  )}
                </div>
                <Button
                  onClick={generateQR}
                  disabled={!url.trim()}
                  className="h-14 px-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
                >
                  Generate
                </Button>
              </div>
            </div>

            {/* QR Code Display */}
            {qrGenerated && (
              <div
                className={`pt-8 border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-100"}`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`p-6 rounded-3xl mb-6 shadow-xl ${
                      theme === "dark"
                        ? "bg-white shadow-black/20"
                        : "bg-white shadow-gray-200/50"
                    }`}
                  >
                    <img
                      src={qrCodeUrl}
                      alt="Generated QR Code"
                      className="w-56 h-56 rounded-xl"
                    />
                  </div>

                  <p
                    className={`text-sm mb-4 text-center max-w-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
                  >
                    Scan this QR code to visit your link
                  </p>

                  <div className="flex gap-3 w-full max-w-xs">
                    <Button
                      onClick={handleDownload}
                      disabled={downloading}
                      className="flex-1 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium shadow-lg shadow-purple-500/25"
                    >
                      <Download
                        className={`w-4 h-4 mr-2 ${downloading ? "animate-bounce" : ""}`}
                      />
                      {downloading ? "Downloading..." : "Download PNG"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!qrGenerated && (
              <div
                className={`text-center py-12 rounded-2xl border-2 border-dashed ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/30"
                    : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <QrCode
                  className={`w-16 h-16 mx-auto mb-4 ${theme === "dark" ? "text-zinc-700" : "text-gray-300"}`}
                />
                <p
                  className={`font-medium ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}
                >
                  Your QR code will appear here
                </p>
                <p
                  className={`text-sm mt-1 ${theme === "dark" ? "text-zinc-600" : "text-gray-400"}`}
                >
                  Enter a URL and click Generate
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Tips */}
        <div
          className={`mt-6 p-4 rounded-2xl ${
            theme === "dark" ? "bg-zinc-900/50" : "bg-gray-50"
          }`}
        >
          <p
            className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
          >
            💡 Tip: QR codes work best when printed at least 2cm x 2cm. Make
            sure there&apos;s enough contrast between the code and background.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRGeneratorPage;
