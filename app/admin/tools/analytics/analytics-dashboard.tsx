"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Eye,
  MousePointer,
  Link2,
  ArrowUpRight,
  RefreshCw,
  Clock,
  Activity,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface AnalyticsProps {
  analytics: {
    profileAnalytics: {
      totalVisits: number;
      visitsLast1Hour: number;
      visitsLast24Hours: number;
      visitsLast7Days: number;
      visitsLast30Days: number;
      uniqueVisitors: number;
    } | null;
    totalLinkClicks: number;
    totalLinks: number;
    mostClickedLink: {
      id: string;
      title: string;
      clickCount: number;
    } | null;
  } | null;
  topLinks:
    | {
        id: string;
        title: string;
        url: string;
        clickCount: number;
      }[]
    | null;
  dailyVisits: { date: string; visits: number }[] | null;
  userId: string;
}

const AnalyticsDashboard = ({
  analytics,
  topLinks,
  dailyVisits,
  userId,
}: AnalyticsProps) => {
  const { theme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Profile Views",
      value: analytics?.profileAnalytics?.totalVisits || 0,
      change: analytics?.profileAnalytics?.visitsLast24Hours || 0,
      changeLabel: "last 24h",
      icon: Eye,
      color: "purple",
    },
    {
      label: "Total Clicks",
      value: analytics?.totalLinkClicks || 0,
      change: analytics?.profileAnalytics?.visitsLast1Hour || 0,
      changeLabel: "last hour",
      icon: MousePointer,
      color: "blue",
    },
    {
      label: "Unique Visitors",
      value: analytics?.profileAnalytics?.uniqueVisitors || 0,
      change: analytics?.profileAnalytics?.visitsLast7Days || 0,
      changeLabel: "last 7 days",
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "Total Links",
      value: analytics?.totalLinks || 0,
      change: 0,
      changeLabel: "active",
      icon: Link2,
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> =
      {
        purple: {
          bg: "bg-purple-500/10",
          text: "text-purple-500",
          border: "border-purple-500/20",
        },
        blue: {
          bg: "bg-blue-500/10",
          text: "text-blue-500",
          border: "border-blue-500/20",
        },
        emerald: {
          bg: "bg-emerald-500/10",
          text: "text-emerald-500",
          border: "border-emerald-500/20",
        },
        orange: {
          bg: "bg-orange-500/10",
          text: "text-orange-500",
          border: "border-orange-500/20",
        },
      };
    return colors[color] || colors.purple;
  };

  // Calculate max clicks for percentage bars
  const maxClicks = topLinks
    ? Math.max(...topLinks.map((l) => l.clickCount), 1)
    : 1;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Analytics Dashboard
          </h1>
          <p
            className={`text-sm mt-1 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
          >
            Real-time insights for your Lynkr profile
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${
              theme === "dark"
                ? "bg-zinc-800 text-zinc-400"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <Activity className="w-3 h-3 text-green-500 animate-pulse" />
            <span>Live</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`h-9 px-3 rounded-lg ${
              theme === "dark"
                ? "border-zinc-700 hover:bg-zinc-800"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          return (
            <Card
              key={index}
              className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                theme === "dark"
                  ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                {stat.change > 0 && (
                  <span
                    className={`text-xs font-medium flex items-center px-2 py-1 rounded-full ${
                      theme === "dark"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    {stat.change}
                  </span>
                )}
              </div>
              <p
                className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {stat.value.toLocaleString()}
              </p>
              <p
                className={`text-sm mt-1 ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
              >
                {stat.label}
              </p>
              {stat.changeLabel && stat.change > 0 && (
                <p
                  className={`text-xs mt-2 ${theme === "dark" ? "text-zinc-600" : "text-gray-400"}`}
                >
                  +{stat.change} {stat.changeLabel}
                </p>
              )}
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Links */}
        <Card
          className={`p-6 rounded-2xl border ${
            theme === "dark"
              ? "bg-zinc-900/50 border-zinc-800"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <h3
              className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Top Performing Links
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                theme === "dark"
                  ? "bg-zinc-800 text-zinc-400"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              All time
            </span>
          </div>

          {topLinks && topLinks.length > 0 ? (
            <div className="space-y-4">
              {topLinks.map((link, index) => {
                const percentage = (link.clickCount / maxClicks) * 100;
                return (
                  <div key={link.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            index === 0
                              ? "bg-yellow-500/20 text-yellow-500"
                              : index === 1
                                ? "bg-zinc-400/20 text-zinc-400"
                                : index === 2
                                  ? "bg-orange-500/20 text-orange-500"
                                  : theme === "dark"
                                    ? "bg-zinc-800 text-zinc-500"
                                    : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span
                          className={`font-medium truncate max-w-[180px] ${theme === "dark" ? "text-zinc-200" : "text-gray-700"}`}
                        >
                          {link.title}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-semibold ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}
                      >
                        {link.clickCount.toLocaleString()}
                      </span>
                    </div>
                    <div
                      className={`h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                            : index === 1
                              ? "bg-gradient-to-r from-zinc-400 to-zinc-300"
                              : index === 2
                                ? "bg-gradient-to-r from-orange-500 to-orange-400"
                                : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`text-center py-8 ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}
            >
              <Link2 className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No links yet</p>
              <p className="text-sm mt-1">Add links to see analytics</p>
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <Card
          className={`p-6 rounded-2xl border ${
            theme === "dark"
              ? "bg-zinc-900/50 border-zinc-800"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <h3
              className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Weekly Overview
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                theme === "dark"
                  ? "bg-zinc-800 text-zinc-400"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Last 7 days
            </span>
          </div>

          {dailyVisits && dailyVisits.length > 0 ? (
            <div className="space-y-3">
              {dailyVisits.slice(-7).map((day, index) => {
                const maxVisits = Math.max(
                  ...dailyVisits.map((d) => d.visits),
                  1
                );
                const percentage = (day.visits / maxVisits) * 100;
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const dateStr = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });

                return (
                  <div key={day.date} className="flex items-center gap-3">
                    <div
                      className={`w-16 text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
                    >
                      <div className="font-medium">{dayName}</div>
                      <div className="text-[10px] opacity-70">{dateStr}</div>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`h-8 rounded-lg overflow-hidden ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
                      >
                        <div
                          className="h-full rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 flex items-center justify-end pr-2"
                          style={{ width: `${Math.max(percentage, 10)}%` }}
                        >
                          {percentage > 30 && (
                            <span className="text-xs font-medium text-white">
                              {day.visits}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {percentage <= 30 && (
                      <span
                        className={`text-xs font-medium w-8 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                      >
                        {day.visits}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`text-center py-8 ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}
            >
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No visits yet</p>
              <p className="text-sm mt-1">Share your profile to get started</p>
            </div>
          )}
        </Card>
      </div>

      {/* Most Clicked Link Highlight */}
      {analytics?.mostClickedLink && (
        <Card
          className={`p-6 rounded-2xl border bg-gradient-to-r ${
            theme === "dark"
              ? "from-purple-500/10 to-blue-500/10 border-purple-500/20"
              : "from-purple-50 to-blue-50 border-purple-200/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-medium ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
              >
                🏆 Best Performing Link
              </p>
              <h3
                className={`text-xl font-bold mt-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {analytics.mostClickedLink.title}
              </h3>
              <p
                className={`text-sm mt-1 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
              >
                {analytics.mostClickedLink.clickCount.toLocaleString()} total
                clicks
              </p>
            </div>
            <div
              className={`text-4xl font-bold ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
            >
              #{1}
            </div>
          </div>
        </Card>
      )}

      {/* Last Updated */}
      <div
        className={`text-center text-xs ${theme === "dark" ? "text-zinc-600" : "text-gray-400"}`}
      >
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
