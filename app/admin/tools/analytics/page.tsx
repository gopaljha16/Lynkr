import { getUserAnalytics, getTopLinks, getDailyProfileVisits } from "@/modules/analytics/actions";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import AnalyticsDashboard from "./analytics-dashboard";

const AnalyticsPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    redirect("/");
  }

  const [analytics, topLinks, dailyVisits] = await Promise.all([
    getUserAnalytics(dbUser.id),
    getTopLinks(dbUser.id, 5),
    getDailyProfileVisits(dbUser.id, 7),
  ]);

  return (
    <AnalyticsDashboard 
      analytics={analytics} 
      topLinks={topLinks} 
      dailyVisits={dailyVisits}
      userId={dbUser.id}
    />
  );
};

export default AnalyticsPage;
